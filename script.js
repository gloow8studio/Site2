document.addEventListener('DOMContentLoaded', () => {
    /* 1. Mobile Menu Toggle */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', () => {
            nav.classList.toggle('open');
            mobileBtn.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    mobileBtn.classList.remove('active');
                }
            });
        });
    }

    /* 2. Fade-In Effects via Intersection Observer */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optimização: desobservar após aparecer, a menos que queira repetição
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeSections = document.querySelectorAll('.fade-in');
    fadeSections.forEach(section => {
        sectionObserver.observe(section);
    });

    /* 3. Parallax Effect & Header Auto-hide */
    const parallaxBg = document.querySelector('.parallax-bg');
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        // Uso de requestAnimationFrame para performance otimizada
        requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;

            // Parallax
            if (parallaxBg) {
                const speed = parseFloat(parallaxBg.getAttribute('data-speed')) || 0.4;
                parallaxBg.style.transform = `translateY(${currentScrollY * speed}px)`;
            }
            
            // Header Visibility (Hide on scroll down, Show on scroll up)
            if (header) {
                if (currentScrollY > 100 && currentScrollY > lastScrollY) {
                    header.classList.add('hidden');
                } else {
                    header.classList.remove('hidden');
                }
            }
            lastScrollY = currentScrollY;
            
            // Update Active Nav Link
            updateActiveNavLink(currentScrollY);
        });
    }, { passive: true });

    /* 4. Active Navigation Link Sync */
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNavLink(scrollY) {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Tolerância de 1/3 da altura da tela para ativação da section
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // Inicialização do estado ativo
    updateActiveNavLink(window.scrollY);
});
