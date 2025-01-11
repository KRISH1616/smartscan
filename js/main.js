// Navigation and UI Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Show/Hide Dashboard
    const dashboardTrigger = document.querySelector('.primary-btn');
    const dashboard = document.querySelector('#dashboard');
    
    dashboardTrigger?.addEventListener('click', () => {
        dashboard.classList.remove('hidden');
        dashboard.scrollIntoView({ behavior: 'smooth' });
    });
});

// Theme Toggle (Dark/Light Mode)
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}