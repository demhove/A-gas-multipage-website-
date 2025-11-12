// ===== PAGE NAVIGATION SYSTEM =====
async function showPage(pageName) {
    try {
        // Fetch the page content
        const response = await fetch(`pages/${pageName}.html`);
        if (!response.ok) throw new Error('Page not found');
        
        const content = await response.text();
        
        // Update page content
        document.getElementById('page-content').innerHTML = content;
        
        // Update active nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        
        document.getElementById('navLinks').classList.remove('active');
        
        
        initializePageScripts(pageName);
        
    } catch (error) {
        console.error('Error loading page:', error);
        document.getElementById('page-content').innerHTML = '<div class="container"><h2>Page not found</h2></div>';
    }
}
  // Mobile Menu Toggle
        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
        }

        // Sticky Navigation on Scroll
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Contact Form Handling
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const serviceType = document.getElementById('serviceType').value;
            const address = document.getElementById('address').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (!firstName || !lastName || !email || !phone || !serviceType || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Phone validation (basic)
            const phoneRegex = /^[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
                alert('Please enter a valid phone number (at least 10 digits).');
                return;
            }

            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.add('show');

            // Log form data (in real application, this would be sent to server)
            console.log('Form Submitted:', {
                firstName,
                lastName,
                email,
                phone,
                serviceType,
                address,
                message,
                timestamp: new Date().toISOString()
            });

            // Reset form
            this.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);

            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        // Smooth Scroll for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        // Animate elements on scroll
        function animateOnScroll() {
            const elements = document.querySelectorAll('.service-card, .contact-card, .stat-item');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }

        // Initialize animations
        document.addEventListener('DOMContentLoaded', function() {
            const elements = document.querySelectorAll('.service-card, .contact-card, .stat-item');
            elements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
        });

        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Run on page load

        // Stats Counter Animation
        function animateCounter(element, target, duration = 2000) {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = formatStatNumber(target);
                    clearInterval(timer);
                } else {
                    element.textContent = formatStatNumber(Math.floor(current));
                }
            }, 16);
        }

        function formatStatNumber(num) {
            if (num >= 1000) {
                return (num / 1000).toFixed(0) + 'K+';
            }
            return num;
        }

        // Trigger counter animation when stats section is visible
        let statsAnimated = false;
        function checkStatsAnimation() {
            if (statsAnimated) return;
            
            const statsSection = document.querySelector('.stats');
            if (!statsSection) return;
            
            const rect = statsSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                statsAnimated = true;
                
                // Animate each stat
                const statNumbers = document.querySelectorAll('.stat-number');
                const values = [45, 250, 24, 99.9];
                
                statNumbers.forEach((stat, index) => {
                    if (index === 2) {
                        stat.textContent = '24/7';
                    } else if (index === 3) {
                        stat.textContent = '99.9%';
                    } else {
                        setTimeout(() => {
                            animateCounter(stat, values[index], 1500);
                        }, index * 200);
                    }
                });
            }
        }

        window.addEventListener('scroll', checkStatsAnimation);
        checkStatsAnimation(); // Check on page load

        // Form field real-time validation feedback
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');

        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.style.borderColor = '#e74c3c';
                } else if (this.value) {
                    this.style.borderColor = '#27ae60';
                }
            });

            emailInput.addEventListener('focus', function() {
                this.style.borderColor = '#ddd';
            });
        }

        if (phoneInput) {
            phoneInput.addEventListener('input', function() {
                // Auto-format phone number
                let cleaned = this.value.replace(/\D/g, '');
                if (cleaned.length >= 10) {
                    const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
                    this.value = formatted;
                }
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const navLinks = document.getElementById('navLinks');
            const menuToggle = document.querySelector('.menu-toggle');
            
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(event.target) && 
                !menuToggle.contains(event.target)) {
                navLinks.classList.remove('active');
            }
        });

        // Prevent default for emergency button (it's not a real link)
        document.querySelectorAll('.emergency-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Emergency Line: 1-800-GAS-LEAK (427-5325)\n\nIf you smell gas:\n1. Leave immediately\n2. Do not use any electrical devices\n3. Call from a safe location\n\nOur emergency crews are available 24/7/365');
            });
        });

        console.log('🔥 Apex Energy Solutions Website Loaded Successfully');

