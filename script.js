// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initServicesDropdown();
    initProductTabs();
    initContactForm();
    initScrollAnimations();
    initSmoothScrolling();
    initFAQ();
});

// Navigation Functionality
function initNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Services Dropdown Functionality
function initServicesDropdown() {
    const servicesLink = document.querySelector('.services-dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (servicesLink && dropdownMenu) {
        let isOpen = false;
        
        // Toggle dropdown on click
        servicesLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            isOpen = !isOpen;
            dropdownMenu.classList.toggle('show', isOpen);
            servicesLink.classList.toggle('active', isOpen);
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!servicesLink.contains(e.target) && !dropdownMenu.contains(e.target)) {
                isOpen = false;
                dropdownMenu.classList.remove('show');
                servicesLink.classList.remove('active');
            }
        });
        
        // Handle dropdown item clicks
        const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                // Close dropdown
                isOpen = false;
                dropdownMenu.classList.remove('show');
                servicesLink.classList.remove('active');
                
                // Navigate to section with smooth scroll
                if (href.startsWith('#')) {
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 120; // Account for fixed navbar and padding
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    // Navigate to different page
                    window.location.href = href;
                }
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                const navMenu = document.getElementById('nav-menu');
                if (mobileMenu && navMenu) {
                    mobileMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isOpen) {
                isOpen = false;
                dropdownMenu.classList.remove('show');
                servicesLink.classList.remove('active');
            }
        });
    }
}

// Product Tabs Functionality
function initProductTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const productCategories = document.querySelectorAll('.product-category');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');

            // Remove active class from all tabs and categories
            tabButtons.forEach(btn => btn.classList.remove('active'));
            productCategories.forEach(category => category.classList.remove('active'));

            // Add active class to clicked tab and corresponding category
            this.classList.add('active');
            document.getElementById(targetCategory).classList.add('active');

            // Animate the transition
            const activeCategory = document.getElementById(targetCategory);
            activeCategory.style.opacity = '0';
            activeCategory.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                activeCategory.style.opacity = '1';
                activeCategory.style.transform = 'translateY(0)';
            }, 100);
        });
    });
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            message: formData.get('message')
        };

        // Validate form
        if (!validateForm(data)) {
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual form submission logic)
        setTimeout(() => {
            showSuccessMessage();
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Form Validation
function validateForm(data) {
    const errors = [];

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address');
    }

    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message with at least 10 characters');
    }

    // Display errors
    if (errors.length > 0) {
        showErrorMessage(errors.join('<br>'));
        return false;
    }

    return true;
}

// Success Message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'alert alert-success';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <strong>Success!</strong> Your message has been sent successfully. We'll get back to you soon!
    `;
    
    insertAlert(message);
}

// Error Message
function showErrorMessage(errors) {
    const message = document.createElement('div');
    message.className = 'alert alert-error';
    message.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <strong>Error!</strong><br>${errors}
    `;
    
    insertAlert(message);
}

// Insert Alert Message
function insertAlert(alertElement) {
    // Add alert styles if not already added
    if (!document.querySelector('.alert-styles')) {
        const styles = document.createElement('style');
        styles.className = 'alert-styles';
        styles.textContent = `
            .alert {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            }
            .alert-success {
                background: linear-gradient(135deg, #4caf50, #45a049);
            }
            .alert-error {
                background: linear-gradient(135deg, #f44336, #da190b);
            }
            .alert i {
                margin-right: 0.5rem;
            }
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
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
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // Insert the alert
    document.body.appendChild(alertElement);

    // Remove after 5 seconds
    setTimeout(() => {
        alertElement.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (alertElement.parentNode) {
                alertElement.parentNode.removeChild(alertElement);
            }
        }, 300);
    }, 5000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .product-card, .contact-card, .about-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Counter Animation for Hero Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    const options = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
                const increment = target / 200;
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : counter.textContent.includes('%') ? '%' : '');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + (counter.textContent.includes('+') ? '+' : counter.textContent.includes('%') ? '%' : '');
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, options);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Initialize counter animation when DOM is loaded
document.addEventListener('DOMContentLoaded', animateCounters);

// Search Functionality (for future enhancement)
function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search products...';
    searchInput.className = 'search-input';
    
    // Add search functionality here if needed
}

// Lazy Loading for Images (for future enhancement)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
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

// Product Filter Functionality (for future enhancement)
function initProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            products.forEach(product => {
                if (filter === 'all' || product.classList.contains(filter)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    
    // Add styles
    const styles = document.createElement('style');
    styles.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            font-size: 1.2rem;
        }
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        .back-to-top:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
    `;
    document.head.appendChild(styles);
    document.body.appendChild(backToTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', initBackToTop);

// Performance optimization: Debounce scroll events
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

// FAQ Accordion Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based functionality here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
