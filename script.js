// ===== PORTFOLIO WEBSITE JAVASCRIPT =====
// Author: Alex Chen
// Description: Interactive functionality for CS student portfolio

// ===== GLOBAL VARIABLES =====
let particles = [];
const particleCount = 50;

// ===== DOM CONTENT LOADED EVENT =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality when page loads
    initializeNavigation();
    initializeScrollEffects();
    initializeSkillBars();
    initializeParticles();
    initializeContactForm();
    initializeAnimations();
    
    console.log('Portfolio website initialized successfully!');
});

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navLinksList = navLinks.querySelectorAll('a');

    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when clicking on nav links
    navLinksList.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Smooth scrolling for navigation links
    navLinksList.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link
        updateActiveNavLink();
        
        // Animate elements on scroll
        animateOnScroll();
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.content-section, .project-card, .timeline-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// ===== SKILL BARS ANIMATION =====
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    let animated = false;
    
    function animateSkillBars() {
        if (animated) return;
        
        const skillsSection = document.getElementById('skills');
        const skillsSectionTop = skillsSection.getBoundingClientRect().top;
        
        if (skillsSectionTop < window.innerHeight * 0.8) {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, Math.random() * 1000); // Random delay for stagger effect
            });
            animated = true;
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
    // Check on load
    animateSkillBars();
}

// ===== PARTICLE SYSTEM =====
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = startX + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        particlesContainer.appendChild(particle);
        
        // Remove and recreate particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                createParticle();
            }
        }, (duration + delay) * 1000);
    }
}

// ===== CONTACT FORM FUNCTIONALITY =====
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Sending message...', 'info');
        
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        }, 2000);
    });
}

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// ===== GENERAL ANIMATIONS =====
function initializeAnimations() {
    // Initialize elements for animation
    const animatedElements = document.querySelectorAll('.content-section, .project-card, .timeline-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Typing animation for hero subtitle
    initializeTypingAnimation();
    
    // Parallax effect for hero section
    initializeParallaxEffect();
}

// Typing animation for hero section
function initializeTypingAnimation() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    const typingSpeed = 100;
    
    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Start typing animation after hero loads
    setTimeout(typeWriter, 1000);
}

// Parallax effect for hero section
function initializeParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// ===== UTILITY FUNCTIONS =====

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.classList.add('scroll-to-top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', scrollToTop);
    
    // Hover effect
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', addScrollToTopButton);

// ===== PERFORMANCE OPTIMIZATIONS =====

// Optimize scroll events with throttling
window.addEventListener('scroll', throttle(function() {
    // Scroll-dependent functions are already called in initializeScrollEffects
}, 16)); // ~60fps

// Optimize resize events with debouncing
window.addEventListener('resize', debounce(function() {
    // Recalculate particle positions if needed
    if (window.innerWidth !== window.lastWidth) {
        window.lastWidth = window.innerWidth;
        // Re-initialize particles for new screen size
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            particlesContainer.innerHTML = '';
            initializeParticles();
        }
    }
}, 250));

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const menuToggle = document.getElementById('menu-toggle');
        const navLinks = document.getElementById('nav-links');
        
        if (navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Focus management for accessibility
document.addEventListener('focusin', function(e) {
    if (e.target.matches('a, button, input, textarea')) {
        e.target.style.outline = '2px solid #667eea';
        e.target.style.outlineOffset = '2px';
    }
});

document.addEventListener('focusout', function(e) {
    if (e.target.matches('a, button, input, textarea')) {
        e.target.style.outline = 'none';
    }
});

// ===== ERROR HANDLING =====

// Global error handler
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
🚀 Welcome to Alex Chen's Portfolio!
===================================
Built with vanilla HTML, CSS, and JavaScript
Features:
- Responsive design
- Smooth animations
- Interactive particle system
- Contact form validation
- Accessibility enhancements

Feel free to explore the code!

Contact: alex.chen@stanford.edu
GitHub: github.com/alexchen
LinkedIn: linkedin.com/in/alexchen-cs
`);

// ===== LAZY LOADING FOR IMAGES =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== THEME SWITCHING (OPTIONAL ENHANCEMENT) =====
function initializeThemeSwitch() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.classList.add('theme-toggle');
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 999;
        display: none; /* Hidden by default, can be enabled */
    `;
    
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// ===== ADVANCED PROJECT FILTERING =====
function initializeProjectFiltering() {
    const projects = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Create filter buttons container (if not exists)
    let filtersContainer = document.querySelector('.project-filters');
    if (!filtersContainer) {
        filtersContainer = document.createElement('div');
        filtersContainer.classList.add('project-filters');
        filtersContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        `;
        
        const projectsSection = document.querySelector('#projects .projects-grid');
        if (projectsSection) {
            projectsSection.parentNode.insertBefore(filtersContainer, projectsSection);
        }
    }
    
    // Filter categories based on project tech tags
    const categories = ['All', 'Web', 'AI/ML', 'Mobile', 'Data'];
    
    categories.forEach(category => {
        const filterBtn = document.createElement('button');
        filterBtn.textContent = category;
        filterBtn.classList.add('filter-btn');
        if (category === 'All') filterBtn.classList.add('active');
        
        filterBtn.style.cssText = `
            padding: 0.5rem 1.5rem;
            background: transparent;
            color: #667eea;
            border: 2px solid #667eea;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        `;
        
        filterBtn.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                btn.style.background = 'transparent';
                btn.style.color = '#667eea';
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            this.style.background = '#667eea';
            this.style.color = 'white';
            
            // Filter projects
            filterProjects(category);
        });
        
        filtersContainer.appendChild(filterBtn);
    });
    
    function filterProjects(category) {
        projects.forEach(project => {
            const techTags = project.querySelectorAll('.tech-tag');
            let shouldShow = category === 'All';
            
            if (!shouldShow) {
                techTags.forEach(tag => {
                    const tagText = tag.textContent.toLowerCase();
                    if (
                        (category === 'Web' && (tagText.includes('react') || tagText.includes('node') || tagText.includes('html') || tagText.includes('javascript'))) ||
                        (category === 'AI/ML' && (tagText.includes('tensorflow') || tagText.includes('pytorch') || tagText.includes('python'))) ||
                        (category === 'Mobile' && (tagText.includes('react native') || tagText.includes('flutter') || tagText.includes('swift'))) ||
                        (category === 'Data' && (tagText.includes('python') || tagText.includes('postgresql') || tagText.includes('mongodb')))
                    ) {
                        shouldShow = true;
                    }
                });
            }
            
            if (shouldShow) {
                project.style.display = 'block';
                project.style.animation = 'fadeInUp 0.6s ease';
            } else {
                project.style.display = 'none';
            }
        });
    }
}

