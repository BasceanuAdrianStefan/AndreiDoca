// DOM Elements
const viewWorkBtn = document.getElementById('viewWorkBtn');
const downloadCvBtn = document.getElementById('downloadCvBtn');
const getInTouchBtn = document.getElementById('getInTouchBtn');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNavigation = document.getElementById('mobileNavigation');

// Button click handlers
viewWorkBtn.addEventListener('click', function() {
    // Add your "View My Work" functionality here
    console.log('View My Work clicked');
    // Example: scroll to portfolio section, open modal, navigate to portfolio page, etc.
    alert('Portfolio section coming soon!');
});

downloadCvBtn.addEventListener('click', function() {
    // Add your "Download CV" functionality here
    console.log('Download CV clicked');
    // Example: trigger file download
    alert('CV download functionality coming soon!');
});

getInTouchBtn.addEventListener('click', function() {
    // Add your "Get In Touch" functionality here
    console.log('Get In Touch clicked');
    // Example: scroll to contact section, open modal, etc.
    alert('Contact functionality coming soon!');
});

// Mobile menu toggle functionality
mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileNavigation.classList.toggle('active');
});

// Navigation link functionality
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        
        // Add active class to clicked link (only for desktop nav)
        if (this.classList.contains('nav-link')) {
            this.classList.add('active');
        }
        
        // Close mobile menu if open
        mobileMenuToggle.classList.remove('active');
        mobileNavigation.classList.remove('active');
        
        // Handle navigation based on href
        const href = this.getAttribute('href');
        console.log('Navigating to:', href);
        
        // Add your navigation logic here
        // Example: scroll to section, change page content, etc.
        alert(`Navigation to ${href} section coming soon!`);
    });
});

// Optional: Add smooth animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to elements
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    // Add animation classes
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    heroImage.style.opacity = '0';
    heroImage.style.transform = 'translateY(20px)';
    
    // Animate elements with a slight delay
    setTimeout(() => {
        heroContent.style.transition = 'all 0.6s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        heroImage.style.transition = 'all 0.6s ease';
        heroImage.style.opacity = '1';
        heroImage.style.transform = 'translateY(0)';
    }, 300);
});

// Optional: Add hover effects for statistics
const statItems = document.querySelectorAll('.stat-item');
statItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.transition = 'transform 0.2s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Optional: Add parallax effect to decorative elements
const decorations = document.querySelectorAll('.decoration');
document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    decorations.forEach((decoration, index) => {
        const speed = (index + 1) * 2;
        const x = mouseX * speed;
        const y = mouseY * speed;
        
        decoration.style.transform = `translate(${x}px, ${y}px)`;
        decoration.style.transition = 'transform 0.1s ease';
    });
});

// Smooth scroll behavior for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.header') && mobileNavigation.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        mobileNavigation.classList.remove('active');
    }
});

// Add hover animations for principle cards
const principleCards = document.querySelectorAll('.principle-card');
principleCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.principle-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.principle-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('principle-card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Observe principle cards for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Set initial states for animation
    principleCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});