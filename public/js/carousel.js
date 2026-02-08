let currentSlideIndex = 0;
let autoSlideInterval;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');

function showSlide(index) {
    // Handle wrap around
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    // Update slides
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlideIndex);
    });

    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlideIndex);
    });
}

function moveSlide(direction) {
    showSlide(currentSlideIndex + direction);
    resetAutoSlide();
}

function currentSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

function autoSlide() {
    moveSlide(1);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(autoSlide, 5000); // Change slide every 5 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

const heroSection = document.querySelector('.school-hero');

if (heroSection) {
    heroSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    heroSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left - next slide
        moveSlide(1);
    } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right - previous slide
        moveSlide(-1);
    }
}

// Start the carousel when page loads
if (slides.length > 0) {
    startAutoSlide();
}
