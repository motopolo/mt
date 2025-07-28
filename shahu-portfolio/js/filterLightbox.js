/**
 * Project Filter and Lightbox Functionality
 * Handles filtering projects by category and lightbox image viewing
 */

class ProjectFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.projectsGrid = document.querySelector('.projects-grid');
        
        this.init();
    }

    init() {
        if (this.filterButtons.length > 0 && this.projectCards.length > 0) {
            this.bindEvents();
            this.initIsotope();
        }
    }

    bindEvents() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFilterClick(button);
            });
        });
    }

    initIsotope() {
        // If Isotope library is available, use it for better animations
        if (window.Isotope && this.projectsGrid) {
            this.isotope = new Isotope(this.projectsGrid, {
                itemSelector: '.project-card',
                layoutMode: 'fitRows',
                transitionDuration: '0.5s'
            });
        }
    }

    handleFilterClick(clickedButton) {
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
        
        const filterValue = clickedButton.getAttribute('data-filter');
        
        if (this.isotope) {
            // Use Isotope if available
            this.isotope.arrange({
                filter: filterValue === 'all' ? '*' : `[data-category="${filterValue}"]`
            });
        } else {
            // Fallback to custom filtering
            this.filterProjects(filterValue);
        }
        
        // Add analytics tracking if available
        if (window.gtag) {
            gtag('event', 'filter_projects', {
                'filter_category': filterValue
            });
        }
    }

    filterProjects(filterValue) {
        this.projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            const shouldShow = filterValue === 'all' || category === filterValue;
            
            if (shouldShow) {
                // Animate in
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, index * 50); // Stagger animation
            } else {
                // Animate out
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.95)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Public method to filter programmatically
    filterByCategory(category) {
        const button = document.querySelector(`[data-filter="${category}"]`);
        if (button) {
            this.handleFilterClick(button);
        }
    }

    // Reset all filters
    resetFilters() {
        const allButton = document.querySelector('[data-filter="all"]');
        if (allButton) {
            this.handleFilterClick(allButton);
        }
    }
}

class ProjectLightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightbox-image');
        this.lightboxCaption = document.getElementById('lightbox-caption');
        this.lightboxClose = document.querySelector('.lightbox-close');
        this.lightboxTriggers = document.querySelectorAll('[data-lightbox]');
        
        this.currentIndex = 0;
        this.images = [];
        
        this.init();
    }

    init() {
        if (this.lightbox) {
            this.bindEvents();
            this.prepareImages();
        }
    }

    bindEvents() {
        // Open lightbox
        this.lightboxTriggers.forEach((trigger, index) => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.openLightbox(index);
            });
        });

        // Close lightbox
        if (this.lightboxClose) {
            this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        }

        // Close on background click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isOpen()) {
                switch (e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });

        // Touch/swipe support for mobile
        this.addTouchSupport();
    }

    prepareImages() {
        this.images = Array.from(this.lightboxTriggers).map(trigger => {
            const projectCard = trigger.closest('.project-card');
            const img = projectCard.querySelector('.project-image img');
            const title = projectCard.querySelector('.project-content h3');
            const description = projectCard.querySelector('.project-content p');
            
            return {
                src: img.src,
                alt: img.alt,
                title: title ? title.textContent : '',
                description: description ? description.textContent : ''
            };
        });
    }

    openLightbox(index) {
        this.currentIndex = index;
        this.showImage();
        this.lightbox.style.display = 'flex';
        
        // Add opening animation
        setTimeout(() => {
            this.lightbox.style.opacity = '1';
            this.lightboxImage.style.transform = 'scale(1)';
        }, 10);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Add navigation arrows if multiple images
        if (this.images.length > 1) {
            this.addNavigationArrows();
        }
    }

    closeLightbox() {
        this.lightbox.style.opacity = '0';
        this.lightboxImage.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            this.lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
        
        this.removeNavigationArrows();
    }

    showImage() {
        const imageData = this.images[this.currentIndex];
        
        if (imageData) {
            this.lightboxImage.src = imageData.src;
            this.lightboxImage.alt = imageData.alt;
            
            // Update caption
            if (this.lightboxCaption) {
                this.lightboxCaption.innerHTML = `
                    <h3>${imageData.title}</h3>
                    <p>${imageData.description}</p>
                    <span class="image-counter">${this.currentIndex + 1} / ${this.images.length}</span>
                `;
            }
        }
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage();
        this.animateImageTransition();
    }

    previousImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage();
        this.animateImageTransition();
    }

    animateImageTransition() {
        this.lightboxImage.style.opacity = '0';
        setTimeout(() => {
            this.lightboxImage.style.opacity = '1';
        }, 150);
    }

    addNavigationArrows() {
        if (!document.querySelector('.lightbox-nav-prev')) {
            const prevArrow = document.createElement('button');
            prevArrow.className = 'lightbox-nav lightbox-nav-prev';
            prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevArrow.addEventListener('click', () => this.previousImage());
            
            const nextArrow = document.createElement('button');
            nextArrow.className = 'lightbox-nav lightbox-nav-next';
            nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextArrow.addEventListener('click', () => this.nextImage());
            
            this.lightbox.appendChild(prevArrow);
            this.lightbox.appendChild(nextArrow);
        }
    }

    removeNavigationArrows() {
        const arrows = this.lightbox.querySelectorAll('.lightbox-nav');
        arrows.forEach(arrow => arrow.remove());
    }

    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        
        this.lightboxImage.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        this.lightboxImage.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only trigger swipe if horizontal movement is greater than vertical
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (Math.abs(diffX) > 50) { // Minimum swipe distance
                    if (diffX > 0) {
                        this.nextImage();
                    } else {
                        this.previousImage();
                    }
                }
            }
            
            startX = 0;
            startY = 0;
        });
    }

    isOpen() {
        return this.lightbox.style.display === 'flex';
    }
}

// Search functionality for projects
class ProjectSearch {
    constructor() {
        this.searchInput = document.getElementById('project-search');
        this.projectCards = document.querySelectorAll('.project-card');
        
        this.init();
    }

    init() {
        if (this.searchInput) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
        
        // Clear search on escape
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.searchInput.value = '';
                this.handleSearch('');
            }
        });
    }

    handleSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        this.projectCards.forEach(card => {
            const title = card.querySelector('.project-content h3').textContent.toLowerCase();
            const description = card.querySelector('.project-content p').textContent.toLowerCase();
            const techTags = Array.from(card.querySelectorAll('.project-tech span'))
                .map(tag => tag.textContent.toLowerCase()).join(' ');
            
            const searchableText = `${title} ${description} ${techTags}`;
            const matches = searchableText.includes(searchTerm);
            
            if (searchTerm === '' || matches) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectFilter();
    new ProjectLightbox();
    new ProjectSearch();
});

// Export classes for external use
window.ProjectFilter = ProjectFilter;
window.ProjectLightbox = ProjectLightbox;
window.ProjectSearch = ProjectSearch;