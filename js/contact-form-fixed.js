// Initialize EmailJS with your public key
(function() {
    emailjs.init('F37LioU-lqHwmqzkE');
})();

// Function to show toast notification
function showToast(message, type = 'success') {
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
        toast.className = `toast-notification ${type}`;
        toast.querySelector('.toast-message').textContent = message;
        toast.querySelector('.toast-icon').textContent = type === 'success' ? '✓' : '!';
    }
    
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
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
    if (!form) {
        console.error('Contact form not found');
        return;
    }

    // Form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = form.querySelector('.submit-btn');

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
                el.style.display = 'none';
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
    
    // Handle form submission
    async function handleSubmit(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return false;
        }
        
        // Disable submit button to prevent multiple submissions
        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        const loadingHtml = `
            <span class="btn-text">Sending...</span>
            <span class="btn-loading" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 4" opacity="0.8"/>
                </svg>
            </span>
        `;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = loadingHtml;
        
        try {
            // Check if EmailJS is initialized
            if (typeof emailjs === 'undefined' || !emailjs.init) {
                throw new Error('Email service is not available');
            }
            
            // Ensure EmailJS is initialized
            await emailjs.init('F37LioU-lqHwmqzkE');
            
            // Prepare email parameters
            const templateParams = {
                from_name: nameInput.value.trim(),
                from_email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim(),
                to_email: 'info@novustudios.co.ke'
            };
            
            // Send email using EmailJS
            const response = await emailjs.send(
                'service_ebikp2v', 
                'template_oarhea8', 
                templateParams
            );
            
            if (response.status === 200) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                successMessage.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="success-icon">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <div class="success-text">
                        <h4>Message Sent Successfully!</h4>
                        <p>Thank you for reaching out! We'll get back to you within 24-48 hours. Have a great day! 😊</p>
                    </div>
                `;
                
                // Replace form with success message
                form.style.display = 'none';
                form.parentNode.insertBefore(successMessage, form.nextSibling);
                
                // Show toast notification
                showToast('Your message has been sent successfully!');
                
                // Reset form and button
                form.reset();
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Failed to send message. Please try again later or email us directly at info@novustudios.co.ke', 'error');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
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
        });
    }
    
    // Initialize form
    form.addEventListener('submit', handleSubmit);
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
});
