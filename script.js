document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.scroll-section');
    const navItems = document.querySelectorAll('.nav-item');
    const ibmCard = document.getElementById('ibmCard');

    // 1. Highlight navigation link matching scroll viewport position
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

    // 2. Control the 3D flipping animation trigger logic for the IBM card container
    if (ibmCard) {
        ibmCard.addEventListener('click', (e) => {
            // Keep link interactions native on the back side of the card layout
            if (e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'iframe') return;
            
            ibmCard.classList.toggle('is-flipped');
        });
    }
});
