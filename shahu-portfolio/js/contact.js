/**
 * Contact Form Handler
 * Handles form validation, submission, and user feedback
 */

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitButton = this.form?.querySelector('.submit-btn');
        this.successMessage = document.getElementById('formSuccess');
        
        this.fields = {
            name: this.form?.querySelector('#name'),
            email: this.form?.querySelector('#email'),
            subject: this.form?.querySelector('#subject'),
            message: this.form?.querySelector('#message')
        };
        
        this.validators = {
            name: {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-Z\s'-]+$/,
                errorMessage: 'Please enter a valid name (letters, spaces, hyphens, and apostrophes only)'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                errorMessage: 'Please enter a valid email address'
            },
            subject: {
                required: true,
                minLength: 5,
                maxLength: 100,
                errorMessage: 'Subject must be between 5 and 100 characters'
            },
            message: {
                required: true,
                minLength: 10,
                maxLength: 1000,
                errorMessage: 'Message must be between 10 and 1000 characters'
            }
        };
        
        this.isSubmitting = false;
        
        this.init();
    }

    init() {
        if (!this.form) return;
        
        this.bindEvents();
        this.setupRealTimeValidation();
        this.addAccessibilityFeatures();
    }

    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Reset form validation on input
        Object.values(this.fields).forEach(field => {
            if (field) {
                field.addEventListener('input', () => {
                    this.clearFieldError(field);
                    this.validateField(field);
                });
                
                field.addEventListener('blur', () => {
                    this.validateField(field);
                });
            }
        });
    }

    setupRealTimeValidation() {
        // Add character counters for text areas and long inputs
        if (this.fields.subject) {
            this.addCharacterCounter(this.fields.subject, 100);
        }
        
        if (this.fields.message) {
            this.addCharacterCounter(this.fields.message, 1000);
        }
    }

    addCharacterCounter(field, maxLength) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            font-size: 0.75rem;
            color: var(--text-muted);
            text-align: right;
            margin-top: 0.25rem;
        `;
        
        const updateCounter = () => {
            const remaining = maxLength - field.value.length;
            counter.textContent = `${field.value.length}/${maxLength}`;
            
            if (remaining < 20) {
                counter.style.color = '#ef4444';
            } else if (remaining < 50) {
                counter.style.color = '#f59e0b';
            } else {
                counter.style.color = 'var(--text-muted)';
            }
        };
        
        field.addEventListener('input', updateCounter);
        field.parentNode.appendChild(counter);
        updateCounter();
    }

    addAccessibilityFeatures() {
        // Add ARIA labels and descriptions
        Object.entries(this.fields).forEach(([fieldName, field]) => {
            if (field) {
                field.setAttribute('aria-describedby', `${fieldName}-error`);
                
                // Add required indicator
                if (this.validators[fieldName]?.required) {
                    field.setAttribute('aria-required', 'true');
                }
            }
        });
    }

    validateField(field) {
        if (!field) return false;
        
        const fieldName = field.name;
        const validator = this.validators[fieldName];
        const value = field.value.trim();
        
        // Required check
        if (validator.required && !value) {
            this.showFieldError(field, `${this.capitalizeFirst(fieldName)} is required`);
            return false;
        }
        
        // Skip other validations if field is empty and not required
        if (!value && !validator.required) {
            this.clearFieldError(field);
            return true;
        }
        
        // Length validations
        if (validator.minLength && value.length < validator.minLength) {
            this.showFieldError(field, `${this.capitalizeFirst(fieldName)} must be at least ${validator.minLength} characters`);
            return false;
        }
        
        if (validator.maxLength && value.length > validator.maxLength) {
            this.showFieldError(field, `${this.capitalizeFirst(fieldName)} must not exceed ${validator.maxLength} characters`);
            return false;
        }
        
        // Pattern validation
        if (validator.pattern && !validator.pattern.test(value)) {
            this.showFieldError(field, validator.errorMessage);
            return false;
        }
        
        // Field-specific validations
        if (fieldName === 'email' && value) {
            if (!this.isValidEmail(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        this.clearFieldError(field);
        return true;
    }

    isValidEmail(email) {
        // More comprehensive email validation
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(email);
    }

    showFieldError(field, message) {
        const errorElement = this.getErrorElement(field);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        
        // Add shake animation
        field.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }

    clearFieldError(field) {
        const errorElement = this.getErrorElement(field);
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
    }

    getErrorElement(field) {
        let errorElement = field.parentNode.querySelector('.form-error');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'form-error';
            errorElement.id = `${field.name}-error`;
            errorElement.setAttribute('role', 'alert');
            errorElement.style.display = 'none';
            field.parentNode.appendChild(errorElement);
        }
        return errorElement;
    }

    validateForm() {
        let isValid = true;
        
        Object.values(this.fields).forEach(field => {
            if (field && !this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    async handleSubmit() {
        if (this.isSubmitting) return;
        
        // Validate form
        if (!this.validateForm()) {
            this.focusFirstError();
            return;
        }
        
        this.isSubmitting = true;
        this.setSubmissionState(true);
        
        try {
            const formData = this.getFormData();
            const result = await this.submitForm(formData);
            
            if (result.success) {
                this.showSuccessMessage();
                this.resetForm();
            } else {
                this.showErrorMessage(result.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showErrorMessage('An error occurred. Please try again later.');
        } finally {
            this.isSubmitting = false;
            this.setSubmissionState(false);
        }
    }

    getFormData() {
        const data = {};
        Object.entries(this.fields).forEach(([name, field]) => {
            if (field) {
                data[name] = field.value.trim();
            }
        });
        return data;
    }

    async submitForm(formData) {
        // Simulate form submission - replace with actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate success/failure
                const success = Math.random() > 0.1; // 90% success rate for demo
                resolve({
                    success: success,
                    message: success ? 'Message sent successfully!' : 'Failed to send message'
                });
            }, 2000);
        });
        
        // Example actual implementation:
        /*
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        return {
            success: response.ok,
            message: result.message
        };
        */
    }

    setSubmissionState(isSubmitting) {
        if (!this.submitButton) return;
        
        const btnText = this.submitButton.querySelector('.btn-text');
        const btnLoading = this.submitButton.querySelector('.btn-loading');
        
        if (isSubmitting) {
            this.submitButton.classList.add('loading');
            this.submitButton.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
        } else {
            this.submitButton.classList.remove('loading');
            this.submitButton.disabled = false;
            btnText.style.display = 'flex';
            btnLoading.style.display = 'none';
        }
    }

    showSuccessMessage() {
        if (this.successMessage) {
            this.form.style.display = 'none';
            this.successMessage.classList.add('show');
            
            // Announce success to screen readers
            this.announceToScreenReader('Message sent successfully!');
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                this.hideSuccessMessage();
            }, 5000);
        }
    }

    hideSuccessMessage() {
        if (this.successMessage) {
            this.successMessage.classList.remove('show');
            this.form.style.display = 'block';
        }
    }

    showErrorMessage(message) {
        // Create or update error notification
        let errorNotification = document.querySelector('.form-error-notification');
        if (!errorNotification) {
            errorNotification = document.createElement('div');
            errorNotification.className = 'form-error-notification';
            errorNotification.style.cssText = `
                background: #fee2e2;
                border: 1px solid #fecaca;
                color: #dc2626;
                padding: 1rem;
                border-radius: 0.5rem;
                margin-bottom: 1rem;
                position: relative;
            `;
            this.form.insertBefore(errorNotification, this.form.firstChild);
        }
        
        errorNotification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
                <button type="button" onclick="this.parentElement.parentElement.remove()" style="margin-left: auto; background: none; border: none; color: inherit; cursor: pointer;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Announce error to screen readers
        this.announceToScreenReader(message);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (errorNotification.parentNode) {
                errorNotification.remove();
            }
        }, 5000);
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'assertive');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    focusFirstError() {
        const firstError = this.form.querySelector('.error');
        if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    resetForm() {
        this.form.reset();
        
        // Clear all errors
        Object.values(this.fields).forEach(field => {
            if (field) {
                this.clearFieldError(field);
            }
        });
        
        // Update character counters
        const counters = this.form.querySelectorAll('.character-counter');
        counters.forEach(counter => {
            const field = counter.previousElementSibling;
            if (field) {
                const maxLength = this.validators[field.name]?.maxLength || 1000;
                counter.textContent = `0/${maxLength}`;
                counter.style.color = 'var(--text-muted)';
            }
        });
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Public methods
    validate() {
        return this.validateForm();
    }

    reset() {
        this.resetForm();
    }

    setFieldValue(fieldName, value) {
        if (this.fields[fieldName]) {
            this.fields[fieldName].value = value;
        }
    }

    getFieldValue(fieldName) {
        return this.fields[fieldName]?.value || '';
    }
}

// Add CSS for form enhancements
const formCSS = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .form-error {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    }
    
    .character-counter {
        font-size: 0.75rem;
        text-align: right;
        margin-top: 0.25rem;
        transition: color 0.3s ease;
    }
    
    .submit-btn.loading {
        pointer-events: none;
        opacity: 0.7;
    }
    
    .form-success {
        display: none;
        text-align: center;
        padding: 2rem;
        background: var(--bg-secondary);
        border-radius: var(--border-radius);
        margin-top: 1rem;
        animation: slideInUp 0.5s ease;
    }
    
    .form-success.show {
        display: block;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
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
`;

// Inject form CSS
const style = document.createElement('style');
style.textContent = formCSS;
document.head.appendChild(style);

// Initialize contact form when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.contactForm = new ContactForm();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactForm;
}