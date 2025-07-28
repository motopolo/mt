/**
 * Dark Mode Toggle Functionality
 * Handles theme switching with localStorage persistence
 */

class DarkModeToggle {
    constructor() {
        this.themeToggleBtn = document.getElementById('theme-toggle-btn');
        this.body = document.body;
        this.icon = this.themeToggleBtn.querySelector('i');
        
        this.init();
    }

    init() {
        // Load saved theme or default to light mode
        this.loadTheme();
        
        // Add event listener for theme toggle
        this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        
        // Add keyboard accessibility
        this.themeToggleBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (systemPrefersDark) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }
    }

    setTheme(theme) {
        if (theme === 'dark') {
            this.body.setAttribute('data-theme', 'dark');
            this.icon.className = 'fas fa-sun';
            this.themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
        } else {
            this.body.removeAttribute('data-theme');
            this.icon.className = 'fas fa-moon';
            this.themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
        }
        
        // Save theme preference
        localStorage.setItem('theme', theme);
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }

    toggleTheme() {
        const currentTheme = this.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add transition effect
        this.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        this.setTheme(newTheme);
        
        // Remove transition after animation completes
        setTimeout(() => {
            this.body.style.transition = '';
        }, 300);
        
        // Add visual feedback
        this.themeToggleBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.themeToggleBtn.style.transform = '';
        }, 300);
    }

    getCurrentTheme() {
        return this.body.getAttribute('data-theme') || 'light';
    }
}

// Mobile menu functionality
class MobileMenu {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
            
            // Close menu when clicking on nav links
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                    this.closeMenu();
                }
            });
            
            // Handle escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeMenu();
                }
            });
        }
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        
        // Animate hamburger lines
        const spans = this.hamburger.querySelectorAll('span');
        if (this.navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        
        // Reset hamburger lines
        const spans = this.hamburger.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
        });
    }
}

// Smooth scrolling for navigation links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to all navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    this.updateActiveNavLink(anchor.getAttribute('href'));
                }
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', () => this.handleScroll());
    }

    updateActiveNavLink(activeHref) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`.nav-link[href="${activeHref}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    handleScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.updateActiveNavLink(`#${sectionId}`);
            }
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DarkModeToggle();
    new MobileMenu();
    new SmoothScroll();
});

// Export for use in other modules
window.DarkModeToggle = DarkModeToggle;