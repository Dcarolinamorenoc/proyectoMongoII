document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.swiper-wrapper');
    const cards = document.querySelectorAll('.swiper-slide');
    let isScrolling = false;
    let scrollTimeout;

    // Función para manejar el scroll
    function handleScroll(e) {
        e.preventDefault();
        
        if (!isScrolling) {
            isScrolling = true;
            
            clearTimeout(scrollTimeout);
            
            const direction = e.deltaY > 0 ? 1 : -1;
            const currentCard = [...cards].findIndex(card => {
                const rect = card.getBoundingClientRect();
                return rect.top >= 0 && rect.bottom <= window.innerHeight;
            });
            
            let targetCard = currentCard + direction;
            if (targetCard < 0) targetCard = 0;
            if (targetCard >= cards.length) targetCard = cards.length - 1;
            
            cards[targetCard].scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 500);
        }
    }

    // Añadir el evento de scroll al documento
    document.addEventListener('wheel', handleScroll, { passive: false });

    // Manejar eventos táctiles para dispositivos móviles
    let touchStartY;

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: false });

    document.addEventListener('touchmove', function(e) {
        if (!touchStartY) {
            return;
        }

        const touchEndY = e.touches[0].clientY;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) > 5) { // Umbral para detectar deslizamiento
            handleScroll({ preventDefault: () => {}, deltaY: diff });
        }

        touchStartY = null;
    }, { passive: false });
});