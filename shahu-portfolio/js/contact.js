/**
 * Contact Form Functionality
 * Handles form validation, submission, and user feedback
 */

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.formStatus = document.getElementById('form-status');
        this.submitButton = this.form?.querySelector('button[type="submit"]');
        
        this.fields = {
            name: this.form?.querySelector('#name'),
            email: this.form?.querySelector('#email'),
            subject: this.form?.querySelector('#subject'),
            message: this.form?.querySelector('#message')
        };

        this.validationRules = {
            name: {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-Z\s]+$/,
                message: 'Please enter a valid name (letters and spaces only)'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            subject: {
                required: true,
                minLength: 5,
                maxLength: 100,
                message: 'Subject must be between 5 and 100 characters'
            },
            message: {
                required: true,
                minLength: 20,
                maxLength: 1000,
                message: 'Message must be between 20 and 1000 characters'
            }
        };

        this.init();
    }

    init() {
        if (this.form) {
            this.bindEvents();
            this.initializeFieldValidation();
        }
    }

    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Real-time validation
        Object.values(this.fields).forEach(field => {
            if (field) {
                field.addEventListener('blur', () => this.validateField(field));
                field.addEventListener('input', () => this.clearFieldError(field));
            }
        });

        // Auto-resize textarea
        if (this.fields.message) {
            this.fields.message.addEventListener('input', this.autoResizeTextarea);
        }
    }

    initializeFieldValidation() {
        // Add floating label behavior
        Object.values(this.fields).forEach(field => {
            if (field) {
                // Check if field has content on load
                this.updateFloatingLabel(field);
                
                // Update floating label on input
                field.addEventListener('input', () => this.updateFloatingLabel(field));
                field.addEventListener('focus', () => this.updateFloatingLabel(field));
                field.addEventListener('blur', () => this.updateFloatingLabel(field));
            }
        });
    }

    updateFloatingLabel(field) {
        const formGroup = field.closest('.form-group');
        const label = formGroup?.querySelector('label');
        
        if (label) {
            if (field.value.trim() || document.activeElement === field) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        }
    }

    validateField(field) {
        const fieldName = field.name;
        const rules = this.validationRules[fieldName];
        const value = field.value.trim();
        
        if (!rules) return true;

        let isValid = true;
        let errorMessage = '';

        // Required validation
        if (rules.required && !value) {
            isValid = false;
            errorMessage = `${this.capitalizeFirst(fieldName)} is required`;
        }
        // Pattern validation
        else if (rules.pattern && value && !rules.pattern.test(value)) {
            isValid = false;
            errorMessage = rules.message;
        }
        // Length validation
        else if (value) {
            if (rules.minLength && value.length < rules.minLength) {
                isValid = false;
                errorMessage = `${this.capitalizeFirst(fieldName)} must be at least ${rules.minLength} characters`;
            } else if (rules.maxLength && value.length > rules.maxLength) {
                isValid = false;
                errorMessage = `${this.capitalizeFirst(fieldName)} must be no more than ${rules.maxLength} characters`;
            }
        }

        this.showFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    showFieldValidation(field, isValid, errorMessage) {
        const formGroup = field.closest('.form-group');
        let errorElement = formGroup.querySelector('.field-error');

        // Remove existing error styling
        field.classList.remove('error', 'success');
        
        if (errorElement) {
            errorElement.remove();
        }

        if (!isValid && errorMessage) {
            // Add error styling and message
            field.classList.add('error');
            errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            errorElement.textContent = errorMessage;
            formGroup.appendChild(errorElement);
        } else if (field.value.trim()) {
            // Add success styling for valid fields
            field.classList.add('success');
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup?.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    validateForm() {
        let isFormValid = true;
        
        Object.values(this.fields).forEach(field => {
            if (field && !this.validateField(field)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    async handleSubmit() {
        // Validate form before submission
        if (!this.validateForm()) {
            this.showFormStatus('Please correct the errors above', 'error');
            return;
        }

        // Disable submit button and show loading state
        this.setSubmissionState(true);

        try {
            const formData = this.getFormData();
            
            // Simulate API call (replace with actual endpoint)
            const response = await this.submitForm(formData);
            
            if (response.success) {
                this.showFormStatus('Thank you! Your message has been sent successfully.', 'success');
                this.resetForm();
            } else {
                throw new Error(response.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormStatus('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            this.setSubmissionState(false);
        }
    }

    async submitForm(formData) {
        // Simulate API call - replace with your actual form submission logic
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate successful submission
                resolve({ success: true });
                
                // For actual implementation, you might use:
                // fetch('/api/contact', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData)
                // }).then(response => response.json());
            }, 1000);
        });
    }

    getFormData() {
        return {
            name: this.fields.name.value.trim(),
            email: this.fields.email.value.trim(),
            subject: this.fields.subject.value.trim(),
            message: this.fields.message.value.trim(),
            timestamp: new Date().toISOString()
        };
    }

    showFormStatus(message, type) {
        if (this.formStatus) {
            this.formStatus.textContent = message;
            this.formStatus.className = `form-status ${type}`;
            this.formStatus.style.display = 'block';
            
            // Auto-hide success messages after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    this.formStatus.style.display = 'none';
                }, 5000);
            }
        }
    }

    setSubmissionState(isSubmitting) {
        if (this.submitButton) {
            const buttonText = this.submitButton.querySelector('span');
            const buttonIcon = this.submitButton.querySelector('i');
            
            if (isSubmitting) {
                this.submitButton.disabled = true;
                if (buttonText) buttonText.textContent = 'Sending...';
                if (buttonIcon) {
                    buttonIcon.className = 'fas fa-spinner fa-spin';
                }
            } else {
                this.submitButton.disabled = false;
                if (buttonText) buttonText.textContent = 'Send Message';
                if (buttonIcon) {
                    buttonIcon.className = 'fas fa-paper-plane';
                }
            }
        }
    }

    resetForm() {
        this.form.reset();
        
        // Clear all validation states
        Object.values(this.fields).forEach(field => {
            if (field) {
                field.classList.remove('error', 'success');
                this.updateFloatingLabel(field);
            }
        });

        // Remove any error messages
        this.form.querySelectorAll('.field-error').forEach(error => error.remove());
    }

    autoResizeTextarea(event) {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Email validation utility
class EmailValidator {
    static isValid(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    static getDomain(email) {
        return email.split('@')[1];
    }

    static isCommonProvider(email) {
        const commonProviders = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
            'icloud.com', 'aol.com', 'live.com', 'msn.com'
        ];
        const domain = this.getDomain(email);
        return commonProviders.includes(domain.toLowerCase());
    }
}

// Contact methods interaction
class ContactMethods {
    constructor() {
        this.emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        this.phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        
        this.init();
    }

    init() {
        this.addClickTracking();
    }

    addClickTracking() {
        // Track email link clicks
        this.emailLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackContactMethod('email', link.href);
            });
        });

        // Track phone link clicks
        this.phoneLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackContactMethod('phone', link.href);
            });
        });
    }

    trackContactMethod(method, value) {
        // Analytics tracking
        if (window.gtag) {
            gtag('event', 'contact_method_click', {
                'contact_method': method,
                'contact_value': value
            });
        }

        console.log(`Contact method used: ${method} - ${value}`);
    }
}

// Initialize contact functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
    new ContactMethods();
});

// Export classes for external use
window.ContactForm = ContactForm;
window.EmailValidator = EmailValidator;
window.ContactMethods = ContactMethods;