document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. GLOBAL: DATE & TIME CLOCK
       ========================================= */
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        };
        const dateString = now.toLocaleDateString('en-US', options);

        // Update Top Bar Date (if exists)
        const headerDate = document.getElementById('currentDate');
        if (headerDate) headerDate.innerText = dateString;

        // Update Footer Date (if exists)
        const footerDate = document.getElementById('footerDate');
        if (footerDate) footerDate.innerText = dateString;
    }
    
    // Update immediately and then every second
    updateDateTime();
    setInterval(updateDateTime, 1000);


    /* =========================================
       2. NAVBAR: MOBILE MENU TOGGLE
       ========================================= */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navDropdowns = document.querySelectorAll('.nav-dropdown');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking any link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Mobile Dropdown Accordion Logic
    navDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        if (link) {
            link.addEventListener('click', (e) => {
                // Only activate on mobile screens
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    navDropdowns.forEach(other => {
                        if (other !== dropdown) other.classList.remove('active');
                    });
                }
            });
        }
    });


    /* =========================================
       3. NEWS SECTION: HORIZONTAL SLIDER
       ========================================= */
    const newsSlider = document.getElementById('newsSlider');
    const btnLeft = document.getElementById('scrollLeft');
    const btnRight = document.getElementById('scrollRight');

    if (newsSlider) {
        const scrollAmount = 280; // Card width (260px) + gap (20px)
        let autoScrollInterval;

        // Scroll Functions
        const scrollNext = () => {
            if (newsSlider.scrollLeft + newsSlider.clientWidth >= newsSlider.scrollWidth - 10) {
                newsSlider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                newsSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        };

        const scrollPrev = () => {
            newsSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        };

        // Event Listeners for Buttons
        if (btnRight) btnRight.addEventListener('click', scrollNext);
        if (btnLeft) btnLeft.addEventListener('click', scrollPrev);

        // Auto Scroll Logic
        const startAutoScroll = () => {
            autoScrollInterval = setInterval(scrollNext, 3500); // 3.5 seconds
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };

        // Start Loop
        startAutoScroll();

        // Pause on Hover
        newsSlider.addEventListener('mouseenter', stopAutoScroll);
        newsSlider.addEventListener('mouseleave', startAutoScroll);
    }


    /* =========================================
       4. ANIMATION: FADE IN ON SCROLL
       ========================================= */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // We will use CSS class for this
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // List of all elements to animate
    const animateSelectors = [
        '.news-card-mini',      // New News Cards
        '.resource-tile',       // New Resource Tiles
        '.academic-card-modern',// New Academic Cards
        '.stat-card',           // New Placement Cards
        '.achievement-row',     // New Achievement Rows
        '.news-ticker-wrapper'  // News Bar
    ];

    const elementsToAnimate = document.querySelectorAll(animateSelectors.join(', '));
    
    elementsToAnimate.forEach(el => {
        // Set initial state via JS to ensure they are hidden before scroll
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });


    /* =========================================
       5. UTILITY: SMOOTH SCROLL & NAVBAR SHADOW
       ========================================= */
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80; // Height of sticky navbar
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Navbar Shadow on Scroll
    const navbar = document.querySelector('.navbar, .main-header'); // Targets either navbar
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }
});