// ===== LOADING SCREEN =====
function initializeLoadingScreen() {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <h2>Alex Chen</h2>
            <p>Loading portfolio...</p>
        </div>
    `;
    
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        color: white;
        text-align: center;
    `;
    
    // Add loading spinner styles
    const style = document.createElement('style');
    style.textContent = `
        .loading-content h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            animation: fadeInUp 1s ease;
        }
        
        .loading-content p {
            font-size: 1.2rem;
            opacity: 0.8;
            animation: fadeInUp 1s ease 0.3s both;
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 2rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.remove();
                }
            }, 500);
        }, 1500); // Show loading screen for at least 1.5 seconds
    });
}

// ===== CURSOR TRAIL EFFECT =====
function initializeCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.classList.add('cursor-trail');
        dot.style.cssText = `
            position: fixed;
            width: ${10 - i}px;
            height: ${10 - i}px;
            background: rgba(102, 126, 234, ${(trailLength - i) / trailLength});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    // Update trail position on mouse move
    document.addEventListener('mousemove', function(e) {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
            }, index * 50);
        });
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initializeIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                
                // Special handling for project cards
                if (entry.target.classList.contains('project-card')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, Math.random() * 300);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.content-section, .project-card, .timeline-item, .skill-category'
    );
    
    animatableElements.forEach(el => observer.observe(el));
}

// ===== ENHANCED PROJECT INTERACTIONS =====
function initializeProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', function() {
            // Play subtle hover sound (if audio is available)
            // This would require audio files to be included
        });
        
        // Add click analytics (placeholder)
        card.addEventListener('click', function() {
            const projectTitle = this.querySelector('h3').textContent;
            console.log(`Project clicked: ${projectTitle}`);
            // In a real implementation, you might send this to Google Analytics
        });
    });
}

// ===== EASTER EGGS =====
function initializeEasterEggs() {
    let konamiCode = [];
    const correctSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > correctSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(correctSequence)) {
            showEasterEgg();
            konamiCode = [];
        }
    });
    
    function showEasterEgg() {
        const easterEgg = document.createElement('div');
        easterEgg.innerHTML = `
            <div style="text-align: center; color: white;">
                <h2>🎉 Konami Code Activated! 🎉</h2>
                <p>You found the easter egg! Thanks for exploring!</p>
                <p>Here's a fun fact: This portfolio was built with pure vanilla JavaScript!</p>
            </div>
        `;
        
        easterEgg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #667eea, #764ba2);
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: bounceIn 0.8s ease;
        `;
        
        document.body.appendChild(easterEgg);
        
        setTimeout(() => {
            easterEgg.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                if (easterEgg.parentNode) {
                    easterEgg.remove();
                }
            }, 500);
        }, 5000);
    }
}

// ===== INITIALIZE ADDITIONAL FEATURES =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize additional features
    initializeLazyLoading();
    initializeProjectFiltering();
    initializeIntersectionObserver();
    initializeProjectInteractions();
    initializeEasterEggs();
    
    // Optional features (uncomment to enable)
    // initializeLoadingScreen();
    // initializeCursorTrail();
    // initializeThemeSwitch();
});

// ===== EXPORT FUNCTIONS FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        throttle,
        debounce,
        showNotification
    };
}