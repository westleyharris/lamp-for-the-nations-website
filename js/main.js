/**
 * Lamp for the Nations - Main JavaScript
 * Scroll animations, counters, interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollEffects();
    initCounters();
    initMobileMenu();
    initHeaderScroll();
});

/**
 * Inverted Color Blast - hero dark section reacts to scroll
 */
function initScrollEffects() {
    const heroDark = document.getElementById('hero-dark');
    const storyCards = document.querySelectorAll('.story-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    if (heroDark) {
        const scrollHandler = () => {
            if (window.scrollY > 80) {
                heroDark.classList.add('scrolled');
            } else {
                heroDark.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', scrollHandler, { passive: true });
    }
    
    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, observerOptions);
    
    storyCards.forEach(card => storyObserver.observe(card));
}

/**
 * Impact Dashboard - animated counters
 */
function initCounters() {
    const counterCards = document.querySelectorAll('.counter-card[data-target]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterCards.forEach(card => counterObserver.observe(card));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target, 10);
    const valueEl = element.querySelector('.counter-value');
    const duration = 2000;
    const start = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        valueEl.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            valueEl.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('open');
            menuBtn.classList.toggle('active');
        });
    }
}

/**
 * Header - add scrolled class for background change
 */
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    
    if (header) {
        const scrollHandler = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        
        window.addEventListener('scroll', scrollHandler, { passive: true });
        scrollHandler();
    }
}
