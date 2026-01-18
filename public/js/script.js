document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.menu-toggle');
    // We might have different IDs for different headers, but the class is valid.
    // However, I used id="mobile-menu" in trust header and "mobile-menu-school" in school header.
    // Let's select by class to be generic or handle both.

    // Select all toggles (there should only be one per page)
    const toggles = document.querySelectorAll('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    });

    // Sticky Header Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
