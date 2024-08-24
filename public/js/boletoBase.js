/**
 * Espera a que el DOM esté completamente cargado antes de ejecutar cualquier lógica.
 * Configura el desplazamiento suave entre tarjetas y maneja los eventos de desplazamiento tanto para dispositivos de escritorio como móviles.
 * 
 * @function
 */

document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.swiper-wrapper');
    const cards = document.querySelectorAll('.swiper-slide');
    let isScrolling = false;
    let scrollTimeout;

    /**
     * Maneja el evento de desplazamiento (scroll) para moverse suavemente entre las tarjetas.
     * 
     * @function handleScroll
     * @param {Event} e - El evento de desplazamiento.
     */


    function handleScroll(e) {
        e.preventDefault();
        
        if (!isScrolling) {
            isScrolling = true;
            
            clearTimeout(scrollTimeout);
            
            const direction = e.deltaY > 0 ? 1 : -1;

            /**
             * Encuentra el índice de la tarjeta actualmente visible en la pantalla.
             * 
             * @function findIndex
             * @param {HTMLElement} card - Cada tarjeta en la lista de tarjetas.
             * @returns {boolean} - Retorna `true` si la tarjeta está completamente visible en la ventana.
             */



            const currentCard = [...cards].findIndex(card => {
                const rect = card.getBoundingClientRect();
                return rect.top >= 0 && rect.bottom <= window.innerHeight;
            });
            
            let targetCard = currentCard + direction;
            if (targetCard < 0) targetCard = 0;
            if (targetCard >= cards.length) targetCard = cards.length - 1;

            /**
             * Desplaza la tarjeta objetivo al centro de la vista de forma suave.
             * 
             * @function scrollIntoView
             * @param {Object} options - Opciones para el comportamiento de desplazamiento.
             */
            
            cards[targetCard].scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 500);
        }
    }
    // Añadir el evento de scroll al documento
    /**
     * Asigna el evento de desplazamiento (scroll) al documento, utilizando la función `handleScroll` para manejar el evento.
     * 
     * @event wheel
     * @param {Object} options - Opciones de configuración del evento.
     */

    document.addEventListener('wheel', handleScroll, { passive: false });

    /**
     * Captura la posición Y del toque inicial en la pantalla al comenzar un gesto táctil.
     * 
     * @event touchstart
     * @param {TouchEvent} e - El evento táctil de inicio.
     */

    let touchStartY;


    /**
     * Maneja el evento de movimiento táctil (deslizamiento), calculando la diferencia de posición Y 
     * para determinar la dirección del desplazamiento y luego invoca `handleScroll` para realizar el desplazamiento.
     * 
     * @event touchmove
     * @param {TouchEvent} e - El evento táctil de movimiento.
     */

    
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