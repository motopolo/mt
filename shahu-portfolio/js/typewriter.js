/**
 * Typewriter Effect
 * Creates animated typing effect for hero section
 */

class TypewriterEffect {
    constructor(element, options = {}) {
        this.element = element;
        this.texts = options.texts || [
            'Full Stack Developer',
            'UI/UX Designer',
            'Problem Solver',
            'Creative Thinker',
            'Code Enthusiast'
        ];
        this.speed = options.speed || 100;
        this.deleteSpeed = options.deleteSpeed || 50;
        this.pauseTime = options.pauseTime || 2000;
        this.loop = options.loop !== false;
        
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        
        this.init();
    }

    init() {
        if (this.element) {
            this.element.textContent = '';
            this.startTyping();
        }
    }

    startTyping() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (!this.isDeleting) {
            // Typing forward
            this.element.textContent = currentText.slice(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            if (this.currentCharIndex === currentText.length) {
                // Finished typing current text, pause then start deleting
                this.isPaused = true;
                setTimeout(() => {
                    this.isPaused = false;
                    this.isDeleting = true;
                    this.startTyping();
                }, this.pauseTime);
                return;
            }
        } else {
            // Deleting backward
            this.element.textContent = currentText.slice(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            
            if (this.currentCharIndex === 0) {
                // Finished deleting, move to next text
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
                
                // If not looping and reached the end, stop
                if (!this.loop && this.currentTextIndex === 0) {
                    return;
                }
            }
        }
        
        if (!this.isPaused) {
            const speed = this.isDeleting ? this.deleteSpeed : this.speed;
            // Add randomness to make typing feel more natural
            const randomDelay = Math.random() * 50;
            setTimeout(() => this.startTyping(), speed + randomDelay);
        }
    }

    // Public methods
    pause() {
        this.isPaused = true;
    }

    resume() {
        if (this.isPaused) {
            this.isPaused = false;
            this.startTyping();
        }
    }

    updateTexts(newTexts) {
        this.texts = newTexts;
        this.currentTextIndex = 0;
    }

    destroy() {
        this.isPaused = true;
        this.element.textContent = '';
    }
}

// Advanced typewriter with multiple lines
class MultiLineTypewriter {
    constructor(element, options = {}) {
        this.element = element;
        this.lines = options.lines || [
            { text: 'I am a ', delay: 0 },
            { text: 'Full Stack Developer', delay: 500, highlight: true },
            { text: 'passionate about ', delay: 1000 },
            { text: 'creating amazing experiences', delay: 1500, highlight: true }
        ];
        this.speed = options.speed || 80;
        this.currentLineIndex = 0;
        this.currentCharIndex = 0;
        
        this.init();
    }

    init() {
        if (this.element) {
            this.element.innerHTML = '';
            this.startTyping();
        }
    }

    startTyping() {
        if (this.currentLineIndex >= this.lines.length) {
            return; // Animation complete
        }

        const currentLine = this.lines[this.currentLineIndex];
        
        if (this.currentCharIndex === 0) {
            // Start new line after delay
            setTimeout(() => {
                this.typeLine();
            }, currentLine.delay);
        } else {
            this.typeLine();
        }
    }

    typeLine() {
        const currentLine = this.lines[this.currentLineIndex];
        const currentText = currentLine.text.slice(0, this.currentCharIndex + 1);
        
        // Create span for current line
        const spans = this.element.querySelectorAll('span');
        if (spans.length <= this.currentLineIndex) {
            const span = document.createElement('span');
            if (currentLine.highlight) {
                span.classList.add('text-gradient');
            }
            this.element.appendChild(span);
        }
        
        const currentSpan = this.element.querySelectorAll('span')[this.currentLineIndex];
        currentSpan.textContent = currentText;
        
        this.currentCharIndex++;
        
        if (this.currentCharIndex <= currentLine.text.length) {
            setTimeout(() => this.startTyping(), this.speed);
        } else {
            // Move to next line
            this.currentLineIndex++;
            this.currentCharIndex = 0;
            this.startTyping();
        }
    }
}

// Code typewriter effect (for showing code snippets)
class CodeTypewriter {
    constructor(element, options = {}) {
        this.element = element;
        this.code = options.code || 'console.log("Hello World!");';
        this.speed = options.speed || 150;
        this.currentIndex = 0;
        this.language = options.language || 'javascript';
        
        this.init();
    }

    init() {
        if (this.element) {
            this.element.innerHTML = `<pre><code class="language-${this.language}"></code></pre>`;
            this.codeElement = this.element.querySelector('code');
            this.startTyping();
        }
    }

    startTyping() {
        if (this.currentIndex <= this.code.length) {
            const currentCode = this.code.slice(0, this.currentIndex);
            this.codeElement.textContent = currentCode;
            
            // Highlight syntax if Prism.js is available
            if (window.Prism) {
                window.Prism.highlightElement(this.codeElement);
            }
            
            this.currentIndex++;
            setTimeout(() => this.startTyping(), this.speed);
        }
    }
}

// Cursor animation
class AnimatedCursor {
    constructor(element) {
        this.element = element;
        this.visible = true;
        this.init();
    }

    init() {
        if (this.element) {
            this.animate();
        }
    }

    animate() {
        setInterval(() => {
            this.visible = !this.visible;
            this.element.style.opacity = this.visible ? '1' : '0';
        }, 500);
    }
}

// Initialize typewriter effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.getElementById('typewriter');
    const cursor = document.querySelector('.cursor');
    
    if (typewriterElement) {
        // Initialize main typewriter effect
        new TypewriterEffect(typewriterElement, {
            texts: [
                'Full Stack Developer',
                'UI/UX Designer', 
                'Problem Solver',
                'Creative Thinker',
                'JavaScript Expert',
                'React Specialist',
                'Node.js Developer',
                'Python Enthusiast'
            ],
            speed: 100,
            deleteSpeed: 50,
            pauseTime: 2000
        });
    }
    
    if (cursor) {
        // Initialize cursor animation
        new AnimatedCursor(cursor);
    }

    // Initialize any other typewriter elements
    document.querySelectorAll('[data-typewriter]').forEach(element => {
        const texts = element.dataset.typewriter.split(',').map(text => text.trim());
        const speed = parseInt(element.dataset.speed) || 100;
        const deleteSpeed = parseInt(element.dataset.deleteSpeed) || 50;
        const pauseTime = parseInt(element.dataset.pauseTime) || 2000;
        
        new TypewriterEffect(element, {
            texts,
            speed,
            deleteSpeed,
            pauseTime
        });
    });

    // Initialize code typewriters
    document.querySelectorAll('[data-code-typewriter]').forEach(element => {
        const code = element.dataset.codeTypewriter;
        const language = element.dataset.language || 'javascript';
        const speed = parseInt(element.dataset.speed) || 150;
        
        new CodeTypewriter(element, {
            code,
            language,
            speed
        });
    });
});

// Export classes for external use
window.TypewriterEffect = TypewriterEffect;
window.MultiLineTypewriter = MultiLineTypewriter;
window.CodeTypewriter = CodeTypewriter;
window.AnimatedCursor = AnimatedCursor;