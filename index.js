// Navigation functionality
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navLinksItems = document.querySelectorAll('.nav-link');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active navigation link highlighting
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            const navbarHeight = document.querySelector('.navbar').offsetHeight;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - navbarHeight - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinksItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Project filtering functionality
        function filterProjects(category) {
            const filterButtons = document.querySelectorAll('.filter-btn');
            const projectCards = document.querySelectorAll('.project-card');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Service detail modals
        function openServiceDetail(service) {
            const modal = document.getElementById(service + 'ServiceModal');
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        }

        function closeServiceDetail() {
            const modals = document.querySelectorAll('.service-detail');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside
        document.querySelectorAll('.service-detail').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeServiceDetail();
                }
            });
        });

        // Contact form functionality
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Simple form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission (since this is frontend only)
            alert(`Thank you ${name}! Your message has been received. We'll get back to you within 24 hours at ${email}.`);
            this.reset();
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.team-member, .tech-item, .project-card, .review-card, .feedback-card, .timeline-item');
            
            animatedElements.forEach(el => {
                el.classList.add('hidden');
                observer.observe(el);
            });
        });

        // Add some interactive animations
        document.querySelectorAll('.team-member').forEach(member => {
            member.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            member.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-10px) scale(1)';
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 10px 30px rgba(42, 76, 122, 0.2)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 10px 30px rgba(42, 76, 122, 0.15)';
            }
        });

        // Add loading animation for the page
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });

        // Add dynamic color scheme based on time
        function updateColorScheme() {
            const hour = new Date().getHours();
            const root = document.documentElement;
            
            if (hour >= 18 || hour <= 6) {
                // Evening/Night mode - darker blues
                root.style.setProperty('--primary-color', '#1a3558');
                root.style.setProperty('--secondary-color', '#4a7bb7');
                root.style.setProperty('--accent-color', '#2980d4');
            } else if (hour >= 6 && hour <= 12) {
                // Morning mode - lighter, more energetic
                root.style.setProperty('--primary-color', '#2a4c7a');
                root.style.setProperty('--secondary-color', '#6b8ec7');
                root.style.setProperty('--accent-color', '#4a90e2');
            } else {
                // Afternoon mode - warmer tones
                root.style.setProperty('--primary-color', '#2c5282');
                root.style.setProperty('--secondary-color', '#6b8ec7');
                root.style.setProperty('--accent-color', '#3182ce');
            }
        }

        // Update color scheme on load and every hour
        updateColorScheme();
        setInterval(updateColorScheme, 3600000); // Update every hour

        // Add particle animation background for hero section
        function createParticles() {
            const homeSection = document.getElementById('home');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = Math.random() * 4 + 2 + 'px';
                particle.style.height = particle.style.width;
                particle.style.background = 'rgba(74, 144, 226, 0.3)';
                particle.style.borderRadius = '50%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite`;
                particle.style.animationDelay = Math.random() * 2 + 's';
                particle.style.zIndex = '1';
                
                homeSection.appendChild(particle);
            }
        }

        // Create particles when page loads
        document.addEventListener('DOMContentLoaded', createParticles);

        // Add typing effect for the motto
        function typeWriter(element, text, speed = 50) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Start typing animation when page loads
        document.addEventListener('DOMContentLoaded', () => {
            const motto = document.querySelector('.motto');
            const originalText = motto.textContent;
            setTimeout(() => {
                typeWriter(motto, originalText, 75);
            }, 1000);
        });

        // Add click tracking for analytics (placeholder)
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn, .nav-link, .filter-btn')) {
                // In a real implementation, you would send this data to your analytics service
                console.log('User interaction:', {
                    element: e.target.className,
                    text: e.target.textContent,
                    timestamp: new Date().toISOString()
                });
            }
        });

        // Add performance optimization for images
        document.addEventListener('DOMContentLoaded', () => {
            // Lazy loading simulation for banner images
            const bannerImages = document.querySelectorAll('.banner-img');
            bannerImages.forEach((img, index) => {
                setTimeout(() => {
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => {
                        img.style.opacity = '1';
                    }, 100);
                }, index * 200);
            });
        });

        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeServiceDetail();
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Add scroll-to-top functionality
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        // Show scroll-to-top button after scrolling
        let scrollButton;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                if (!scrollButton) {
                    scrollButton = document.createElement('button');
                    scrollButton.innerHTML = '↑';
                    scrollButton.style.cssText = `
                        position: fixed;
                        bottom: 30px;
                        right: 30px;
                        background: var(--gradient-primary);
                        color: white;
                        border: none;
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        font-size: 20px;
                        cursor: pointer;
                        z-index: 1000;
                        transition: all 0.3s ease;
                        box-shadow: 0 5px 15px rgba(42, 76, 122, 0.3);
                    `;
                    scrollButton.addEventListener('click', scrollToTop);
                    scrollButton.addEventListener('mouseenter', () => {
                        scrollButton.style.transform = 'scale(1.1)';
                    });
                    scrollButton.addEventListener('mouseleave', () => {
                        scrollButton.style.transform = 'scale(1)';
                    });
                    document.body.appendChild(scrollButton);
                }
                scrollButton.style.opacity = '1';
            } else if (scrollButton) {
                scrollButton.style.opacity = '0';
            }
        });

        