// Registrar plugins GSAP
gsap.registerPlugin(ScrollTrigger);

// Variáveis globais
let isLoading = true;
let tl = gsap.timeline();

// Inicialização quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Função principal de inicialização
function initializeApp() {
    setupLoadingScreen();
    setupNavigation();
    setupHeroAnimations();
    setupScrollAnimations();
    setupInteractiveElements();
    setupCounters();
    setupProgressBars();
    setupParallaxEffects();
    setupFormHandling();
    setupCursorEffects();
}

// Loading Screen
function setupLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loaderCircle = document.querySelector('.loader-circle');
    const loaderText = document.querySelector('.loader-text');
    
    // Animação do loading
    gsap.set([loaderCircle, loaderText], { opacity: 0, scale: 0.8 });
    
    gsap.to([loaderCircle, loaderText], {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.2
    });
    
    // Simular carregamento
    setTimeout(() => {
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
                loadingScreen.style.display = 'none';
                isLoading = false;
                startMainAnimations();
            }
        });
    }, 2500);
}

// Animações principais após loading
function startMainAnimations() {
    // Animação da navbar
    gsap.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
    
    // Animação do hero
    const heroTl = gsap.timeline();
    
    heroTl
        .from('.hero-title .title-line', {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.2
        })
        .from('.hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.5")
        .from('.hero-buttons .btn', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.2
        }, "-=0.3")
        .from('.floating-card', {
            scale: 0,
            rotation: 180,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
            stagger: 0.1
        }, "-=0.8")
        .from('.scroll-indicator', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.3");
}

// Navegação
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu mobile
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animação das barras do hamburger
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            gsap.to(bars[0], { rotation: 45, y: 6, duration: 0.3 });
            gsap.to(bars[1], { opacity: 0, duration: 0.3 });
            gsap.to(bars[2], { rotation: -45, y: -6, duration: 0.3 });
        } else {
            gsap.to(bars[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(bars[1], { opacity: 1, duration: 0.3 });
            gsap.to(bars[2], { rotation: 0, y: 0, duration: 0.3 });
        }
    });
    
    // Fechar menu ao clicar em link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
    
    // Scroll spy para navegação
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            }
        });
        
        // Navbar background on scroll
        const navbar = document.querySelector('.navbar');
        if (scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
}

// Animações do Hero
function setupHeroAnimations() {
    // Animação contínua dos elementos flutuantes
    gsap.to('.floating-card', {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-15, 15)",
        duration: "random(3, 6)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
            each: 0.5,
            repeat: -1
        }
    });
    
    // Efeito de hover nos botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Animações de scroll
function setupScrollAnimations() {
    // Fade in elements
    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.fromTo(element, 
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Slide in from left
    gsap.utils.toArray('.slide-in-left').forEach(element => {
        gsap.fromTo(element,
            {
                opacity: 0,
                x: -100
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Slide in from right
    gsap.utils.toArray('.slide-in-right').forEach(element => {
        gsap.fromTo(element,
            {
                opacity: 0,
                x: 100
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Animação das seções
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        gsap.fromTo(section,
            {
                opacity: 0.8,
                scale: 0.95
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    end: "bottom 30%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
}

// Elementos interativos
function setupInteractiveElements() {
    // Hover effect nos cards de projeto
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Hover effect nos skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });
            
            const icon = card.querySelector('.skill-icon');
            gsap.to(icon, {
                scale: 1.2,
                rotation: 10,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
            
            const icon = card.querySelector('.skill-icon');
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Smooth scroll para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                gsap.to(window, {
                    duration: 0.5,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 70
                    },
                    ease: "power3.inOut"
                });
            }
        });
    });
}

// Contadores animados
function setupCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            onEnter: () => {
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    ease: "power2.out",
                    snap: { innerHTML: 1 },
                    onUpdate: function() {
                        counter.innerHTML = Math.ceil(counter.innerHTML);
                    }
                });
            }
        });
    });
}

// Barras de progresso
function setupProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        
        ScrollTrigger.create({
            trigger: bar,
            start: "top 80%",
            onEnter: () => {
                gsap.to(bar, {
                    width: `${progress}%`,
                    duration: 2,
                    ease: "power3.out",
                    delay: 0.2
                });
            }
        });
    });
}

// Efeitos de parallax
function setupParallaxEffects() {
    // Parallax para elementos flutuantes
    gsap.utils.toArray('.floating-card').forEach(card => {
        gsap.to(card, {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
    
    // Parallax para backgrounds
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        gsap.to(heroSection, {
            backgroundPosition: "50% 100%",
            ease: "none",
            scrollTrigger: {
                trigger: heroSection,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }
}

// Manipulação de formulários
function setupFormHandling() {
    const form = document.querySelector('.contact-form');
    const inputs = form?.querySelectorAll('input, textarea');
    
    // Animação de foco nos inputs
    inputs?.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Submissão do formulário
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Animação de loading no botão
        gsap.to(submitBtn, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simular envio
        setTimeout(() => {
            submitBtn.textContent = 'Enviado!';
            submitBtn.style.background = '#28a745';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// Efeitos de cursor customizado
function setupCursorEffects() {
    // Criar cursor customizado
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Estilos do cursor
    gsap.set(cursor, {
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: 'rgba(102, 126, 234, 0.8)',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference'
    });
    
    // Movimento do cursor
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.1,
            ease: "power2.out"
        });
    });
    
    // Efeitos de hover
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 2,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Utilitários
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

// Otimização de performance
function optimizePerformance() {
    // Lazy loading para imagens
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
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
    
    // Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        // Atualizações baseadas em scroll
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Inicializar otimizações
optimizePerformance();

// Easter eggs e interações especiais
function setupEasterEggs() {
    // Konami code
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                triggerEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function triggerEasterEgg() {
        // Animação especial
        gsap.to('.floating-card', {
            rotation: 720,
            scale: 1.5,
            duration: 2,
            ease: "power2.inOut",
            stagger: 0.1,
            yoyo: true,
            repeat: 1
        });
        
        // Confetti effect
        for (let i = 0; i < 50; i++) {
            createConfetti();
        }
    }
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: hsl(${Math.random() * 360}, 70%, 60%);
            top: -10px;
            left: ${Math.random() * 100}%;
            pointer-events: none;
            z-index: 10000;
        `;
        
        document.body.appendChild(confetti);
        
        gsap.to(confetti, {
            y: window.innerHeight + 100,
            rotation: Math.random() * 720,
            duration: Math.random() * 3 + 2,
            ease: "power2.in",
            onComplete: () => {
                confetti.remove();
            }
        });
    }
}

// Inicializar easter eggs
setupEasterEggs();

// Exportar funções para uso global se necessário
window.portfolioAnimations = {
    setupLoadingScreen,
    setupNavigation,
    setupHeroAnimations,
    setupScrollAnimations,
    setupInteractiveElements
};

