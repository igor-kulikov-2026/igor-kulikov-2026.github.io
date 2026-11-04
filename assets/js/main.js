'use strict';
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
// Back to Top
document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.getElementById('backToTop');

    if (!backToTop) return;

    const toggleBackToTop = () => {
        const isVisible = window.scrollY > 300;

        backToTop.classList.toggle('visible', isVisible);
        backToTop.tabIndex = isVisible ? 0 : -1;
    };

    window.addEventListener('scroll', toggleBackToTop, {
        passive: true
    });

    backToTop.addEventListener('click', () => {
        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        window.scrollTo({
            top: 0,
            behavior: reduceMotion ? 'auto' : 'smooth'
        });
    });

    toggleBackToTop();
});
