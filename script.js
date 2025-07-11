// script.js

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (target === 98 ? '%' : target > 100 ? '+' : '');
    }, 20);
}

// Stats counter animation
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/[^0-9]/g, ''));
            animateCounter(statNumber, number);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver.observe(item);
});

// Form submission
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simple form validation
    if (!data.name || !data.email || !data.subject || !data.message) {
        // Using a custom modal or message box instead of alert()
        const messageBox = document.createElement('div');
        messageBox.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: var(--card-bg); /* Use theme color */
            color: var(--body-text-color); /* Use theme color */
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            text-align: center;
        `;
        messageBox.innerHTML = `
            <p>Please fill in all fields.</p>
            <button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 10px 20px; background: linear-gradient(45deg, var(--plan-button-bg-start), var(--plan-button-bg-end)); color: white; border: none; border-radius: 5px; cursor: pointer;">OK</button>
        `;
        document.body.appendChild(messageBox);
        return;
    }
    
    // Simulate form submission
    const button = this.querySelector('.form-button');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;
    
    setTimeout(() => {
        const messageBox = document.createElement('div');
        messageBox.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: var(--card-bg); /* Use theme color */
            color: var(--body-text-color); /* Use theme color */
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            text-align: center;
        `;
        messageBox.innerHTML = `
            <p>Thank you for your message! We'll get back to you soon.</p>
            <button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 10px 20px; background: linear-gradient(45deg, var(--plan-button-bg-start), var(--plan-button-bg-end)); color: white; border: none; border-radius: 5px; cursor: pointer;">OK</button>
        `;
        document.body.appendChild(messageBox);

        this.reset();
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
});

// Add some interactive particles to hero section
function createParticle() {
    const hero = document.querySelector('.hero');
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255,255,255,0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: particle-float 8s linear infinite;
        left: ${Math.random() * 100}%;
        top: 100%;
        z-index: 1;
    `;
    
    hero.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 8000);
}

// Add particle animation CSS
// This style block will be added to the head by JavaScript.
// It's placed here for logical grouping with createParticle function.
const style = document.createElement('style');
style.textContent = `
    @keyframes particle-float {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create particles periodically
setInterval(createParticle, 1000);

// Add hover effects to cards
document.querySelectorAll('.service-card, .plan-card, .portfolio-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = this.classList.contains('featured') ? 
            'scale(1.05) translateY(-10px)' : 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = this.classList.contains('featured') ? 
            'scale(1.05)' : '';
    });
});

// --- Dark Mode Functionality ---

const themeToggleBtn = document.getElementById('theme-toggle');

// Function to set the theme
function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

// Function to toggle the theme
function toggleTheme() {
    if (document.body.classList.contains('dark-mode')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
}

// Event listener for the toggle button
themeToggleBtn.addEventListener('click', toggleTheme);

// Load theme preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Check for system dark mode preference if no theme is saved
        setTheme('dark');
    } else {
        setTheme('light'); // Default to light mode
    }
});
