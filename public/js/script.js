document.addEventListener('DOMContentLoaded', () => {
    // ===== MOBILE MENU TOGGLE =====
    const toggles = document.querySelectorAll('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            toggle.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : 'auto';
        });
    });

    // Close mobile menu when clicking on a link
    if (navList) {
        const navLinks = navList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                toggles.forEach(t => t.classList.remove('active'));
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navList && navList.classList.contains('active')) {
            const isClickInsideNav = navList.contains(e.target);
            const isClickOnToggle = Array.from(toggles).some(toggle => toggle.contains(e.target));

            if (!isClickInsideNav && !isClickOnToggle) {
                navList.classList.remove('active');
                toggles.forEach(t => t.classList.remove('active'));
                document.body.style.overflow = 'auto';
            }
        }
    });

    // ===== STICKY HEADER EFFECT =====
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===== NUMBER COUNTER ANIMATION =====
    const animateNumbers = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        const isPercentage = element.textContent.includes('%');
        const hasPlus = element.textContent.includes('+');

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + (hasPlus ? '+' : '') + (isPercentage ? '%' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + (hasPlus ? '+' : '') + (isPercentage ? '%' : '');
            }
        }, 16);
    };

    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    const number = parseInt(text.replace(/[^0-9]/g, ''));

                    if (!isNaN(number)) {
                        entry.target.textContent = '0';
                        animateNumbers(entry.target, number);
                    }

                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => statsObserver.observe(stat));
    }

    // ===== BACK TO TOP BUTTON =====
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.className = 'back-to-top';
        button.setAttribute('aria-label', 'Back to top');
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--accent-gold);
            color: white;
            border: none;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        `;

        document.body.appendChild(button);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    };

    createBackToTopButton();

    console.log('✨ Enhanced interactivity loaded!');
});
