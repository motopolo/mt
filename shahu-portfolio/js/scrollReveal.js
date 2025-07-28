/**
 * Scroll Reveal Animations
 * Handles scroll-triggered animations and smooth reveals
 */

class ScrollReveal {
    constructor(options = {}) {
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
            animationDuration: 800,
            animationDelay: 100,
            ...options
        };
        
        this.elements = document.querySelectorAll('[data-scroll-reveal]');
        this.observer = null;
        this.animations = new Map();
        
        this.init();
    }

    init() {
        if (this.elements.length > 0) {
            this.setupObserver();
            this.prepareElements();
            this.startObserving();
        }
    }

    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealElement(entry.target);
                } else if (this.options.repeat) {
                    this.hideElement(entry.target);
                }
            });
        }, {
            threshold: this.options.threshold,
            rootMargin: this.options.rootMargin
        });
    }

    prepareElements() {
        this.elements.forEach((element, index) => {
            // Add initial invisible state
            element.classList.add('scroll-reveal');
            
            // Get animation type from data attribute
            const animationType = element.dataset.scrollReveal || 'fadeInUp';
            const delay = element.dataset.delay ? parseInt(element.dataset.delay) : index * this.options.animationDelay;
            
            // Store animation data
            this.animations.set(element, {
                type: animationType,
                delay: delay,
                duration: element.dataset.duration ? parseInt(element.dataset.duration) : this.options.animationDuration
            });
            
            // Set initial styles based on animation type
            this.setInitialStyles(element, animationType);
        });
    }

    setInitialStyles(element, animationType) {
        const initialStyles = this.getInitialStyles(animationType);
        Object.assign(element.style, initialStyles);
    }

    getInitialStyles(animationType) {
        const styles = {
            opacity: '0',
            transition: `all ${this.options.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
        };

        switch (animationType) {
            case 'fadeInUp':
                styles.transform = 'translateY(50px)';
                break;
            case 'fadeInDown':
                styles.transform = 'translateY(-50px)';
                break;
            case 'fadeInLeft':
                styles.transform = 'translateX(-50px)';
                break;
            case 'fadeInRight':
                styles.transform = 'translateX(50px)';
                break;
            case 'scaleIn':
                styles.transform = 'scale(0.8)';
                break;
            case 'rotateIn':
                styles.transform = 'rotate(-10deg) scale(0.8)';
                break;
            case 'slideInUp':
                styles.transform = 'translateY(100%)';
                break;
            case 'slideInDown':
                styles.transform = 'translateY(-100%)';
                break;
            case 'zoomIn':
                styles.transform = 'scale(0.5)';
                break;
            case 'flipInX':
                styles.transform = 'rotateX(-90deg)';
                styles.transformOrigin = 'center bottom';
                break;
            case 'flipInY':
                styles.transform = 'rotateY(-90deg)';
                styles.transformOrigin = 'center center';
                break;
            default:
                styles.transform = 'translateY(30px)';
        }

        return styles;
    }

    getRevealStyles(animationType) {
        return {
            opacity: '1',
            transform: 'none'
        };
    }

    revealElement(element) {
        const animationData = this.animations.get(element);
        
        if (animationData && !element.classList.contains('revealed')) {
            setTimeout(() => {
                const revealStyles = this.getRevealStyles(animationData.type);
                Object.assign(element.style, revealStyles);
                element.classList.add('revealed');
                
                // Trigger custom event
                element.dispatchEvent(new CustomEvent('elementRevealed', {
                    detail: { element, animationType: animationData.type }
                }));
            }, animationData.delay);
        }
    }

    hideElement(element) {
        const animationData = this.animations.get(element);
        
        if (animationData && element.classList.contains('revealed')) {
            const initialStyles = this.getInitialStyles(animationData.type);
            Object.assign(element.style, initialStyles);
            element.classList.remove('revealed');
        }
    }

    startObserving() {
        this.elements.forEach(element => {
            this.observer.observe(element);
        });
    }

    // Public methods
    reveal(selector) {
        const elements = typeof selector === 'string' ? 
            document.querySelectorAll(selector) : [selector];
        
        elements.forEach(element => this.revealElement(element));
    }

    hide(selector) {
        const elements = typeof selector === 'string' ? 
            document.querySelectorAll(selector) : [selector];
        
        elements.forEach(element => this.hideElement(element));
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    refresh() {
        this.destroy();
        this.elements = document.querySelectorAll('[data-scroll-reveal]');
        this.init();
    }
}

// Advanced scroll effects
class ScrollEffects {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.scrollIndicator = this.createScrollIndicator();
        this.lastScrollY = window.scrollY;
        this.isScrolling = false;
        
        this.init();
    }

    init() {
        this.bindScrollEvents();
        this.createParallaxElements();
    }

    bindScrollEvents() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Update navbar
        this.updateNavbar(currentScrollY);
        
        // Update scroll indicator
        this.updateScrollIndicator();
        
        // Handle parallax effects
        this.updateParallax(currentScrollY);
        
        // Update floating elements
        this.updateFloatingElements(currentScrollY);
        
        this.lastScrollY = currentScrollY;
    }

    updateNavbar(scrollY) {
        if (!this.navbar) return;

        if (scrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll direction
        if (scrollY > this.lastScrollY && scrollY > 200) {
            this.navbar.classList.add('hidden');
        } else {
            this.navbar.classList.remove('hidden');
        }
    }

    createScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator-bar';
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(to right, var(--primary-color), var(--accent-color));
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(indicator);
        return indicator;
    }

    updateScrollIndicator() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (this.scrollIndicator) {
            this.scrollIndicator.style.width = scrolled + '%';
        }
    }

    createParallaxElements() {
        // Add parallax effect to hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.position = 'relative';
            heroSection.style.overflow = 'hidden';
        }
    }

    updateParallax(scrollY) {
        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const parallaxSpeed = 0.5;
            heroSection.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        }

        // Parallax for background elements
        document.querySelectorAll('[data-parallax]').forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    updateFloatingElements(scrollY) {
        // Floating animation for skill tags
        document.querySelectorAll('.skill-tag').forEach((tag, index) => {
            const floatAmount = Math.sin((scrollY + index * 100) * 0.01) * 2;
            tag.style.transform = `translateY(${floatAmount}px)`;
        });
    }
}

// Performance-optimized scroll animations
class PerformantScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-animate-on-scroll]');
        this.rafId = null;
        this.isScrolling = false;
        
        this.init();
    }

    init() {
        if (this.elements.length > 0) {
            this.bindEvents();
        }
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            if (!this.isScrolling) {
                this.rafId = requestAnimationFrame(() => this.handleScroll());
                this.isScrolling = true;
            }
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        this.elements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const elementBottom = elementTop + elementHeight;

            // Check if element is in viewport
            if (elementBottom >= scrollTop && elementTop <= scrollTop + windowHeight) {
                this.animateElement(element, scrollTop, windowHeight);
            }
        });

        this.isScrolling = false;
    }

    animateElement(element, scrollTop, windowHeight) {
        const animationType = element.dataset.animateOnScroll;
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        
        // Calculate progress (0 to 1)
        const progress = Math.max(0, Math.min(1, 
            (scrollTop + windowHeight - elementTop) / (windowHeight + elementHeight)
        ));

        switch (animationType) {
            case 'fade':
                element.style.opacity = progress;
                break;
            case 'slide':
                element.style.transform = `translateX(${(1 - progress) * 100}px)`;
                break;
            case 'scale':
                element.style.transform = `scale(${0.5 + (progress * 0.5)})`;
                break;
            case 'rotate':
                element.style.transform = `rotate(${progress * 360}deg)`;
                break;
        }
    }
}

// Smooth scroll to section
class SmoothScrollTo {
    static scrollTo(target, duration = 1000) {
        const targetElement = typeof target === 'string' ? 
            document.querySelector(target) : target;
        
        if (!targetElement) return;

        const targetPosition = targetElement.offsetTop - 70; // Account for navbar
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
}

// Initialize scroll effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll reveal with custom options
    new ScrollReveal({
        threshold: 0.15,
        animationDuration: 800,
        animationDelay: 100
    });
    
    // Initialize scroll effects
    new ScrollEffects();
    
    // Initialize performant animations
    new PerformantScrollAnimations();
    
    // Add smooth scroll to navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                SmoothScrollTo.scrollTo(target);
            }
        });
    });
});

// Export classes for external use
window.ScrollReveal = ScrollReveal;
window.ScrollEffects = ScrollEffects;
window.SmoothScrollTo = SmoothScrollTo;