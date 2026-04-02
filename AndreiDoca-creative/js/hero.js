// Hero section functionality - Vanilla JS

// Debug function to reset animations (useful for development)
function resetHeroAnimations() {
    hasCounterAnimated = false;
    hasFloatingElementsAnimated = false;
    hasGeometricShapesAnimated = false;
    hasFloatingDotsAnimated = false;
    console.log('🔄 Hero animations reset - ready for testing');
}

// Make reset function available globally for debugging
window.resetHeroAnimations = resetHeroAnimations;

// View Work button functionality
const viewWorkBtn = document.getElementById('view-work-btn');
if (viewWorkBtn) {
    viewWorkBtn.addEventListener('click', function() {
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            const targetPosition = projectsSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Download CV button functionality
const downloadCvBtn = document.getElementById('download-cv-btn');
if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior if it's an <a> tag
        
        // Create download link
        const link = document.createElement('a');
        link.href = './assets/cv/Andrei Doca_CV.pdf';
        link.download = 'Andrei Doca_CV.pdf'; // Custom filename for download
        link.target = '_blank'; // Open in new tab as fallback
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('✅ CV download initiated');
    });
}

// Button hover effects
const heroButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
heroButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.btn-icon');
        if (icon) {
            icon.style.transform = 'translateX(2px)';
            icon.style.transition = 'transform 0.2s ease';
        }
    });
    
    button.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.btn-icon');
        if (icon) {
            icon.style.transform = 'translateX(0)';
        }
    });
});

// Profile image container hover effects
const imageContainerWrapper = document.querySelector('.image-container-wrapper');
if (imageContainerWrapper) {
    imageContainerWrapper.addEventListener('mouseenter', function() {
        // All hover effects are handled by CSS :hover pseudo-classes
        // This is just for additional JS-based effects if needed
        
        // Add extra floating animation to dots
        const floatingDots = this.querySelectorAll('.floating-dot');
        floatingDots.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.animationDuration = '1.5s';
            }, index * 100);
        });
        
        // Add extra rotation to geometric shapes
        const geoShapes = this.querySelectorAll('.geo-shape');
        geoShapes.forEach((shape, index) => {
            setTimeout(() => {
                if (shape.classList.contains('shape-2')) {
                    shape.style.transform += ' rotate(180deg)';
                }
            }, index * 150);
        });
    });
    
    imageContainerWrapper.addEventListener('mouseleave', function() {
        // Reset floating dots animation
        const floatingDots = this.querySelectorAll('.floating-dot');
        floatingDots.forEach(dot => {
            dot.style.animationDuration = '3s';
        });
        
        // Reset geometric shapes
        const geoShapes = this.querySelectorAll('.geo-shape');
        geoShapes.forEach(shape => {
            if (shape.classList.contains('shape-2')) {
                shape.style.transform = 'rotate(45deg)';
            }
        });
    });
}

// Floating elements entrance animation
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'scale(0.5) translateY(20px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        // Animate in with staggered delay
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1) translateY(0)';
        }, 800 + (index * 150));
    });
}

// Geometric shapes entrance animation
function animateGeometricShapes() {
    const geoShapes = document.querySelectorAll('.geo-shape');
    
    geoShapes.forEach((shape, index) => {
        // Set initial state
        shape.style.opacity = '0';
        shape.style.transform += ' scale(0)';
        shape.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        // Animate in with staggered delay
        setTimeout(() => {
            shape.style.opacity = '0.6';
            const currentTransform = shape.style.transform.replace('scale(0)', 'scale(1)');
            shape.style.transform = currentTransform;
        }, 1200 + (index * 200));
    });
}

// Floating dots entrance animation
function animateFloatingDots() {
    const dots = document.querySelectorAll('.floating-dot');
    
    dots.forEach((dot, index) => {
        // Set initial state
        dot.style.opacity = '0';
        dot.style.transform = 'scale(0)';
        dot.style.transition = 'all 0.5s ease-out';
        
        // Animate in with staggered delay
        setTimeout(() => {
            dot.style.opacity = '0.7';
            dot.style.transform = 'scale(1)';
        }, 1000 + (index * 300));
    });
}

// Statistics counter animation - RUNS ONLY ONCE
let hasCounterAnimated = false; // Flag to track if counter has already run

function animateCounters() {
    // Exit early if counter has already been animated
    if (hasCounterAnimated) {
        console.log('🎯 Counter already animated - skipping');
        return;
    }
    
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Mark as animated immediately to prevent multiple executions
    hasCounterAnimated = true;
    console.log('✨ Starting counter animation - FIRST TIME ONLY');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const suffix = stat.textContent.includes('+') ? '+' : '';
        let current = 0;
        const increment = target / 30; // Animation duration control
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + suffix;
        }, 50);
    });
}

// Global animation flags
let hasHeroAnimated = false;
let hasFloatingElementsAnimated = false;
let hasGeometricShapesAnimated = false;
let hasFloatingDotsAnimated = false;

// Intersection Observer for animations
const heroObserverOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate hero content - always runs for smooth entrance
            const heroContent = entry.target.querySelector('.hero-content');
            const heroImage = entry.target.querySelector('.hero-image');
            
            if (heroContent) {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }
            
            if (heroImage) {
                setTimeout(() => {
                    heroImage.style.opacity = '1';
                    heroImage.style.transform = 'translateY(0)';
                }, 200);
            }
            
            // Start counter animation - ONLY ONCE
            setTimeout(animateCounters, 500);
            
            // Animate floating elements - ONLY ONCE
            if (!hasFloatingElementsAnimated) {
                setTimeout(() => {
                    animateFloatingElements();
                    hasFloatingElementsAnimated = true;
                }, 600);
            }
            
            // Animate geometric shapes - ONLY ONCE
            if (!hasGeometricShapesAnimated) {
                setTimeout(() => {
                    animateGeometricShapes();
                    hasGeometricShapesAnimated = true;
                }, 800);
            }
            
            // Animate floating dots - ONLY ONCE
            if (!hasFloatingDotsAnimated) {
                setTimeout(() => {
                    animateFloatingDots();
                    hasFloatingDotsAnimated = true;
                }, 1000);
            }
        }
    });
}, heroObserverOptions);

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        // Set initial states for animation
        const heroContent = heroSection.querySelector('.hero-content');
        const heroImage = heroSection.querySelector('.hero-image');
        
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        if (heroImage) {
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'translateY(30px)';
            heroImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        heroObserver.observe(heroSection);
    }
});

// Availability badge pulse effect
const statusDot = document.querySelector('.status-dot');
if (statusDot) {
    // Add extra pulse effect on hover
    const availabilityBadge = document.querySelector('.availability-badge');
    if (availabilityBadge) {
        availabilityBadge.addEventListener('mouseenter', function() {
            statusDot.style.animation = 'pulse 0.5s infinite';
        });
        
        availabilityBadge.addEventListener('mouseleave', function() {
            statusDot.style.animation = 'pulse 2s infinite';
        });
    }
}

/* 
🎯 COUNTER BEHAVIOR:
- Counter animația se execută DOAR o singură dată când ajungi prima oară pe pagină
- Elementele floating, geometric shapes și dots se animează și ele doar o singură dată
- Hero content fade-in se execută de fiecare dată pentru smooth transitions
- Pentru debugging, poți folosi: resetHeroAnimations() în console

✨ VANILLA JS IMPLEMENTATION:
- Zero dependencies, pure JavaScript
- Optimized performance cu flags pentru animații
- Smooth user experience cu animații staggered
- Responsive și compatibil cu toate browser-ele moderne
*/