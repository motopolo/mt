/**
 * Scroll Reveal and Interactive Effects
 * Handles scroll-based animations, parallax effects, and other interactive features
 */

class ScrollReveal {
    constructor() {
        this.elements = new Map();
        this.observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: [0, 0.1, 0.5, 1]
        };
        
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.observerOptions
        );
        
        this.parallaxElements = [];
        this.isScrolling = false;
        this.scrollTop = 0;
        
        this.init();
    }

    init() {
        this.setupScrollReveal();
        this.setupParallaxEffects();
        this.setupScrollSpy();
        this.setupSmoothScrolling();
        this.bindScrollEvents();
    }

    setupScrollReveal() {
        // Find all elements with data-aos or similar animation attributes
        const revealElements = document.querySelectorAll([
            '[data-aos]',
            '.reveal',
            '.fade-in',
            '.slide-up',
            '.slide-left',
            '.slide-right',
            '.zoom-in',
            '.stat-number',
            '.skill-progress',
            '.timeline-item',
            '.project-card'
        ].join(','));

        revealElements.forEach(element => {
            this.observer.observe(element);
            this.elements.set(element, {
                hasAnimated: false,
                animationType: this.getAnimationType(element),
                delay: this.getAnimationDelay(element)
            });
        });
    }

    getAnimationType(element) {
        if (element.hasAttribute('data-aos')) {
            return element.getAttribute('data-aos');
        }
        
        const classList = element.classList;
        if (classList.contains('fade-in')) return 'fade-in';
        if (classList.contains('slide-up')) return 'slide-up';
        if (classList.contains('slide-left')) return 'slide-left';
        if (classList.contains('slide-right')) return 'slide-right';
        if (classList.contains('zoom-in')) return 'zoom-in';
        
        return 'fade-up'; // default
    }

    getAnimationDelay(element) {
        const delay = element.getAttribute('data-aos-delay') || 
                     element.getAttribute('data-delay') || 
                     '0';
        return parseInt(delay);
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            const element = entry.target;
            const elementData = this.elements.get(element);
            
            if (!elementData) return;

            if (entry.isIntersecting && entry.intersectionRatio > 0.1 && !elementData.hasAnimated) {
                setTimeout(() => {
                    this.animateElement(element, elementData.animationType);
                    elementData.hasAnimated = true;
                }, elementData.delay);
            }
        });
    }

    animateElement(element, animationType) {
        element.classList.add('aos-animate', 'revealed');
        
        // Handle specific animations
        switch (animationType) {
            case 'counter':
                this.animateCounter(element);
                break;
            case 'skill-bar':
                this.animateSkillBar(element);
                break;
            case 'typing':
                this.animateTyping(element);
                break;
        }
        
        // Dispatch custom event
        element.dispatchEvent(new CustomEvent('revealed', {
            detail: { animationType }
        }));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count') || element.textContent);
        const duration = 2000;
        const start = performance.now();
        const startValue = 0;

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(startValue + (target - startValue) * easeOut);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        requestAnimationFrame(updateCounter);
    }

    animateSkillBar(element) {
        const progress = element.getAttribute('data-progress');
        if (progress) {
            setTimeout(() => {
                element.style.width = progress + '%';
            }, 100);
        }
    }

    animateTyping(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        const typeChar = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, 50 + Math.random() * 50);
            } else {
                // Blinking cursor effect
                setInterval(() => {
                    element.style.borderRight = element.style.borderRight === 'none' 
                        ? '2px solid var(--primary-color)' 
                        : 'none';
                }, 500);
            }
        };
        
        typeChar();
    }

    setupParallaxEffects() {
        this.parallaxElements = document.querySelectorAll('.parallax, [data-parallax]');
        
        this.parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax-speed') || '0.5');
            element.dataset.parallaxSpeed = speed;
        });
    }

    updateParallax() {
        if (this.parallaxElements.length === 0) return;
        
        const scrolled = window.pageYOffset;
        
        this.parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallaxSpeed);
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrolled;
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;
            
            // Check if element is in viewport
            if (elementTop < scrolled + windowHeight && elementTop + elementHeight > scrolled) {
                const yPos = -(scrolled - elementTop) * speed;
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[data-section]');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const sectionId = entry.target.id;
                    
                    // Update active nav link
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('data-section') === sectionId) {
                            link.classList.add('active');
                        }
                    });
                    
                    // Update URL hash without scrolling
                    if (history.replaceState) {
                        history.replaceState(null, null, `#${sectionId}`);
                    }
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-20% 0px -20% 0px'
        });
        
        sections.forEach(section => sectionObserver.observe(section));
    }

    setupSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    this.smoothScrollTo(targetElement);
                }
            });
        });
    }

    smoothScrollTo(element, offset = -80) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset + offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    bindScrollEvents() {
        let ticking = false;
        
        const handleScroll = () => {
            this.scrollTop = window.pageYOffset;
            
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateParallax();
                    this.updateScrollProgress();
                    this.handleScrollDirection();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Handle scroll start/end
        let scrollTimer = null;
        window.addEventListener('scroll', () => {
            if (!this.isScrolling) {
                this.isScrolling = true;
                document.body.classList.add('is-scrolling');
            }
            
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                this.isScrolling = false;
                document.body.classList.remove('is-scrolling');
            }, 150);
        }, { passive: true });
    }

    updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        // Update any scroll progress indicators
        const progressBars = document.querySelectorAll('.scroll-progress');
        progressBars.forEach(bar => {
            bar.style.width = scrolled + '%';
        });
        
        // Update back to top button
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            if (winScroll > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        }
    }

    handleScrollDirection() {
        const currentScroll = window.pageYOffset;
        const navbar = document.getElementById('navbar');
        
        if (!navbar) return;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar based on scroll direction
        if (currentScroll > this.lastScrollTop && currentScroll > 200) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
        
        this.lastScrollTop = currentScroll;
    }

    // Public methods
    refresh() {
        // Re-observe all elements
        this.elements.forEach((data, element) => {
            data.hasAnimated = false;
            element.classList.remove('aos-animate', 'revealed');
        });
    }

    addElement(element, animationType = 'fade-up', delay = 0) {
        this.observer.observe(element);
        this.elements.set(element, {
            hasAnimated: false,
            animationType: animationType,
            delay: delay
        });
    }

    removeElement(element) {
        this.observer.unobserve(element);
        this.elements.delete(element);
    }
}

