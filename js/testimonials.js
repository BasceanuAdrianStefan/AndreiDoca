// Testimonials Section - Advanced Vanilla JavaScript
class TestimonialsManager {
    constructor() {
        this.testimonials = [
            {
                id: 0,
                name: "Iulian Anghelache",
                position: "Founder & CEO",
                company: "CanaryTech & GrooveCV",
                text: "I’ve worked with Andrei on several projects, and it’s always been a smooth and productive experience. He’s a skilled UI/UX designer with a great eye for design and a strong understanding of user needs. Andrei is collaborative, proactive, and consistently delivers high-quality work. I’d gladly work with him again and highly recommend him.",
                avatar: "IA"
            },
            {
                id: 1,
                name: "Bogdan Negru", 
                position: "COO, Co-founder",
                company: "Liftup Solutions",
                text: "Andrei consistently delivers high-quality digital graphics with a keen eye for detail and a creative, thoughtful approach. Always eager to learn and grow, they bring dedication and adaptability to every project, making them a strong and reliable asset to any team.",
                avatar: "BN"
            },
            {
                id: 2,
                name: "Gabriel Wilkinson",
                position: "Recruitment Consultant",
                company: "Qualigence International",
                text: "Andrei is great to work with. The talent and passion he brings to the table are great addition to every project. His attention to detail and overall design process result in real customer satisfaction.",
                avatar: "GW"
            },
               {
                id: 3,
                name: "Hassan Abusalih ",
                position: "CEO @ FoodiZone",
                company: "FoodiZone",
                text: "I had the pleasure of working with Andrei on my recent project, and I couldn’t be happier with the experience. Andrei’s work ethic is truly impressive, he consistently went above and beyond to ensure everything was completed to the highest standard. I’m grateful for his dedication and highly recommend Andrei to anyone looking for a talented and reliable professional.",
                avatar: "HA"
            }
        ];
        
        this.currentTestimonial = 0;
        this.isVisible = false;
        this.statsAnimated = false;
        
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.setupElements();
        this.setupIntersectionObserver();
        this.setupEventListeners();
        this.setupAutoRotation();
    }
    
    setupElements() {
        this.section = document.getElementById('testimonials');
        this.header = this.section?.querySelector('.testimonials-header');
        this.containerCenter = this.section?.querySelector('.testimonials-container-center');
        this.navigation = this.section?.querySelector('.testimonials-navigation');
        this.stats = this.section?.querySelector('.testimonials-stats');
        this.navDots = this.section?.querySelectorAll('.nav-dot');
        this.featuredCard = this.section?.querySelector('.featured-card');
        
        if (!this.section) {
            console.warn('Testimonials section not found');
            return;
        }
    }
    
