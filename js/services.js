// Services section functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Service cards - only subtle shadow effect handled by CSS
    const serviceCards = document.querySelectorAll('.service-card');

    // Intersection Observer for scroll animations
    const servicesObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-in');
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Set initial animation states and observe cards
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        servicesObserver.observe(card);
    });

    // Smooth scroll to sections when service badges are clicked
    const serviceBadges = document.querySelectorAll('.service-badge');
    serviceBadges.forEach(badge => {
        badge.style.cursor = 'pointer';
        badge.addEventListener('click', function() {
            const card = this.closest('.service-card');
            if (card) {
                card.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });
    
    console.log('Services JavaScript loaded successfully!');
});