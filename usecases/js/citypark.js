// Before/After Image Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.before-after-container');
    const slider = document.getElementById('slider');
    const afterImage = document.getElementById('afterImage');
    
    if (!container || !slider || !afterImage) return;
    
    let isDragging = false;
    
    function updateSlider(x) {
        const rect = container.getBoundingClientRect();
        const offsetX = x - rect.left;
        const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
        
        slider.style.left = percentage + '%';
        afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }
    
    // Mouse events
    container.addEventListener('mousedown', function(e) {
        isDragging = true;
        updateSlider(e.clientX);
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        updateSlider(e.clientX);
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    // Touch events
    container.addEventListener('touchstart', function(e) {
        isDragging = true;
        updateSlider(e.touches[0].clientX);
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        updateSlider(e.touches[0].clientX);
    });
    
    document.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    // Prevent default drag behavior
    container.addEventListener('dragstart', function(e) {
        e.preventDefault();
    });
});

// Smooth scroll for anchors (if needed)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return; // Skip for back button
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Back button scroll effect
let lastScroll = 0;
const backButton = document.getElementById('backButton');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        backButton.style.opacity = '1';
        backButton.style.visibility = 'visible';
    } else {
        backButton.style.opacity = '0.9';
        backButton.style.visibility = 'visible';
    }
    
    lastScroll = currentScroll;
});

