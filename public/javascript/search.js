document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search_input');

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                buscarPeliculas(query);
            }
        }
    });
});

async function buscarPeliculas(query) {
    try {
        const response = await fetch(`http://localhost:5001/api/peliculas/buscar?query=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            return;
        }

        // Limpia el contenido actual de las películas y muestra los resultados de la búsqueda
        const movieSlider = document.getElementById('movieSlider');
        const comingSoonMovies = document.getElementById('coming-soon-movies');
        const notAvaliableMovies = document.getElementById('not-avaliable-movies');
        
        movieSlider.innerHTML = '';
        comingSoonMovies.innerHTML = '';
        notAvaliableMovies.innerHTML = '';

        // Muestra las películas encontradas
        displayMovies(data);
    } catch (error) {
        console.error('Error al buscar películas:', error);
    }
}

function displayMovies(movies) {
    const movieSlider = document.getElementById('movieSlider');

    if (movies.length === 0) {
        movieSlider.innerHTML = '<p>No se encontraron películas que coincidan con la búsqueda.</p>';
        return;
    }

    movies.forEach((movie) => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie-slide';
        movieElement.onclick = () => displayMovieDetails(movie.id, movie.estado);

        movieElement.innerHTML = `
            <img src="${movie.imagen_pelicula}" alt="${movie.titulo}" loading="lazy" onerror="this.src='path_to_default_image.jpg'">
            <h3>${movie.titulo.length > 20 ? movie.titulo.substring(0, 20) + '...' : movie.titulo}</h3>
            <p>${movie.genero}</p>
        `;
        
        movieSlider.appendChild(movieElement);
    });
}
