document.addEventListener('DOMContentLoaded', function() {
    fetchMovies();
});

async function fetchMovies() {
    try {
        const response = await fetch('http://localhost:5001/pelicula/por-estado?estado=Próximo%20estreno');
        const data = await response.json();
        
        if (Array.isArray(data)) {
            displayMovies(data);
        } else {
            console.error('No se encontraron películas o el formato de respuesta es incorrecto');
        }
    } catch (error) {
        console.error('Error al obtener las películas:', error);
    }
}

function displayMovies(movies) {
    const movieList = document.getElementById('coming-soon-movies');
    movieList.innerHTML = '';
    
    movies.forEach((movie) => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie-item';
        
        movieElement.innerHTML = `
            <img src="${movie.imagen_pelicula}" alt="${movie.titulo}" loading="lazy" onerror="this.src='path_to_default_image.jpg'">
            <div class="movie-info">
                <h3>${movie.titulo}</h3>
                <p>${new Date(movie.fecha_estreno).getFullYear()}</p>
                <p>${movie.genero}</p>
            </div>
        `;
        
        movieList.appendChild(movieElement);
    });
}