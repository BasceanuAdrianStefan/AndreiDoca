// Projects section functionality

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(filterBtn => {
            filterBtn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter projects
        filterProjects(filterValue);
    });
});

function filterProjects(filter) {
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
            // Add entrance animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 100);
        } else {
            card.classList.add('hidden');
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
        }
    });
}

// Project card hover animations
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const image = this.querySelector('.project-image');
        if (image) {
            image.style.transform = 'scale(1.05)';
            image.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const image = this.querySelector('.project-image');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// Tech tag hover animations
const techTags = document.querySelectorAll('.tech-tag');
techTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.transition = 'transform 0.2s ease';
        this.style.backgroundColor = '#e2e8f0';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.backgroundColor = '#f1f5f9';
    });
});

// Intersection Observer for scroll animations
const projectsObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const projectsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('project-card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, projectsObserverOptions);

// Initialize scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Set initial states for animation
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        projectsObserver.observe(card);
    });
});

// Project card click handler - Behance links
projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Prevent default behavior
        e.preventDefault();
        
        // Get URL from data attribute
        const projectUrl = this.getAttribute('data-behance');
        const title = this.querySelector('.project-title').textContent;
        
        if (projectUrl) {
            // Add click animation before opening link
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
            
            setTimeout(() => {
                this.style.transform = '';
                
                // Check if it's an external link (starts with http:// or https://)
                if (projectUrl.startsWith('http://') || projectUrl.startsWith('https://')) {
                    // Open external link in new tab
                    window.open(projectUrl, '_blank', 'noopener,noreferrer');
                } else {
                    // Save scroll position for return navigation (local pages only)
                    sessionStorage.setItem('returnToProjects', 'true');
                    // Navigate to local page in the same tab
                    window.location.href = projectUrl;
                }
            }, 100);
            
            console.log(`Opening project: ${title} - ${projectUrl}`);
        } else {
            console.log(`No link found for project: ${title}`);
        }
    });
    
    // Add cursor pointer style to indicate clickable
    card.style.cursor = 'pointer';
    
    // Add hover effect for better UX
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});