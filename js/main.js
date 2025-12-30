// Main JavaScript file for Texpro Corp Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navList.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navList.classList.contains('active')) {
            navList.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Material Design ripple effect for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formInputs = this.querySelectorAll('.form-control');
            
            formInputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('invalid');
                } else {
                    input.classList.remove('invalid');
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('form-success');
                successMessage.textContent = 'Your message has been sent successfully!';
                
                this.appendChild(successMessage);
                this.reset();
                
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }

    // Gallery image modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    const body = document.body;
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const imgAlt = this.querySelector('img').getAttribute('alt');
            
            // Create modal
            const modal = document.createElement('div');
            modal.classList.add('gallery-modal');
            
            // Create modal content
            modal.innerHTML = `
                <div class="gallery-modal-content">
                    <span class="gallery-modal-close">&times;</span>
                    <img src="${imgSrc}" alt="${imgAlt}">
                    <p>${imgAlt}</p>
                </div>
            `;
            
            // Add modal to body
            body.appendChild(modal);
            body.classList.add('modal-open');
            
            // Show modal with animation
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Close modal on click
            modal.addEventListener('click', function(e) {
                if (e.target === modal || e.target.classList.contains('gallery-modal-close')) {
                    modal.classList.remove('active');
                    
                    setTimeout(() => {
                        body.removeChild(modal);
                        body.classList.remove('modal-open');
                    }, 300);
                }
            });
        });
    });

    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if ('IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        fadeElements.forEach(element => {
            element.classList.add('visible');
        });
    }

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const translateY = scrollPosition * 0.3;
            
            heroSection.style.backgroundPositionY = `-${translateY}px`;
        });
    }

    // Language switcher is now handled by translations.js
});
