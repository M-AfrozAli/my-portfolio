document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.scroll-section');
    const navItems = document.querySelectorAll('.nav-item');
    const ibmCard = document.getElementById('ibmCard');
    const lancProjectCard = document.getElementById('lancProjectCard');
    const closeLancBtn = document.getElementById('closeLancBtn');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlideIndex = 0;

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 140)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });

    if (ibmCard) {
        ibmCard.addEventListener('click', (e) => {
            if (e.target.tagName.toLowerCase() === 'iframe') return;
            ibmCard.classList.toggle('is-flipped');
        });
    }

    if (lancProjectCard) {
        lancProjectCard.addEventListener('click', (e) => {
            if (!lancProjectCard.classList.contains('is-expanded')) {
                lancProjectCard.classList.add('is-expanded');
            }
        });
    }

    if (closeLancBtn) {
        closeLancBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            lancProjectCard.classList.remove('is-expanded');
        });
    }

    function updateCarouselState() {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active-dot'));

        slides[currentSlideIndex].classList.add('active');
        dots[currentSlideIndex].classList.add('active-dot');
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateCarouselState();
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            updateCarouselState();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                currentSlideIndex = index;
                updateCarouselState();
            });
        });
    }
});
