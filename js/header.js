// Header functionality

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Use setTimeout to ensure HTML is loaded
    setTimeout(function() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navMobile = document.getElementById('nav-mobile');

        console.log('Mobile toggle button:', mobileMenuToggle);
        console.log('Mobile nav:', navMobile);

        if (mobileMenuToggle && navMobile) {
            mobileMenuToggle.addEventListener('click', function() {
                console.log('Mobile menu clicked!');
                mobileMenuToggle.classList.toggle('active');
                navMobile.classList.toggle('active');
                
                // Prevent body scrolling when menu is open
                if (navMobile.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
        } else {
            console.error('Mobile menu elements not found!');
        }
    }, 100);
});

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.nav-mobile-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        navMobile.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for navigation links INCLUDING logo
const allNavLinks = document.querySelectorAll('.nav-link, .nav-mobile-link, .logo-link');
allNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
        
        // Close mobile menu if open when clicking logo
        const navMobile = document.getElementById('nav-mobile');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        if (navMobile && navMobile.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class when scrolling down
    if (scrollTop > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// CTA button functionality
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Scroll to contact section or open contact modal
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = contactSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        if (navMobile && navMobile.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Active nav link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link, .logo-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 150; // Adjusted offset for better detection
    
    // Check if we're at the top of the page (show home as active)
    if (window.scrollY < 100) {
        currentSection = 'home';
    } else {
        // Find the current section based on scroll position
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
    }
    
    // Update nav links active state (including logo)
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Update active nav link on scroll and page load
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (navMobile && navMobile.classList.contains('active')) {
        if (!navMobile.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        if (navMobile && navMobile.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});