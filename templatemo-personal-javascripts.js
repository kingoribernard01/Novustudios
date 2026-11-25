/*

TemplateMo 593 personal shape

https://templatemo.com/tm-593-personal-shape

*/

// JavaScript Document

        // Mobile menu functionality
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close mobile menu when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Enhanced Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Staggered animation for portfolio items
        const portfolioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.portfolio-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.1 });

        // Observe all animation elements
        document.addEventListener('DOMContentLoaded', function() {
            // Typewriter effect
            const typewriter = document.querySelector('.typewriter');
            if (typewriter) {
                const text = typewriter.textContent;
                typewriter.textContent = '';
                
                // Add cursor initially
                const cursor = document.createElement('span');
                cursor.className = 'cursor';
                cursor.textContent = '|';
                typewriter.appendChild(cursor);
                
                // Type out the text
                let i = 0;
                const speed = 50; // milliseconds per character
                let typewriterActive = true;
                
                function typeWriter() {
                    // Check if elements still exist in the DOM
                    if (!document.body.contains(typewriter) || !document.body.contains(cursor)) {
                        typewriterActive = false;
                        return;
                    }
                    
                    if (i < text.length && typewriterActive) {
                        try {
                            const char = document.createTextNode(text.charAt(i));
                            typewriter.insertBefore(char, cursor);
                            i++;
                            setTimeout(typeWriter, speed);
                        } catch (e) {
                            console.warn('Typewriter animation stopped:', e);
                            typewriterActive = false;
                        }
                    } else if (i >= text.length && typewriterActive) {
                        // Typing complete
                        cursor.style.animation = 'none';
                        cursor.style.borderRight = 'none';
                    }
                }
                
                // Start typing after a short delay
                const typewriterTimeout = setTimeout(typeWriter, 1000);
                
                // Cleanup function to prevent memory leaks
                const cleanupTypewriter = () => {
                    clearTimeout(typewriterTimeout);
                    typewriterActive = false;
                };
                
                // Clean up if user navigates away
                window.addEventListener('beforeunload', cleanupTypewriter);
                document.addEventListener('visibilitychange', () => {
                    if (document.visibilityState === 'hidden') {
                        cleanupTypewriter();
                    }
                });
                
                // Remove the cursor after typing finishes
                setTimeout(() => {
                    cursor.style.opacity = '0';
                    setTimeout(() => cursor.remove(), 500);
                }, (text.length * speed) + 1000);
            }
            
            const navbar = document.getElementById('navbar');
            let lastScroll = 0;
            const navbarHeight = 80; // Height of the navbar in pixels

            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                // At the top of the page, ensure navbar is visible
                if (currentScroll <= 0) {
                    navbar.classList.remove('hide');
                    navbar.classList.remove('scrolled');
                    return;
                }
                
                // Scrolling down
                if (currentScroll > lastScroll && !navbar.classList.contains('hide')) {
                    navbar.classList.add('hide');
                } 
                // Scrolling up
                else if (currentScroll < lastScroll && navbar.classList.contains('hide')) {
                    navbar.classList.remove('hide');
                }
                
                // Add scrolled class when not at the top
                if (currentScroll > 10) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                lastScroll = currentScroll;
            });

            const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
            animatedElements.forEach(el => observer.observe(el));

            const portfolioSection = document.querySelector('.portfolio-grid');
            if (portfolioSection) {
                portfolioObserver.observe(portfolioSection);
            }
        });

        // Enhanced smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Enhanced parallax effect for hero background
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });

        // Add subtle hover effects to skill tags
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Keyboard navigation for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // WhatsApp lead capture
        document.addEventListener('DOMContentLoaded', () => {
            const waButton = document.querySelector('.whatsapp-float');
            const modal = document.getElementById('whatsappLeadModal');
            const form = document.getElementById('whatsappLeadForm');
            if (!waButton || !modal || !form) return;

            const waNumber = '254796580516';
            const errorEl = document.getElementById('whatsappLeadError');
            const submitBtn = form.querySelector('.whatsapp-lead-submit');

            const openModal = (e) => {
                e.preventDefault();
                modal.classList.add('is-open');
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                setTimeout(() => form.elements.lead_name?.focus(), 50);
            };

            const closeModal = () => {
                modal.classList.remove('is-open');
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = 'auto';
                errorEl.classList.remove('visible');
                errorEl.textContent = '';
            };

            const setError = (message) => {
                errorEl.textContent = message;
                errorEl.classList.add('visible');
            };

            waButton.addEventListener('click', openModal);
            modal.querySelectorAll('[data-close-whatsapp-modal]').forEach(el => {
                el.addEventListener('click', closeModal);
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('is-open')) {
                    closeModal();
                }
            });

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = new FormData(form);
                const name = (data.get('lead_name') || '').toString().trim();
                const email = (data.get('lead_email') || '').toString().trim();
                const phone = (data.get('lead_phone') || '').toString().trim();
                const service = (data.get('lead_service') || '').toString().trim();
                const message = (data.get('lead_message') || '').toString().trim();

                if (!name) {
                    setError('Please enter your name.');
                    return;
                }
                if (!email && !phone) {
                    setError('Please enter your email or phone number.');
                    return;
                }
                if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    setError('Please enter a valid email address.');
                    return;
                }

                errorEl.classList.remove('visible');
                errorEl.textContent = '';
                submitBtn.disabled = true;
                submitBtn.textContent = 'Opening WhatsApp...';

                const lines = [
                    'Hi Novus Studios, I would like to chat.',
                    '',
                    `Name: ${name}`
                ];
                if (email) lines.push(`Email: ${email}`);
                if (phone) lines.push(`Phone: ${phone}`);
                if (service) lines.push(`Interested in: ${service}`);
                if (message) lines.push('', `Project details: ${message}`);

                const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join('\n'))}`;

                try {
                    const leads = JSON.parse(localStorage.getItem('novus_whatsapp_leads') || '[]');
                    leads.push({
                        name,
                        email,
                        phone,
                        service,
                        message,
                        captured_at: new Date().toISOString()
                    });
                    localStorage.setItem('novus_whatsapp_leads', JSON.stringify(leads.slice(-100)));
                } catch (err) {}

                window.open(waUrl, '_blank', 'noopener,noreferrer');

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Continue to WhatsApp';
                    form.reset();
                    closeModal();
                }, 600);
            });
        });