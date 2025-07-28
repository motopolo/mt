/**
 * Dark Mode Toggle Functionality
 * Handles theme switching with smooth transitions and localStorage persistence
 */

class DarkModeToggle {
    constructor() {
        this.toggleButton = document.getElementById('themeToggle');
        this.body = document.body;
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener to toggle button
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => this.toggleTheme());
        }
        
        // Listen for system theme changes
        this.watchSystemTheme();
        
        // Update button icon based on current theme
        this.updateButtonIcon();
    }

    getStoredTheme() {
        try {
            return localStorage.getItem('portfolio-theme');
        } catch (error) {
            console.warn('localStorage not available:', error);
            return null;
        }
    }

    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    setTheme(theme) {
        this.currentTheme = theme;
        
        // Remove existing theme classes
        this.body.removeAttribute('data-theme');
        
        // Apply new theme
        if (theme === 'dark') {
            this.body.setAttribute('data-theme', 'dark');
        }
        
        // Store theme preference
        this.storeTheme(theme);
        
        // Update button icon
        this.updateButtonIcon();
        
        // Dispatch custom event for other components
        this.dispatchThemeChangeEvent(theme);
    }

    storeTheme(theme) {
        try {
            localStorage.setItem('portfolio-theme', theme);
        } catch (error) {
            console.warn('Could not store theme preference:', error);
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        
        // Add transition class for smooth animation
        this.body.classList.add('theme-transitioning');
        
        // Set new theme
        this.setTheme(newTheme);
        
        // Remove transition class after animation
        setTimeout(() => {
            this.body.classList.remove('theme-transitioning');
        }, 300);
        
        // Add a subtle animation to the toggle button
        this.animateToggleButton();
    }

    updateButtonIcon() {
        if (!this.toggleButton) return;
        
        const icon = this.toggleButton.querySelector('i');
        if (!icon) return;
        
        // Remove existing icon classes
        icon.className = '';
        
        // Add appropriate icon class
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
            this.toggleButton.setAttribute('aria-label', 'Switch to light mode');
        } else {
            icon.className = 'fas fa-moon';
            this.toggleButton.setAttribute('aria-label', 'Switch to dark mode');
        }
    }

    animateToggleButton() {
        if (!this.toggleButton) return;
        
        this.toggleButton.style.transform = 'scale(0.9) rotate(180deg)';
        
        setTimeout(() => {
            this.toggleButton.style.transform = 'scale(1) rotate(0deg)';
        }, 150);
    }

    watchSystemTheme() {
        if (!window.matchMedia) return;
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            // Only follow system theme if user hasn't manually set a preference
            const storedTheme = this.getStoredTheme();
            if (!storedTheme) {
                const systemTheme = e.matches ? 'dark' : 'light';
                this.setTheme(systemTheme);
            }
        });
    }

    dispatchThemeChangeEvent(theme) {
        const event = new CustomEvent('themeChanged', {
            detail: { theme: theme }
        });
        document.dispatchEvent(event);
    }

    // Public method to get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Public method to force a specific theme
    forceTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.setTheme(theme);
        }
    }
}

// Additional CSS for smooth transitions
const themeTransitionCSS = `
    .theme-transitioning,
    .theme-transitioning *,
    .theme-transitioning *:before,
    .theme-transitioning *:after {
        transition: all 0.3s ease !important;
        transition-delay: 0 !important;
    }
`;

// Inject transition CSS
const style = document.createElement('style');
style.textContent = themeTransitionCSS;
document.head.appendChild(style);

// Initialize dark mode toggle when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.darkModeToggle = new DarkModeToggle();
    });
} else {
    window.darkModeToggle = new DarkModeToggle();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkModeToggle;
}