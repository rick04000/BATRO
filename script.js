// BATRO Website - main.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialiseer AOS animatie bibliotheek
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100,
    });
    
    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
        }, 500);
    });
    
    // Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobiel menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMobile.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Sluit mobiel menu bij klikken op link
    const mobileLinks = document.querySelectorAll('.nav-mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Diensten Slider
    const dienstenSlider = {
        container: document.querySelector('.diensten-slider-container'),
        items: document.querySelectorAll('.dienst-card'),
        prevBtn: document.querySelector('.diensten-slider .slider-prev'),
        nextBtn: document.querySelector('.diensten-slider .slider-next'),
        dots: document.querySelectorAll('.diensten-slider .slider-dot'),
        currentIndex: 0,
        itemsPerPage: 1,
        
        init() {
            if (!this.container) return;
            
            // Reset for mobile
            this.checkScreenSize();
            window.addEventListener('resize', () => this.checkScreenSize());
            
            // Event listeners
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prev());
            }
            
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.next());
            }
            
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goTo(index));
            });
            
            // Initial update
            this.update();
            
            // Swipe support for mobile
            this.addSwipeSupport();
        },
        
        checkScreenSize() {
            if (window.innerWidth >= 992) {
                this.itemsPerPage = 3;
            } else if (window.innerWidth >= 768) {
                this.itemsPerPage = 2;
            } else {
                this.itemsPerPage = 1;
            }
            
            this.update();
        },
        
        prev() {
            this.currentIndex = Math.max(0, this.currentIndex - 1);
            this.update();
        },
        
        next() {
            const maxIndex = Math.ceil(this.items.length / this.itemsPerPage) - 1;
            this.currentIndex = Math.min(maxIndex, this.currentIndex + 1);
            this.update();
        },
        
        goTo(index) {
            this.currentIndex = index;
            this.update();
        },
        
        update() {
            // Update slider position
            if (this.container) {
                const translateValue = -this.currentIndex * (100 / this.itemsPerPage);
                this.container.style.transform = `translateX(${translateValue}%)`;
            }
            
            // Update dots
            this.dots.forEach((dot, index) => {
                if (index === this.currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            // Disable/enable buttons
            if (this.prevBtn) {
                this.prevBtn.disabled = this.currentIndex === 0;
                this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
            }
            
            if (this.nextBtn) {
                const maxIndex = Math.ceil(this.items.length / this.itemsPerPage) - 1;
                this.nextBtn.disabled = this.currentIndex === maxIndex;
                this.nextBtn.style.opacity = this.currentIndex === maxIndex ? '0.5' : '1';
            }
        },
        
        addSwipeSupport() {
            if (!this.container) return;
            
            let startX;
            let endX;
            const threshold = 50; // Minimale swipe afstand
            
            this.container.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            this.container.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                
                if (Math.abs(diff) >= threshold) {
                    if (diff > 0) {
                        this.next();
                    } else {
                        this.prev();
                    }
                }
            });
        }
    };
    
    // Testimonial Slider
    const testimonialSlider = {
        container: document.querySelector('.testimonial-slider-container'),
        items: document.querySelectorAll('.testimonial-card'),
        prevBtn: document.querySelector('.testimonial-controls .slider-prev'),
        nextBtn: document.querySelector('.testimonial-controls .slider-next'),
        dots: document.querySelectorAll('.testimonial-controls .slider-dot'),
        currentIndex: 0,
        itemsPerPage: 1,
        
        init() {
            if (!this.container) return;
            
            // Reset for mobile
            this.checkScreenSize();
            window.addEventListener('resize', () => this.checkScreenSize());
            
            // Event listeners
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prev());
            }
            
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.next());
            }
            
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goTo(index));
            });
            
            // Initial update
            this.update();
            
            // Swipe support for mobile
            this.addSwipeSupport();
        },
        
        checkScreenSize() {
            if (window.innerWidth >= 992) {
                this.itemsPerPage = 3;
            } else if (window.innerWidth >= 768) {
                this.itemsPerPage = 2;
            } else {
                this.itemsPerPage = 1;
            }
            
            this.update();
        },
        
        prev() {
            this.currentIndex = Math.max(0, this.currentIndex - 1);
            this.update();
        },
        
        next() {
            const maxIndex = Math.ceil(this.items.length / this.itemsPerPage) - 1;
            this.currentIndex = Math.min(maxIndex, this.currentIndex + 1);
            this.update();
        },
        
        goTo(index) {
            this.currentIndex = index;
            this.update();
        },
        
        update() {
            // Update slider position
            if (this.container) {
                const translateValue = -this.currentIndex * (100 / this.itemsPerPage);
                this.container.style.transform = `translateX(${translateValue}%)`;
            }
            
            // Update dots
            this.dots.forEach((dot, index) => {
                if (index === this.currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            // Disable/enable buttons
            if (this.prevBtn) {
                this.prevBtn.disabled = this.currentIndex === 0;
                this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
            }
            
            if (this.nextBtn) {
                const maxIndex = Math.ceil(this.items.length / this.itemsPerPage) - 1;
                this.nextBtn.disabled = this.currentIndex === maxIndex;
                this.nextBtn.style.opacity = this.currentIndex === maxIndex ? '0.5' : '1';
            }
        },
        
        addSwipeSupport() {
            if (!this.container) return;
            
            let startX;
            let endX;
            const threshold = 50; // Minimale swipe afstand
            
            this.container.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            this.container.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                
                if (Math.abs(diff) >= threshold) {
                    if (diff > 0) {
                        this.next();
                    } else {
                        this.prev();
                    }
                }
            });
        }
    };
    
    // Counter animatie
    const counterAnimation = {
        counters: document.querySelectorAll('.counter'),
        
        init() {
            this.counters.forEach(counter => {
                counter.innerText = '0';
                this.updateCounter(counter);
            });
        },
        
        updateCounter(counter) {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => this.updateCounter(counter), 30);
            } else {
                counter.innerText = target;
            }
        }
    };
    
    // Service Sticky Button
    const serviceSticky = {
        button: document.querySelector('.service-button'),
        popup: document.querySelector('.service-popup'),
        closeBtn: document.querySelector('.popup-close'),
        
        init() {
            if (!this.button || !this.popup) return;
            
            this.button.addEventListener('click', () => {
                this.popup.classList.toggle('active');
            });
            
            if (this.closeBtn) {
                this.closeBtn.addEventListener('click', () => {
                    this.popup.classList.remove('active');
                });
            }
            
            // Close popup when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.popup.contains(e.target) && e.target !== this.button) {
                    this.popup.classList.remove('active');
                }
            });
        }
    };
    
    // Cookie Consent
    const cookieConsent = {
        banner: document.getElementById('cookieConsent'),
        acceptBtn: document.getElementById('cookieAccept'),
        rejectBtn: document.getElementById('cookieReject'),
        
        init() {
            if (!this.banner) return;
            
            // Toon cookie banner als nog niet geaccepteerd
            if (!localStorage.getItem('cookieConsent')) {
                setTimeout(() => {
                    this.banner.classList.add('active');
                }, 2000);
            }
            
            if (this.acceptBtn) {
                this.acceptBtn.addEventListener('click', () => {
                    localStorage.setItem('cookieConsent', 'true');
                    this.banner.classList.remove('active');
                });
            }
            
            if (this.rejectBtn) {
                this.rejectBtn.addEventListener('click', () => {
                    localStorage.setItem('cookieConsent', 'false');
                    this.banner.classList.remove('active');
                });
            }
        }
    };
    
    // Contact Form Validation
    const contactForm = {
        form: document.getElementById('contactForm'),
        
        init() {
            if (!this.form) return;
            
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateForm()) {
                    // In een productieomgeving zou hier de AJAX-aanroep naar de backend komen
                    alert('Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.');
                    this.form.reset();
                }
            });
        },
        
        validateForm() {
            let isValid = true;
            const name = this.form.querySelector('#name');
            const email = this.form.querySelector('#email');
            const subject = this.form.querySelector('#subject');
            const message = this.form.querySelector('#message');
            const privacy = this.form.querySelector('#privacy');
            
            // Reset error states
            const formControls = this.form.querySelectorAll('input, select, textarea');
            formControls.forEach(control => {
                control.classList.remove('error');
            });
            
            // Validate name
            if (!name.value.trim()) {
                name.classList.add('error');
                isValid = false;
            }
            
            // Validate email
            if (!email.value.trim() || !this.isValidEmail(email.value)) {
                email.classList.add('error');
                isValid = false;
            }
            
            // Validate subject
            if (!subject.value) {
                subject.classList.add('error');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                message.classList.add('error');
                isValid = false;
            }
            
            // Validate privacy checkbox
            if (!privacy.checked) {
                privacy.classList.add('error');
                isValid = false;
            }
            
            return isValid;
        },
        
        isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email.toLowerCase());
        }
    };
    
    // Initialiseer alle componenten
    dienstenSlider.init();
    testimonialSlider.init();
    counterAnimation.init();
    serviceSticky.init();
    cookieConsent.init();
    contactForm.init();
    
    // Scroll animatie voor de sectie getallen
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counterAnimation.init();
                observer.unobserve(entry.target);
            }
        });
    };
    
    const counterSection = document.querySelector('.stat-counter-container');
    if (counterSection) {
        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        observer.observe(counterSection);
    }
});