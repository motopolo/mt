/**
 * Project Filter and Lightbox Gallery
 * Handles project filtering, lightbox modal, and image gallery navigation
 */

class ProjectFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.projectsGrid = document.getElementById('projectsGrid');
        
        this.activeFilter = 'all';
        this.animationDuration = 300;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setInitialState();
    }

    bindEvents() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
                this.updateActiveButton(button);
            });
        });
    }

    setInitialState() {
        // Set first button as active
        if (this.filterButtons.length > 0) {
            this.filterButtons[0].classList.add('active');
        }
    }

    filterProjects(filter) {
        if (filter === this.activeFilter) return;
        
        this.activeFilter = filter;
        
        // Add fade-out animation
        this.projectsGrid.classList.add('filtering');
        
        setTimeout(() => {
            this.projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    card.style.display = 'block';
                    // Trigger reflow for animation
                    card.offsetHeight;
                    card.classList.add('visible');
                } else {
                    card.classList.remove('visible');
                    setTimeout(() => {
                        if (!card.classList.contains('visible')) {
                            card.style.display = 'none';
                        }
                    }, this.animationDuration);
                }
            });
            
            // Remove filtering class after animation
            setTimeout(() => {
                this.projectsGrid.classList.remove('filtering');
                this.announceFilterChange(filter);
            }, this.animationDuration);
            
        }, 50);
    }

    updateActiveButton(activeButton) {
        this.filterButtons.forEach(button => button.classList.remove('active'));
        activeButton.classList.add('active');
    }

    announceFilterChange(filter) {
        // Accessibility: announce filter change to screen readers
        const announcement = filter === 'all' 
            ? 'Showing all projects'
            : `Showing ${filter} projects`;
        
        this.createAriaLiveAnnouncement(announcement);
    }

    createAriaLiveAnnouncement(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

class LightboxGallery {
    constructor() {
        this.modal = document.getElementById('lightboxModal');
        this.modalImage = document.getElementById('lightboxImage');
        this.closeButton = document.getElementById('lightboxClose');
        this.prevButton = document.getElementById('lightboxPrev');
        this.nextButton = document.getElementById('lightboxNext');
        
        this.lightboxLinks = document.querySelectorAll('.lightbox');
        this.currentImageIndex = 0;
        this.images = [];
        
        this.init();
    }

    init() {
        if (!this.modal) return;
        
        this.collectImages();
        this.bindEvents();
        this.addKeyboardSupport();
    }

    collectImages() {
        this.images = Array.from(this.lightboxLinks).map(link => ({
            src: link.getAttribute('href'),
            alt: link.closest('.project-card')?.querySelector('.project-title')?.textContent || 'Project Image',
            caption: link.closest('.project-card')?.querySelector('.project-description')?.textContent || ''
        }));
    }

    bindEvents() {
        // Open lightbox
        this.lightboxLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.openLightbox(index);
            });
        });

        // Close lightbox
        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.closeLightbox());
        }

        // Navigation
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.showPrevious());
        }

        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.showNext());
        }

        // Close on backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeLightbox();
            }
        });

        // Touch/swipe support for mobile
        this.addTouchSupport();
    }

    addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;

            switch (e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.showPrevious();
                    break;
                case 'ArrowRight':
                    this.showNext();
                    break;
            }
        });
    }

    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        this.modalImage.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        this.modalImage.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            this.handleSwipe(startX, startY, endX, endY);
        });
    }

    handleSwipe(startX, startY, endX, endY) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 50;

        // Check if horizontal swipe is more significant than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                this.showPrevious();
            } else {
                this.showNext();
            }
        }
    }

    openLightbox(index) {
        this.currentImageIndex = index;
        this.updateImage();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        this.closeButton.focus();
        
        // Preload adjacent images
        this.preloadAdjacentImages();
    }

    closeLightbox() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Return focus to the trigger element
        const triggerElement = this.lightboxLinks[this.currentImageIndex];
        if (triggerElement) {
            triggerElement.focus();
        }
    }

    showPrevious() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
        this.preloadAdjacentImages();
    }

    showNext() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.updateImage();
        this.preloadAdjacentImages();
    }

    updateImage() {
        const currentImage = this.images[this.currentImageIndex];
        if (!currentImage) return;

        // Add loading state
        this.modalImage.style.opacity = '0.5';
        
        // Create new image element for loading
        const img = new Image();
        img.onload = () => {
            this.modalImage.src = currentImage.src;
            this.modalImage.alt = currentImage.alt;
            this.modalImage.style.opacity = '1';
        };
        
        img.onerror = () => {
            console.error('Failed to load image:', currentImage.src);
            this.modalImage.style.opacity = '1';
        };
        
        img.src = currentImage.src;

        // Update navigation button states
        this.updateNavigationState();
    }

    updateNavigationState() {
        if (this.images.length <= 1) {
            this.prevButton.style.display = 'none';
            this.nextButton.style.display = 'none';
        } else {
            this.prevButton.style.display = 'block';
            this.nextButton.style.display = 'block';
        }
    }

    preloadAdjacentImages() {
        // Preload previous and next images for smoother navigation
        const prevIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        const nextIndex = (this.currentImageIndex + 1) % this.images.length;
        
        [prevIndex, nextIndex].forEach(index => {
            const img = new Image();
            img.src = this.images[index]?.src;
        });
    }

    // Public methods
    refresh() {
        this.collectImages();
    }

    goToImage(index) {
        if (index >= 0 && index < this.images.length) {
            this.openLightbox(index);
        }
    }
}