// Enhanced Mouse Effects
class MouseEffects {
    constructor() {
        this.cursor = null;
        this.cursorFollower = null;
        this.isTouch = 'ontouchstart' in window;
        
        if (!this.isTouch) {
            this.init();
        }
    }

    init() {
        this.createCustomCursor();
        this.bindMouseEvents();
        this.setupHoverEffects();
    }

    createCustomCursor() {
        // Create custom cursor elements
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        
        this.cursorFollower = document.createElement('div');
        this.cursorFollower.className = 'cursor-follower';
        this.cursorFollower.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: all 0.3s ease;
            opacity: 0.5;
        `;
        
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorFollower);
    }

    bindMouseEvents() {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            this.cursor.style.left = mouseX + 'px';
            this.cursor.style.top = mouseY + 'px';
        });
        
        // Smooth following cursor
        const animateFollower = () => {
            const dx = mouseX - followerX;
            const dy = mouseY - followerY;
            
            followerX += dx * 0.1;
            followerY += dy * 0.1;
            
            this.cursorFollower.style.left = (followerX - 20) + 'px';
            this.cursorFollower.style.top = (followerY - 20) + 'px';
            
            requestAnimationFrame(animateFollower);
        };
        
        animateFollower();
    }

    setupHoverEffects() {
        // Add hover effects for interactive elements
        const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-item');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursorFollower.style.transform = 'scale(1.5)';
                this.cursorFollower.style.opacity = '0.8';
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursorFollower.style.transform = 'scale(1)';
                this.cursorFollower.style.opacity = '0.5';
            });
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.fps = 0;
        this.lastTime = performance.now();
        this.frameCount = 0;
        
        if (window.location.search.includes('debug')) {
            this.init();
        }
    }

    init() {
        this.createDebugPanel();
        this.startMonitoring();
    }

    createDebugPanel() {
        const panel = document.createElement('div');
        panel.id = 'debug-panel';
        panel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
        `;
        document.body.appendChild(panel);
    }

    startMonitoring() {
        const updateFPS = () => {
            const now = performance.now();
            const delta = now - this.lastTime;
            this.frameCount++;
            
            if (delta >= 1000) {
                this.fps = Math.round((this.frameCount * 1000) / delta);
                this.frameCount = 0;
                this.lastTime = now;
                
                this.updateDebugPanel();
            }
            
            requestAnimationFrame(updateFPS);
        };
        
        updateFPS();
    }

    updateDebugPanel() {
        const panel = document.getElementById('debug-panel');
        if (panel) {
            panel.innerHTML = `
                FPS: ${this.fps}<br>
                Memory: ${this.getMemoryUsage()}<br>
                Scroll: ${Math.round(window.pageYOffset)}px
            `;
        }
    }

    getMemoryUsage() {
        if (performance.memory) {
            return Math.round(performance.memory.usedJSHeapSize / 1048576) + ' MB';
        }
        return 'N/A';
    }
}

// Add enhanced CSS for scroll effects
const scrollEffectsCSS = `
    [data-aos] {
        opacity: 0;
        transition: all 0.6s ease;
    }
    
    [data-aos].aos-animate {
        opacity: 1;
    }
    
    [data-aos="fade-up"] {
        transform: translateY(30px);
    }
    
    [data-aos="fade-up"].aos-animate {
        transform: translateY(0);
    }
    
    [data-aos="fade-left"] {
        transform: translateX(-30px);
    }
    
    [data-aos="fade-left"].aos-animate {
        transform: translateX(0);
    }
    
    [data-aos="fade-right"] {
        transform: translateX(30px);
    }
    
    [data-aos="fade-right"].aos-animate {
        transform: translateX(0);
    }
    
    [data-aos="zoom-in"] {
        transform: scale(0.8);
    }
    
    [data-aos="zoom-in"].aos-animate {
        transform: scale(1);
    }
    
    .navbar.nav-hidden {
        transform: translateY(-100%);
    }
    
    .custom-cursor,
    .cursor-follower {
        mix-blend-mode: difference;
    }
    
    @media (prefers-reduced-motion: reduce) {
        [data-aos] {
            animation: none !important;
            transition: none !important;
        }
        
        .custom-cursor,
        .cursor-follower {
            display: none !important;
        }
    }
`;

// Inject scroll effects CSS
const style = document.createElement('style');
style.textContent = scrollEffectsCSS;
document.head.appendChild(style);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.scrollReveal = new ScrollReveal();
    window.mouseEffects = new MouseEffects();
    window.performanceMonitor = new PerformanceMonitor();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ScrollReveal, MouseEffects, PerformanceMonitor };
}