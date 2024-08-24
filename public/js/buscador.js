/**
 * Espera a que el DOM esté completamente cargado antes de ejecutar cualquier lógica.
 * Configura el comportamiento del enlace de navegación para desplazar suavemente a la sección de búsqueda y enfocar el campo de entrada de búsqueda.
 * 
 * @function
 */

document.addEventListener('DOMContentLoaded', function() {
    const browseLink = document.querySelector('a[href="#search-section"]');
    const searchSection = document.getElementById('search-section');

    /**
     * Maneja el evento de clic en el enlace de navegación.
     * Evita el comportamiento por defecto del enlace, desplaza suavemente a la sección de búsqueda y enfoca el campo de entrada de búsqueda si está presente.
     * 
     * @event click
     * @param {MouseEvent} e - El evento de clic en el enlace de navegación.
     */
    
    browseLink.style.color = 'red'; 

    browseLink.addEventListener('click', function(e) {
        e.preventDefault();
        searchSection.scrollIntoView({ behavior: 'smooth' });

        const searchInput = searchSection.querySelector('.search_input');
        if (searchInput) {
            searchInput.focus();
        }
    });
});
