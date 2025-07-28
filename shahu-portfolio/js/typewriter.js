/**
 * Typewriter Effect Class
 * Creates a realistic typing animation with multiple phrases
 */

class TypewriterEffect {
    constructor(element, options = {}) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        
        if (!this.element) {
            console.warn('Typewriter: Element not found');
            return;
        }

        // Default configuration
        this.config = {
            phrases: [
                'Full Stack Developer',
                'React Specialist',
                'Node.js Expert', 
                'UI/UX Enthusiast',
                'Problem Solver',
                'Code Artisan'
            ],
            typeSpeed: 100,          // Speed of typing (ms per character)
            deleteSpeed: 50,         // Speed of deleting (ms per character)
            pauseDuration: 2000,     // Pause before deleting (ms)
            deletePauseDuration: 500, // Pause before typing next phrase (ms)
            loop: true,              // Whether to loop through phrases
            showCursor: true,        // Show blinking cursor
            cursorChar: '|',         // Cursor character
            startDelay: 500,         // Initial delay before starting
            shuffle: false,          // Shuffle phrases randomly
            ...options
        };

        this.currentPhraseIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        this.isCompleted = false;
        
        this.phrases = this.config.shuffle ? this.shuffleArray([...this.config.phrases]) : [...this.config.phrases];
        
        this.init();
    }

    init() {
        // Clear any existing content
        this.element.textContent = '';
        
        // Add cursor if enabled
        if (this.config.showCursor) {
            this.createCursor();
        }
        
        // Start typing after initial delay
        setTimeout(() => {
            this.type();
        }, this.config.startDelay);
    }

    createCursor() {
        this.cursor = document.createElement('span');
        this.cursor.className = 'typewriter-cursor';
        this.cursor.textContent = this.config.cursorChar;
        this.cursor.style.cssText = `
            animation: typewriter-blink 1s infinite;
            font-weight: inherit;
            color: inherit;
        `;
        
        // Add cursor animation CSS if not already present
        if (!document.querySelector('#typewriter-styles')) {
            const style = document.createElement('style');
            style.id = 'typewriter-styles';
            style.textContent = `
                @keyframes typewriter-blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
                .typewriter-cursor {
                    display: inline-block;
                }
            `;
            document.head.appendChild(style);
        }
        
        this.element.appendChild(this.cursor);
    }

    type() {
        if (this.isCompleted) return;

        const currentPhrase = this.phrases[this.currentPhraseIndex];
        const displayText = this.isDeleting 
            ? currentPhrase.substring(0, this.currentCharIndex - 1)
            : currentPhrase.substring(0, this.currentCharIndex + 1);

        // Update the text content (excluding cursor)
        const textNode = this.element.firstChild;
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
            textNode.textContent = displayText;
        } else {
            this.element.insertBefore(document.createTextNode(displayText), this.cursor);
        }

        // Determine next action
        if (!this.isDeleting && this.currentCharIndex === currentPhrase.length) {
            // Finished typing current phrase
            this.isPaused = true;
            setTimeout(() => {
                this.isPaused = false;
                this.isDeleting = true;
                this.type();
            }, this.config.pauseDuration);
            return;
        }

        if (this.isDeleting && this.currentCharIndex === 0) {
            // Finished deleting current phrase
            this.isDeleting = false;
            this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
            
            // Check if we should stop looping
            if (!this.config.loop && this.currentPhraseIndex === 0) {
                this.isCompleted = true;
                return;
            }
            
            setTimeout(() => {
                this.type();
            }, this.config.deletePauseDuration);
            return;
        }

        // Continue typing or deleting
        this.currentCharIndex += this.isDeleting ? -1 : 1;
        
        const speed = this.isDeleting ? this.config.deleteSpeed : this.config.typeSpeed;
        const variation = this.getSpeedVariation(speed);
        
        setTimeout(() => {
            this.type();
        }, speed + variation);
    }

    getSpeedVariation(baseSpeed) {
        // Add realistic typing speed variation (±30% of base speed)
        const variation = baseSpeed * 0.3;
        return Math.random() * variation - variation / 2;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Public methods
    pause() {
        this.isPaused = true;
    }

    resume() {
        if (this.isPaused) {
            this.isPaused = false;
            this.type();
        }
    }

    stop() {
        this.isCompleted = true;
    }

    reset() {
        this.currentPhraseIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        this.isCompleted = false;
        this.element.textContent = '';
        
        if (this.config.showCursor && this.cursor) {
            this.element.appendChild(this.cursor);
        }
        
        this.init();
    }

    updatePhrases(newPhrases) {
        this.phrases = this.config.shuffle ? this.shuffleArray([...newPhrases]) : [...newPhrases];
        this.config.phrases = newPhrases;
    }

    getCurrentPhrase() {
        return this.phrases[this.currentPhraseIndex];
    }

    // Event handlers
    onComplete(callback) {
        const checkComplete = () => {
            if (this.isCompleted) {
                callback();
            } else {
                setTimeout(checkComplete, 100);
            }
        };
        checkComplete();
    }
}

