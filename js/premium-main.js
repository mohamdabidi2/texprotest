// Main JavaScript file for Texpro Corp Premium Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out',
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

    // Elegant hover effect for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.03,
                duration: 0.3,
                ease: 'power1.out'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power1.out'
            });
        });
    });

    // Form validation
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formInputs = this.querySelectorAll('.form-control');
            
            formInputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#b00020';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Show success message
                const submitBtn = this.querySelector('.btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // Reset form
                    this.reset();
                    
                    // Create success message
                    const successMessage = document.createElement('div');
                    successMessage.style.padding = '15px';
                    successMessage.style.marginTop = '20px';
                    successMessage.style.backgroundColor = 'rgba(201, 166, 107, 0.2)';
                    successMessage.style.color = '#a88445';
                    successMessage.style.textAlign = 'center';
                    successMessage.style.fontWeight = '500';
                    successMessage.textContent = 'Your message has been sent successfully!';
                    
                    this.appendChild(successMessage);
                    
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
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
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(26, 38, 57, 0.95)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '2000';
            modal.style.opacity = '0';
            modal.style.transition = 'opacity 0.3s ease';
            
            // Create modal content
            modal.innerHTML = `
                <div style="position: relative; max-width: 80%; max-height: 80%;">
                    <span style="position: absolute; top: -40px; right: 0; color: white; font-size: 30px; cursor: pointer;">&times;</span>
                    <img src="${imgSrc}" alt="${imgAlt}" style="max-width: 100%; max-height: 80vh; display: block; margin: 0 auto;">
                    <div style="color: white; text-align: center; margin-top: 20px; font-family: 'Playfair Display', serif;"></div>
                </div>
            `;
            
            // Add modal to body
            body.appendChild(modal);
            body.style.overflow = 'hidden';
            
            // Show modal with animation
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
            
            // Close modal on click
            modal.addEventListener('click', function(e) {
                if (e.target === modal || e.target.textContent === '×') {
                    modal.style.opacity = '0';
                    
                    setTimeout(() => {
                        body.removeChild(modal);
                        body.style.overflow = '';
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
            const translateY = scrollPosition * 0.2;
            
            heroSection.style.backgroundPositionY = `-${translateY}px`;
        });
    }
    
    // Gallery filter functionality (for showroom page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        const galleryItems = document.querySelectorAll('.gallery-item[data-category]');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        gsap.to(item, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.4,
                            display: 'block'
                        });
                    } else {
                        gsap.to(item, {
                            opacity: 0,
                            scale: 0.9,
                            duration: 0.4,
                            display: 'none'
                        });
                    }
                });
            });
        });
    }
      


    
    // GSAP animations for premium feel
    gsap.from('.hero-content', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    // Animate section titles when they come into view
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
});
