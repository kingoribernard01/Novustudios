// Initialize EmailJS with your public key
(function() {
    // Initialize EmailJS with your public key
    emailjs.init('F37LioU-lqHwmqzkE');
})();

// Function to show toast notification
function showToast(message, type = 'success') {
    // Create toast element if it doesn't exist
    let toast = document.querySelector('.toast-notification');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                ${type === 'success' ? '✓' : '!'}
            </div>
            <div class="toast-message">${message}</div>
        `;
        document.body.appendChild(toast);
    } else {
        // Update existing toast
        toast.className = `toast-notification ${type}`;
        toast.querySelector('.toast-message').textContent = message;
        toast.querySelector('.toast-icon').textContent = type === 'success' ? '✓' : '!';
    }
    
    // Show toast with animation
    setTimeout(() => {
        toast.classList.add('show');
        
        // Hide toast after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            // Remove toast from DOM after animation completes
            setTimeout(() => {
                if (toast.parentNode) {
                    document.body.removeChild(toast);
                }
            }, 400);
        }, 5000);
    }, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = form.querySelector('.submit-btn');
    const formStatus = document.getElementById('formStatus');

    // Error elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    // Validation patterns
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    
    // Form validation function
    function validateForm() {
        let isValid = true;
        
        // Reset error messages and remove error classes
        [nameError, emailError, subjectError, messageError].forEach(el => {
            if (el) {
                el.textContent = '';
                const input = document.getElementById(el.id.replace('-error', ''));
                if (input) input.classList.remove('error');
            }
        });
        
        // Validate name
        if (!nameInput.value.trim()) {
            showError(nameError, 'Name is required', nameInput);
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError(nameError, 'Name must be at least 2 characters', nameInput);
            isValid = false;
        }
        
        // Validate email
        if (!emailInput.value.trim()) {
            showError(emailError, 'Email is required', emailInput);
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailError, 'Please enter a valid email address', emailInput);
            isValid = false;
        }
        
        // Validate subject
        if (!subjectInput.value.trim()) {
            showError(subjectError, 'Subject is required', subjectInput);
            isValid = false;
        } else if (subjectInput.value.trim().length < 5) {
            showError(subjectError, 'Subject must be at least 5 characters', subjectInput);
            isValid = false;
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            showError(messageError, 'Message is required', messageInput);
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageError, 'Message must be at least 10 characters', messageInput);
            isValid = false;
        }
        
        // If form is invalid, focus on first error
        if (!isValid) {
            const firstError = form.querySelector('.error');
            if (firstError) firstError.focus();
        }
        
        return isValid;
    }
    
    // Helper function to show error and style input
    function showError(errorElement, message, inputElement) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        if (inputElement) {
            inputElement.classList.add('error');
        }
    }
    
    // Show form status message
    function showStatus(message, isError = false) {
        if (!formStatus) return;
        
        formStatus.textContent = message;
        formStatus.className = 'form-status';
        formStatus.classList.add('visible', isError ? 'error' : 'success');
        
        // Auto-hide after 5 seconds
        const hideTimer = setTimeout(() => {
            formStatus.classList.remove('visible');
            clearTimeout(hideTimer);
        }, 5000);
    }
    
    // Handle form submission with EmailJS
    function handleSubmit(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            showStatus('Please fill in all required fields correctly.', true);
            return false;
        }
        
        // Disable submit button to prevent multiple submissions
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Store original button text
        const originalBtnText = submitBtn.querySelector('.btn-text').textContent;
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        
        // Prepare email parameters
        const templateParams = {
            from_name: nameInput.value.trim(),
            from_email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim(),
            to_email: 'info@novustudios.co.ke'
        };
        
        // Send email using EmailJS with error handling
        emailjs.send('service_ebikp2v', 'template_oarhea8', templateParams)
            .then(function(response) {
                if (response.status === 200) {
                    // Show success toast
                    showToast('Thank you for your message! We\'ll get back to you soon. 😊');
                    
                    // Reset form
                    form.reset();
                    submitBtn.querySelector('.btn-text').textContent = 'Message Sent!';
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.querySelector('.btn-text').textContent = originalBtnText;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('loading');
                    }, 3000);
                    // Form submitted successfully, no need to handle errors here
                    showStatus('Message sent successfully!', false);
                } else {
                    // Handle non-200 responses
                    showToast('An error occurred. Please try again.', 'error');
                    showStatus('An error occurred. Please try again.', true);
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('Failed to send message. Please try again later or email us directly at info@novustudios.co.ke', 'error');
        })
        .finally(() => {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
        
        return false;
    }

    // Initialize floating labels
    function initFloatingLabels() {
        document.querySelectorAll('.form-control').forEach(input => {
            // Check if input has content on page load
            if (input.value.trim() !== '') {
                input.previousElementSibling?.classList.add('floating');
            }
            
            // Add event listeners for focus/blur
            input.addEventListener('focus', function() {
                const label = this.previousElementSibling;
                if (label) label.classList.add('floating');
            });
            
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    const label = this.previousElementSibling;
                    if (label) label.classList.remove('floating');
                }
            });
            
            // Handle input events for real-time validation
            input.addEventListener('input', function() {
                const label = this.previousElementSibling;
                if (label) {
                    if (this.value.trim() !== '') {
                        label.classList.add('floating');
                    } else {
                        label.classList.remove('floating');
                    }
                }
                
                // Clear error message when user starts typing
        });
        
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                const label = this.previousElementSibling;
                if (label) label.classList.remove('floating');
            }
        });
        
        // Handle input events for real-time validation
        input.addEventListener('input', function() {
            const label = this.previousElementSibling;
            if (label) {
                if (this.value.trim() !== '') {
                    label.classList.add('floating');
                } else {
                    label.classList.remove('floating');
                }
            }
            
            // Clear error message when user starts typing
            const errorElement = this.parentNode?.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    });
}

// Initialize the form
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form before submission
        if (validateForm()) {
            handleSubmit(e);
        } else {
            // Show error message if validation fails
            showToast('Please fill in all required fields correctly.', 'error');
            
            // Focus on first error field
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.focus();
            }
        }
    });
    
    // Initialize floating labels
    initFloatingLabels();
    
    // Add input event listeners for real-time validation
    const inputs = [nameInput, emailInput, subjectInput, messageInput];
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Clear error when user starts typing
            const errorElement = document.getElementById(`${input.id}-error`);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
            input.classList.remove('error');
        });
    });
    
    console.log('Contact form initialized');
} else {
    console.error('Contact form element not found');
}