// Enhanced Typewriter with additional features
class AdvancedTypewriter extends TypewriterEffect {
    constructor(element, options = {}) {
        super(element, {
            // Enhanced default options
            typeSpeed: 80,
            deleteSpeed: 40,
            pauseDuration: 2500,
            deletePauseDuration: 800,
            naturalTyping: true,     // Add natural typing variations
            scrambleEffect: false,   // Scramble text before revealing
            ...options
        });
    }

    type() {
        if (this.config.scrambleEffect && !this.isDeleting && this.currentCharIndex < this.phrases[this.currentPhraseIndex].length) {
            this.scrambleText();
        }
        
        super.type();
    }

    scrambleText() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const currentPhrase = this.phrases[this.currentPhraseIndex];
        let scrambledText = currentPhrase.substring(0, this.currentCharIndex);
        
        // Add scrambled characters for next few positions
        for (let i = this.currentCharIndex; i < Math.min(this.currentCharIndex + 3, currentPhrase.length); i++) {
            scrambledText += chars[Math.floor(Math.random() * chars.length)];
        }
        
        const textNode = this.element.firstChild;
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
            textNode.textContent = scrambledText;
        }
    }

    getSpeedVariation(baseSpeed) {
        if (!this.config.naturalTyping) {
            return super.getSpeedVariation(baseSpeed);
        }
        
        // More sophisticated speed variation for natural typing
        const currentChar = this.phrases[this.currentPhraseIndex][this.currentCharIndex];
        let variation = baseSpeed * 0.4;
        
        // Slower on punctuation and spaces
        if (currentChar === ' ' || /[.,!?;:]/.test(currentChar)) {
            variation += baseSpeed * 0.5;
        }
        
        // Faster on common letter combinations
        if (this.currentCharIndex > 0) {
            const prevChar = this.phrases[this.currentPhraseIndex][this.currentCharIndex - 1];
            const commonCombos = ['th', 'he', 'in', 'er', 'an'];
            const combo = prevChar + currentChar;
            if (commonCombos.includes(combo.toLowerCase())) {
                variation -= baseSpeed * 0.2;
            }
        }
        
        return Math.random() * variation - variation / 2;
    }
}

// Auto-initialize typewriter effect
document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.getElementById('typewriter');
    
    if (typewriterElement) {
        // Create typewriter instance
        window.typewriter = new AdvancedTypewriter(typewriterElement, {
            phrases: [
                'Full Stack Developer',
                'React Specialist',
                'Node.js Expert',
                'UI/UX Enthusiast',
                'Problem Solver',
                'Code Artisan',
                'Tech Innovator'
            ],
            typeSpeed: 100,
            deleteSpeed: 50,
            pauseDuration: 3000,
            deletePauseDuration: 1000,
            naturalTyping: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TypewriterEffect, AdvancedTypewriter };
}