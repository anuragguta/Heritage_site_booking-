document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');
    const inputs = document.querySelectorAll('.input-group input, .input-group select, .input-group textarea');

    // Input focus effects
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            validateInput(input);
        });
    });

    // Form validation
    function validateInput(input) {
        const inputGroup = input.parentElement;
        const errorMessage = inputGroup.nextElementSibling;

        // Remove existing states
        inputGroup.classList.remove('error', 'success');
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }

        // Validate based on input type
        switch (input.type) {
            case 'email':
                if (!validateEmail(input.value)) {
                    showError(inputGroup, 'Please enter a valid email address');
                } else {
                    showSuccess(inputGroup);
                }
                break;

            case 'tel':
                if (!validatePhone(input.value)) {
                    showError(inputGroup, 'Please enter a valid phone number');
                } else {
                    showSuccess(inputGroup);
                }
                break;

            case 'number':
                if (input.value < 1 || input.value > 20) {
                    showError(inputGroup, 'Number of visitors must be between 1 and 20');
                } else {
                    showSuccess(inputGroup);
                }
                break;

            case 'date':
                if (!validateDate(input.value)) {
                    showError(inputGroup, 'Please select a valid date');
                } else {
                    showSuccess(inputGroup);
                }
                break;

            default:
                if (input.value.trim() === '') {
                    showError(inputGroup, `${input.name} is required`);
                } else {
                    showSuccess(inputGroup);
                }
        }
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Validate all inputs
        form.querySelectorAll('input, select, textarea').forEach(input => {
            validateInput(input);
            if (input.parentElement.classList.contains('error')) {
                isValid = false;
            }
        });

        if (isValid) {
            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Simulate API call
            console.log('Form submitted:', data);
            showSubmissionMessage(form, 'Appointment booked successfully!', 'success');

            // Reset form
            form.reset();
        }
    });

    // Helper functions
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        const re = /^[0-9]{10}$/;
        return re.test(String(phone));
    }

    function validateDate(date) {
        const selectedDate = new Date(date);
        const today = new Date();
        return selectedDate >= today;
    }

    function showError(inputGroup, message) {
        inputGroup.classList.add('error');
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = message;
        inputGroup.parentElement.appendChild(errorMessage);
    }

    function showSuccess(inputGroup) {
        inputGroup.classList.add('success');
    }

    function showSubmissionMessage(form, message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('submission-message', type);
        messageDiv.textContent = message;
        form.appendChild(messageDiv);

        // Remove message after 3 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}); 