// DOM Elements
const loginBtn = document.querySelector('.login-btn');
const registerBtn = document.querySelector('.register-btn');
const authModal = document.getElementById('authModal');
const closeBtn = document.querySelector('.close-btn');
const tabBtns = document.querySelectorAll('.tab-btn');
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const navbar = document.querySelector('.navbar');

// Event Listeners
loginBtn.addEventListener('click', () => {
    authModal.style.display = 'block';
    showTab('login');
});

registerBtn.addEventListener('click', () => {
    authModal.style.display = 'block';
    showTab('register');
});

closeBtn.addEventListener('click', () => {
    authModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
    }
});

// Tab switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        showTab(tab);
    });
});

function showTab(tabName) {
    // Update active tab button
    tabBtns.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Show selected tab content
    if (tabName === 'login') {
        loginTab.style.display = 'block';
        registerTab.style.display = 'none';
    } else {
        loginTab.style.display = 'none';
        registerTab.style.display = 'block';
    }
}

// Form submissions
document.querySelector('.login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login submitted');
});

document.querySelector('.register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add registration logic here
    console.log('Registration submitted');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll behavior
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Gallery video play button
document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', () => {
        // Add video play logic here
        console.log('Play video clicked');
    });
}); 