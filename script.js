/* ===========================
   TEENZNET RYAD - MAIN JAVASCRIPT
   =========================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAOS();
    initializeScrollEffects();
    initializeFormValidation();
    initializeParticles();
    initializeScrollIndicator();
});

/* ===========================
   NAVIGATION
   =========================== */

function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('active');
        } else {
            navbar.classList.remove('active');
        }
    });

    // Smooth scroll and active nav update on page load
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

/* ===========================
   AOS (ANIMATE ON SCROLL)
   =========================== */

function initializeAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true,
        offset: 100,
        disable: 'mobile'
    });

    // Refresh AOS on window resize
    window.addEventListener('resize', () => {
        AOS.refresh();
    });
}

/* ===========================
   SCROLL EFFECTS
   =========================== */

function initializeScrollEffects() {
    const elementsToAnimate = document.querySelectorAll('.mission-card, .area-card, .method-item, .join-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `slideUp 0.6s ease forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

/* ===========================
   FORM VALIDATION
   =========================== */

function initializeFormValidation() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const subject = this.querySelectorAll('input[type="text"]')[1]?.value.trim() || '';
            const message = this.querySelector('textarea').value.trim();

            // Validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Show success message
            showNotification('Message sent successfully! We will get back to you soon.', 'success');

            // Reset form
            this.reset();

            // You can add actual form submission logic here
            // e.g., send data to a backend service
        });
    }
}

/* ===========================
   EMAIL VALIDATION
   =========================== */

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* ===========================
   NOTIFICATION SYSTEM
   =========================== */

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles to notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '20px 30px',
        borderRadius: '8px',
        color: 'white',
        fontSize: '1rem',
        fontWeight: '600',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease forwards',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px'
    });

    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #FF6B6B, #FF5252)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #4ECDC4, #45b8b1)';
    }

    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

/* ===========================
   PARTICLE BACKGROUND
   =========================== */

function initializeParticles() {
    const canvas = document.createElement('canvas');
    const canvasContainer = document.querySelector('.hero');

    if (!canvasContainer) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';

    const ctx = canvas.getContext('2d');
    const particles = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 107, 107, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Only add particles to hero section on desktop
    if (window.innerWidth > 768) {
        canvasContainer.appendChild(canvas);
        animate();
    }
}

/* ===========================
   SCROLL INDICATOR
   =========================== */

function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
}

/* ===========================
   COUNTER ANIMATION
   =========================== */

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;

        const updateCount = () => {
            const count = +counter.innerText;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}

/* ===========================
   BUTTON RIPPLE EFFECT
   =========================== */

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple';

        // Add ripple styles
        Object.assign(ripple.style, {
            position: 'absolute',
            width: '20px',
            height: '20px',
            background: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '50%',
            pointerEvents: 'none',
            animation: 'rippleEffect 0.6s ease-out'
        });

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

/* ===========================
   SMOOTH SCROLL BEHAVIOR
   =========================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/* ===========================
   KEYBOARD NAVIGATION
   =========================== */

document.addEventListener('keydown', function(e) {
    const navLinks = document.querySelectorAll('.nav-link');

    if (e.key === 'ArrowRight' && document.activeElement.className.includes('nav-link')) {
        const currentIndex = Array.from(navLinks).indexOf(document.activeElement);
        if (currentIndex < navLinks.length - 1) {
            navLinks[currentIndex + 1].focus();
        }
    } else if (e.key === 'ArrowLeft' && document.activeElement.className.includes('nav-link')) {
        const currentIndex = Array.from(navLinks).indexOf(document.activeElement);
        if (currentIndex > 0) {
            navLinks[currentIndex - 1].focus();
        }
    }
});

/* ===========================
   LAZY LOAD IMAGES
   =========================== */

function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

/* ===========================
   DYNAMIC CARD HOVER EFFECT
   =========================== */

document.querySelectorAll('.area-card, .method-item, .mission-card, .join-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) rotate(1deg)';
        this.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

/* ===========================
   NAVIGATION ACTIVE STATE ON SCROLL
   =========================== */

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

updateActiveNavigation();

/* ===========================
   GSAP-LIKE ANIMATIONS (CSS-based)
   =========================== */

function createCustomAnimation(element, duration = 1000, delay = 0) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';

    setTimeout(() => {
        element.style.transition = `all ${duration}ms ease`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, delay);
}

/* ===========================
   SCROLL PROGRESS BAR
   =========================== */

function initializeScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #FF6B6B, #4ECDC4);
        width: 0%;
        z-index: 999;
        transition: width 0.1s ease;
    `;

    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

initializeScrollProgressBar();

/* ===========================
   UTILITY FUNCTIONS
   =========================== */

// Debounce function for performance
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

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    @keyframes rippleEffect {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }

    @keyframes floatUp {
        to {
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

/* ===========================
   INTERSECTION OBSERVER FOR ELEMENTS
   =========================== */

const observerElements = document.querySelectorAll('[data-aos]');
const observerConfig = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
        }
    });
}, observerConfig);

observerElements.forEach(element => {
    element.style.opacity = '0';
    elementObserver.observe(element);
});

/* ===========================
   PAGE LOAD COMPLETE
   =========================== */

window.addEventListener('load', () => {
    // Add loaded class to body
    document.body.classList.add('page-loaded');

    // Animate elements on page load
    document.querySelectorAll('.mission-card, .area-card').forEach((element, index) => {
        setTimeout(() => {
            element.style.animation = `slideUp 0.6s ease forwards`;
        }, index * 100);
    });

    // Log that page is ready
    console.log('TEENZNET RYAD Landing Page is ready!');
});