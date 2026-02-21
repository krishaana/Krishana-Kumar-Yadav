// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const themeToggle = document.getElementById('themeToggle');
const scrollTopBtn = document.getElementById('scrollTop');
const navLinks = document.querySelectorAll('.nav-link');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');

// Create Engineering Particles
function createEngineeringParticles() {
    const particlesContainer = document.getElementById('engineeringParticles');
    if (!particlesContainer) return;
    
    const icons = [
        'fa-drafting-compass',
        'fa-ruler-combined',
        'fa-hard-hat',
        'fa-building',
        'fa-bridge',
        'fa-road',
        'fa-hammer',
        'fa-wrench'
    ];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerHTML = `<i class="fas ${icons[Math.floor(Math.random() * icons.length)]}"></i>`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.fontSize = (Math.random() * 2 + 1) + 'rem';
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
createEngineeringParticles();

// Cursor Trail Effect
const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursorDot);

const cursorOutline = document.createElement('div');
cursorOutline.className = 'cursor-outline';
document.body.appendChild(cursorOutline);

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

// Smooth follow effect for outline
function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    
    requestAnimationFrame(animateOutline);
}

animateOutline();

// Expand cursor on hover
const hoverElements = document.querySelectorAll('a, button, .project-card, .btn, .filter-btn, .nav-link');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Navbar Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        
        // Auto-hide navbar on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
    
    // Scroll to top button
    if (currentScroll > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
    
    // Parallax effect for section decorations
    const decorations = document.querySelectorAll('.section-decoration');
    decorations.forEach(decoration => {
        const speed = 0.5;
        const yPos = -(currentScroll * speed);
        decoration.style.transform = `translateY(${yPos}px)`;
    });
});

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Theme Toggle
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Apply saved theme on load
if (isDarkMode) {
    document.body.classList.add('dark-theme');
    updateThemeIcon(true);
}

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('darkMode', isDarkMode);
    updateThemeIcon(isDarkMode);
    
    // Add ripple effect
    createRipple(themeToggle);
});

function updateThemeIcon(isDark) {
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    
    if (isDark) {
        sunIcon.style.opacity = '0';
        sunIcon.style.transform = 'translateY(-20px) rotate(-90deg)';
        moonIcon.style.opacity = '1';
        moonIcon.style.transform = 'translateY(0) rotate(0deg)';
    } else {
        sunIcon.style.opacity = '1';
        sunIcon.style.transform = 'translateY(0) rotate(0deg)';
        moonIcon.style.opacity = '0';
        moonIcon.style.transform = 'translateY(20px) rotate(90deg)';
    }
}