    setupIntersectionObserver() {
        if (!this.section) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !this.isVisible) {
                    this.isVisible = true;
                    this.playAnimations();
                }
            },
            {
                threshold: 0.2,
                rootMargin: '-50px'
            }
        );
        
        observer.observe(this.section);
    }
    
    playAnimations() {
        if (!this.isVisible) return;
        
        // Add visible class to section for CSS animations
        this.section.classList.add('visible');
        
        // Animate header
        setTimeout(() => {
            this.header?.classList.add('animate');
        }, 100);
        
        // Animate container
        setTimeout(() => {
            this.containerCenter?.classList.add('animate');
        }, 300);
        
        // Animate navigation
        setTimeout(() => {
            this.navigation?.classList.add('animate');
        }, 500);
        
       
    }
    
    setupEventListeners() {
        if (!this.navDots) return;
        
        // Navigation dots
        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchToTestimonial(index);
            });
        });
        
        // Remove side cards functionality - no longer needed
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isVisible) return;
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previousTestimonial();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextTestimonial();
            }
        });
    }
    
    setupAutoRotation() {
        // Auto-rotate testimonials every 8 seconds
        this.autoRotationInterval = setInterval(() => {
            if (this.isVisible) {
                this.nextTestimonial();
            }
        }, 8000);
        
        // Pause on hover
        this.section?.addEventListener('mouseenter', () => {
            clearInterval(this.autoRotationInterval);
        });
        
        // Resume on leave
        this.section?.addEventListener('mouseleave', () => {
            this.setupAutoRotation();
        });
    }
    
    switchToTestimonial(index) {
        if (index === this.currentTestimonial) return;
        
        const testimonial = this.testimonials[index];
        if (!testimonial) return;
        
        this.currentTestimonial = index;
        this.updateFeaturedCard(testimonial);
        this.updateNavigation();
    }
    
    updateFeaturedCard(testimonial) {
        if (!this.featuredCard) return;
        
        // Add transition class
        this.featuredCard.style.opacity = '0.7';
        this.featuredCard.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            // Update content
            const textElement = this.featuredCard.querySelector('.testimonial-text');
            const nameElement = this.featuredCard.querySelector('.client-name');
            const positionElement = this.featuredCard.querySelector('.client-position');
            const companyElement = this.featuredCard.querySelector('.client-company');
            const avatarElement = this.featuredCard.querySelector('.avatar-placeholder');
            
            if (textElement) textElement.textContent = `"${testimonial.text}"`;
            if (nameElement) nameElement.textContent = testimonial.name;
            if (positionElement) positionElement.textContent = testimonial.position;
            if (companyElement) {
                if (testimonial.company) {
                    companyElement.textContent = testimonial.company;
                    companyElement.style.display = 'block';
                } else {
                    companyElement.style.display = 'none';
                }
            }
            if (avatarElement) avatarElement.textContent = testimonial.avatar;
            
            // Restore appearance
            this.featuredCard.style.opacity = '1';
            this.featuredCard.style.transform = 'scale(1)';
        }, 200);
    }
    
    updateNavigation() {
        this.navDots?.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentTestimonial);
        });
    }
    
    // Remove updateSideCards - no longer needed
    
    nextTestimonial() {
        const nextIndex = (this.currentTestimonial + 1) % this.testimonials.length;
        this.switchToTestimonial(nextIndex);
    }
    
    previousTestimonial() {
        const prevIndex = this.currentTestimonial === 0 
            ? this.testimonials.length - 1 
            : this.currentTestimonial - 1;
        this.switchToTestimonial(prevIndex);
    }
    
    animateStats() {
        if (this.statsAnimated) return;
        this.statsAnimated = true;
        
        const statNumbers = this.stats?.querySelectorAll('.stat-number');
        if (!statNumbers) return;
        
        statNumbers.forEach((numberElement, index) => {
            const target = parseInt(numberElement.dataset.target);
            const duration = 2000 + (index * 200); // Staggered animation
            
            this.animateNumber(numberElement, target, duration);
        });
    }
    
    animateNumber(element, target, duration) {
        const steps = 60;
        const increment = target / steps;
        const stepTime = duration / steps;
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= target) {
                element.textContent = target;
                clearInterval(timer);
                
                // Add completion effect
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            } else {
                element.textContent = Math.floor(currentValue);
            }
        }, stepTime);
    }
    
    // Public API
    getCurrentTestimonial() {
        return this.currentTestimonial;
    }
    
    getTotalTestimonials() {
        return this.testimonials.length;
    }
    
    goToTestimonial(index) {
        this.switchToTestimonial(index);
    }
    
    destroy() {
        clearInterval(this.autoRotationInterval);
    }
}

// Initialize testimonials manager
let testimonialsManager;

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        testimonialsManager = new TestimonialsManager();
    });
} else {
    testimonialsManager = new TestimonialsManager();
}

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestimonialsManager;
} else if (typeof window !== 'undefined') {
    window.TestimonialsManager = TestimonialsManager;
    window.testimonialsManager = testimonialsManager;
}

// Advanced touch gestures for mobile
class TouchGestureHandler {
    constructor(testimonialsManager) {
        this.testimonialsManager = testimonialsManager;
        this.startX = 0;
        this.startY = 0;
        this.threshold = 50;
        
        this.setupTouchEvents();
    }
    
    setupTouchEvents() {
        const section = document.getElementById('testimonials');
        if (!section) return;
        
        section.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
        }, { passive: true });
        
        section.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - this.startX;
            const deltaY = endY - this.startY;
            
            // Only handle horizontal swipes
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.threshold) {
                if (deltaX > 0) {
                    // Swipe right - previous
                    this.testimonialsManager.previousTestimonial();
                } else {
                    // Swipe left - next
                    this.testimonialsManager.nextTestimonial();
                }
            }
        }, { passive: true });
    }
}

// Initialize touch gestures when testimonials manager is ready
if (typeof window !== 'undefined') {
    setTimeout(() => {
        if (window.testimonialsManager) {
            new TouchGestureHandler(window.testimonialsManager);
        }
    }, 1000);
}