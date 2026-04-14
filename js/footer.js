// Footer functionality

// Footer link smooth scrolling
const footerLinks = document.querySelectorAll('.footer-link[href^="#"]');
footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        const targetSection = document.querySelector(href);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Social media link hover effects
const socialLinks = document.querySelectorAll('.footer-social-link');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        const svg = this.querySelector('svg');
        if (svg) {
            svg.style.transform = 'scale(1.1) rotate(5deg)';
            svg.style.transition = 'transform 0.2s ease';
        }
    });
    
    link.addEventListener('mouseleave', function() {
        const svg = this.querySelector('svg');
        if (svg) {
            svg.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Email link functionality
const emailLink = document.querySelector('.footer-contact-link[href^="mailto:"]');
if (emailLink) {
    emailLink.addEventListener('click', function(e) {
        // Optional: Add analytics tracking or custom behavior
        console.log('Email link clicked');
    });
}

// IG link functionality
const igLink = document.querySelector('.footer-ig-link');
if (igLink) {
    igLink.addEventListener('click', function(e) {
        e.preventDefault();
        // Add your Instagram URL here
        const instagramUrl = 'https://instagram.com/andrei_doca'; // Replace with actual Instagram URL
        window.open(instagramUrl, '_blank');
    });
}

// Add scroll-to-top functionality on footer brand title click
const footerBrandTitle = document.querySelector('.footer-brand-title');
if (footerBrandTitle) {
    footerBrandTitle.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add cursor pointer style
    footerBrandTitle.style.cursor = 'pointer';
}

// Intersection Observer for footer animation
const footerObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const footerObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const footerColumns = entry.target.querySelectorAll('.footer-brand, .footer-column');
            footerColumns.forEach((column, index) => {
                setTimeout(() => {
                    column.style.opacity = '1';
                    column.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, footerObserverOptions);

// Initialize footer animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const footerSection = document.querySelector('.footer-section');
    if (footerSection) {
        // Set initial states for animation
        const footerColumns = footerSection.querySelectorAll('.footer-brand, .footer-column');
        footerColumns.forEach(column => {
            column.style.opacity = '0';
            column.style.transform = 'translateY(30px)';
            column.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        footerObserver.observe(footerSection);
    }
});