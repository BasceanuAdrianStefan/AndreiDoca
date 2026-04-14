// About section functionality
document.addEventListener('DOMContentLoaded', function() {

    // Principle card hover effects - only subtle shadow changes
    const principleCards = document.querySelectorAll('.principle-card');

    principleCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // No icon scaling, just a subtle border change
            this.style.borderColor = 'rgba(99, 102, 241, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset border
            this.style.borderColor = 'rgba(0, 0, 0, 0.05)';
        });
    });

    // Intersection Observer for scroll animations
    const aboutObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate section header
                const header = entry.target.querySelector('.about-header');
                if (header) {
                    header.style.opacity = '1';
                    header.style.transform = 'translateY(0)';
                }
                
                // Animate principle cards with staggered delay
                const cards = entry.target.querySelectorAll('.principle-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    // Initialize scroll animations
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        // Set initial states for header animation
        const header = aboutSection.querySelector('.about-header');
        if (header) {
            header.style.opacity = '0';
            header.style.transform = 'translateY(30px)';
            header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        
        // Set initial states for card animations
        const cards = aboutSection.querySelectorAll('.principle-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.2s ease';
        });
        
        aboutObserver.observe(aboutSection);
    }
    
    console.log('About JavaScript loaded successfully!');
});