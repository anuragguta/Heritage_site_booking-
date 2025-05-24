// DOM Elements
const forms = document.querySelectorAll('.auth-form');
const togglePasswordButtons = document.querySelectorAll('.toggle-password');
const inputs = document.querySelectorAll('.input-group input');

// Password visibility toggle
togglePasswordButtons.forEach(button => {
    button.addEventListener('click', () => {
        const input = button.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        button.classList.toggle('fa-eye');
        button.classList.toggle('fa-eye-slash');
    });
});

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

        case 'password':
            if (input.value.length < 8) {
                showError(inputGroup, 'Password must be at least 8 characters long');
            } else if (input.id === 'confirm-password') {
                const password = document.getElementById('password');
                if (input.value !== password.value) {
                    showError(inputGroup, 'Passwords do not match');
                } else {
                    showSuccess(inputGroup);
                }
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
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Validate all inputs
        form.querySelectorAll('input').forEach(input => {
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
            showSubmissionMessage(form, 'Success! Redirecting...', 'success');

            // Redirect after successful submission
            setTimeout(() => {
                window.location.href = form.id === 'loginForm' ? 'index.html' : 'login.html';
            }, 2000);
        }
    });
});

// Helper functions
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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
}

// Social login handlers
document.querySelectorAll('.social-button').forEach(button => {
    button.addEventListener('click', () => {
        const provider = button.classList.contains('google') ? 'Google' : 'Facebook';
        console.log(`${provider} login clicked`);
        // Implement social login logic here
    });
}); 