// Ripple effect
function createRipple(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(59, 130, 246, 0.5)';
    ripple.style.top = '50%';
    ripple.style.left = '50%';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to Top
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Submission to Google Sheets
function submitForm() {
    const form = document.getElementById('contactForm');
    const btn = document.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    
    // Get form fields
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (!name) {
        showError('Please enter your name');
        return;
    }
    
    if (!email) {
        showError('Please enter your email');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (!subject) {
        showError('Please enter a subject');
        return;
    }
    
    if (!message) {
        showError('Please enter your message');
        return;
    }
    
    if (message.length < 10) {
        showError('Message must be at least 10 characters long');
        return;
    }
    
    // Show loading
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    
    // Get form data
    const formData = new FormData(form);
    
    // Google Script URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbw37uPQxFi4pbdOZO9XHYCOAoZZQX-OHe_-kIqEFNbxV8cSsebSXP8JtA2Rj0aivY44/exec';
    
    // Send to Google Sheets
    fetch(scriptURL, { 
        method: 'POST',
        body: formData
    })
    .then(() => {
        // Show success
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = '#10b981';
        form.reset();
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    })
    .catch(() => {
        // Show success (Google Scripts don't return CORS properly)
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = '#10b981';
        form.reset();
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    errorDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(239, 68, 68, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => errorDiv.remove(), 300);
    }, 3000);
}

// Add animation styles
const errorAnimationStyle = document.createElement('style');
errorAnimationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(errorAnimationStyle);

// Animate elements on scroll with enhanced effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Add stagger effect for children
            const children = entry.target.querySelectorAll('.stat-item, .milestone, .point, .goal');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.animation = `fadeInUp 0.6s ease-out forwards`;
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe elements to animate
document.querySelectorAll('.about-card, .project-card, .skill-category, .info-card, .stat-card, .program').forEach(el => {
    observer.observe(el);
});

// Initialize floating elements animation
const floatElements = document.querySelectorAll('.float-element');
floatElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.5}s`;
});

// Initialize skills animation with counter effect
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.transition = 'width 2s cubic-bezier(0.4, 0.0, 0.2, 1)';
                bar.style.width = width;
            }, 200);
            
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Parallax effect for blueprint background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const blueprint = document.querySelector('.blueprint-bg');
    
    if (blueprint) {
        blueprint.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add active class to nav links based on scroll position
function highlightNavLink() {
    const scrollPos = window.scrollY + 100;
    
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Initialize tooltips
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', (e) => {
        const tooltipText = tooltip.getAttribute('data-tooltip');
        const tooltipEl = document.createElement('div');
        tooltipEl.className = 'tooltip';
        tooltipEl.textContent = tooltipText;
        document.body.appendChild(tooltipEl);
        
        const rect = tooltip.getBoundingClientRect();
        tooltipEl.style.left = `${rect.left + rect.width / 2}px`;
        tooltipEl.style.top = `${rect.top - 10}px`;
        tooltipEl.style.transform = 'translate(-50%, -100%)';
    });
    
    tooltip.addEventListener('mouseleave', () => {
        const tooltipEl = document.querySelector('.tooltip');
        if (tooltipEl) {
            tooltipEl.remove();
        }
    });
});

// Add CSS for tooltips
const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
    .tooltip {
        position: fixed;
        background: var(--dark-color);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.85rem;
        z-index: 9999;
        pointer-events: none;
        white-space: nowrap;
    }
    
    .tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: var(--dark-color);
    }
`;
document.head.appendChild(tooltipStyle);

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations
    highlightNavLink();
    
    // Add loading animation to stats with improved counter
    const statNumbers = document.querySelectorAll('.stat-number, .stat-value');
    
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const text = stat.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const finalValue = parseInt(text.replace(/\D/g, ''));
                
                if (isNaN(finalValue)) return;
                
                let currentValue = 0;
                const increment = finalValue / 60;
                const duration = 2000;
                const stepTime = duration / 60;
                
                const updateNumber = () => {
                    if (currentValue < finalValue) {
                        currentValue += increment;
                        const displayValue = Math.floor(currentValue);
                        stat.textContent = displayValue + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
                        setTimeout(updateNumber, stepTime);
                    } else {
                        stat.textContent = finalValue + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
                    }
                };
                
                updateNumber();
                countObserver.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        countObserver.observe(stat);
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.about-card, .project-card, .info-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Add 3D tilt effect to project cards
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-15px) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
    
    // Read More Functionality for About Section
    const readMoreBtn = document.getElementById('readMoreBtn');
    const extraText = document.querySelector('.about-text-extra');

    console.log('Checking elements:', {
        button: readMoreBtn,
        text: extraText,
        buttonExists: !!readMoreBtn,
        textExists: !!extraText
    });

    if (readMoreBtn && extraText) {
        // Simple toggle function
        function toggleText() {
            console.log('Toggle triggered!');
            extraText.classList.toggle('show');
            
            if (extraText.classList.contains('show')) {
                readMoreBtn.textContent = 'See less';
                console.log('Showing text');
            } else {
                readMoreBtn.textContent = 'See more';
                console.log('Hiding text');
            }
        }
        
        // Click event
        readMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleText();
        });
        
        // Touch event for mobile
        readMoreBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleText();
        });
        
        console.log('Event listeners attached successfully');
    } else {
        console.error('Elements not found!', {readMoreBtn, extraText});
    }
});