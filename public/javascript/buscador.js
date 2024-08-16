document.addEventListener('DOMContentLoaded', function() {
    const browseLink = document.querySelector('a[href="#search-section"]');
    const searchSection = document.getElementById('search-section');

    // Cambiar el color del enlace
    browseLink.style.color = 'red'; // Asegúrate de que esto esté funcionando

    browseLink.addEventListener('click', function(e) {
        e.preventDefault();
        searchSection.scrollIntoView({ behavior: 'smooth' });

        const searchInput = searchSection.querySelector('.search_input');
        if (searchInput) {
            searchInput.focus();
        }
    });
});