// Enhanced Project Cards with Hover Effects
class ProjectCards {
    constructor() {
        this.cards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.addHoverEffects();
        this.addAccessibilityFeatures();
    }

    addHoverEffects() {
        this.cards.forEach(card => {
            const overlay = card.querySelector('.project-overlay');
            const image = card.querySelector('.project-image img');
            
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateCardHover(card, false);
            });
        });
    }

    animateCardHover(card, isHovering) {
        const overlay = card.querySelector('.project-overlay');
        const links = card.querySelectorAll('.project-link');
        
        if (isHovering) {
            // Stagger animation for links
            links.forEach((link, index) => {
                setTimeout(() => {
                    link.style.transform = 'scale(1) translateY(0)';
                    link.style.opacity = '1';
                }, index * 100);
            });
        } else {
            links.forEach(link => {
                link.style.transform = 'scale(0.8) translateY(10px)';
                link.style.opacity = '0';
            });
        }
    }

    addAccessibilityFeatures() {
        this.cards.forEach(card => {
            // Add keyboard navigation
            card.setAttribute('tabindex', '0');
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const firstLink = card.querySelector('.project-link');
                    if (firstLink) {
                        firstLink.click();
                    }
                }
            });
            
            // Improve focus management
            card.addEventListener('focus', () => {
                card.classList.add('keyboard-focus');
            });
            
            card.addEventListener('blur', () => {
                card.classList.remove('keyboard-focus');
            });
        });
    }
}

// Add CSS for enhanced animations
const enhancedCSS = `
    .project-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .project-card.keyboard-focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 4px;
    }
    
    .project-link {
        transform: scale(0.8) translateY(10px);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .project-overlay:hover .project-link {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
    
    .projects-grid.filtering {
        opacity: 0.7;
        pointer-events: none;
    }
    
    .project-card.visible {
        animation: fadeInUp 0.5s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    .lightbox-modal {
        backdrop-filter: blur(5px);
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    
    .lightbox-content {
        animation: lightboxZoom 0.3s ease;
    }
    
    @keyframes lightboxZoom {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;

// Inject enhanced CSS
const style = document.createElement('style');
style.textContent = enhancedCSS;
document.head.appendChild(style);

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.projectFilter = new ProjectFilter();
    window.lightboxGallery = new LightboxGallery();
    window.projectCards = new ProjectCards();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProjectFilter, LightboxGallery, ProjectCards };
}