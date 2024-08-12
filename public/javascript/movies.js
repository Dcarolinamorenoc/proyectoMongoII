document.addEventListener('DOMContentLoaded', function() {
    fetchMoviesEnCartelera();
    fetchMoviesProximoEstreno();
    fetchMoviesNoDisponible();
});

async function fetchMoviesEnCartelera() {
    try {
        const response = await fetch('http://localhost:5001/pelicula/por-estado?estado=En%20cartelera');
        const data = await response.json();
        
        if (Array.isArray(data)) {
            displayMoviesEnCartelera(data);
        } else {
            console.error('No se encontraron películas en cartelera o el formato de respuesta es incorrecto');
        }
    } catch (error) {
        console.error('Error al obtener las películas en cartelera:', error);
    }
}

async function fetchMoviesProximoEstreno() {
    try {
        const response = await fetch('http://localhost:5001/pelicula/por-estado?estado=Próximo%20estreno');
        const data = await response.json();
        
        if (Array.isArray(data)) {
            displayMoviesProximoEstreno(data);
        } else {
            console.error('No se encontraron películas próximas a estrenar o el formato de respuesta es incorrecto');
        }
    } catch (error) {
        console.error('Error al obtener las películas próximas a estrenar:', error);
    }
}

async function fetchMoviesNoDisponible() {
    try {
        const response = await fetch('http://localhost:5001/pelicula/por-estado?estado=No%20disponible');
        const data = await response.json();
        
        if (Array.isArray(data)) {
            displayMoviesNoDisponible(data);
        } else {
            console.error('No se encontraron películas no disponibles o el formato de respuesta es incorrecto');
        }
    } catch (error) {
        console.error('Error al obtener las películas no disponibles:', error);
    }
}

function displayMoviesEnCartelera(movies) {
    const slider = document.getElementById('movieSlider');
    const dotsContainer = document.getElementById('sliderDots');
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    movies.forEach((movie, index) => {
        const movieSlide = document.createElement('div');
        movieSlide.className = 'movie-slide';
        movieSlide.onclick = () => displayMovieDetails(movie.id, 'En cartelera');
        
        movieSlide.innerHTML = `
            <img src="${movie.imagen_pelicula}" alt="${movie.titulo}" loading="lazy" onerror="this.src='path_to_default_image.jpg'">
            <h3>${movie.titulo.length > 20 ? movie.titulo.substring(0, 20) + '...' : movie.titulo}</h3>
            <p>${movie.genero}</p>
        `;
        
        slider.appendChild(movieSlide);

        const dot = document.createElement('span');
        dot.className = 'slider-dot';
        dot.onclick = (e) => {
            e.stopPropagation();
            scrollToSlide(index);
        };
        dotsContainer.appendChild(dot);
    });

    updateActiveDot(0);
}

function displayMoviesProximoEstreno(movies) {
    const movieList = document.getElementById('coming-soon-movies');
    movieList.innerHTML = '';
    
    movies.forEach((movie) => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie-item';
        movieElement.onclick = () => displayMovieDetails(movie.id, 'Próximo estreno');
        
        movieElement.innerHTML = `
        <img src="${movie.imagen_pelicula}" alt="${movie.titulo}" loading="lazy" onerror="this.src='path_to_default_image.jpg'">
        <div class="movie-info">
            <h3>${movie.titulo}</h3>
            <p>Estreno: ${movie.fecha_estreno}</p>
            <p>${movie.genero}</p>
        </div>
    `;
        
        movieList.appendChild(movieElement);
    });
}

function displayMoviesNoDisponible(movies) {
    const movieList = document.getElementById('not-avaliable-movies');
    movieList.innerHTML = '';
    
    movies.forEach((movie) => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie-item';
        movieElement.onclick = () => displayMovieDetails(movie.id, 'No disponible');
        
        movieElement.innerHTML = `
            <img src="${movie.imagen_pelicula}" alt="${movie.titulo}" loading="lazy" onerror="this.src='path_to_default_image.jpg'">
            <div class="movie-info">
                <h3>${movie.titulo}</h3>
                <p>${movie.genero}</p>
            </div>
        `;
        
        movieList.appendChild(movieElement);
    });
}

async function displayMovieDetails(movieId, movieState) {
    try {
        const response = await fetch(`http://localhost:5001/pelicula/detalles?id_titulo=${movieId}`);
        const movie = await response.json();
        
        if (movie.error) {
            console.error(movie.error);
            return;
        }

        document.body.innerHTML = `
            <div class="movie-details-container">
                <div class="movie-header">
                    <img src="../storage/img/back_arrow.png" alt="Back" class="back-button" onclick="goToHome()">
                    <h1>Cinema Selection</h1>
                    <img src="../storage/img/more_options.png" alt="More options" class="more-options">
                </div>
                <div class="movie-content">
                    <div class="movie-poster">
                        <img src="${movie.imagen_pelicula}" alt="${movie.titulo}">
                    </div>
                    <div class="movie-info">
                        <h2>${movie.titulo}</h2>
                        <p class="genre">${movie.genero}</p>
                        <button class="watch-trailer" onclick="window.open('${movie.trailer}', '_blank')">Watch Trailer</button>
                        <p class="description">${movie.sinopsis}</p>
                    </div>
                    <div class="cast">
                        <h3>Cast</h3>
                        <div class="cast-list">
                            ${movie.reparto.map(actor => `
                                <div class="actor">
                                    <img src="${actor.imagen_actor}" alt="${actor.nombre_real}">
                                    <p>${actor.nombre_real}</p>
                                    <p>${actor.nombre_personaje}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ${movieState !== 'No disponible' ? `
                        <div class="cinema">
                            <h3>Cinema</h3>
                            <div class="cinema-item">
                                <img src="../storage/img/cinema_logo.png" alt="Cinema logo">
                                <div>
                                    <p>Atrium Cinemas</p>
                                    <p>Staff Lines, Saddar, Karachi</p>
                                </div>
                            </div>
                        </div>
                        <button id="book-now" onclick="bookMovie()">Book Now</button>
                    ` : ''}
                </div>
            </div>
        `;

        // Añadir estilos inline para lograr el diseño deseado
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #000;
                color: #fff;
            }
            .movie-details-container {
                padding: 20px;
                max-width: 600px;
                margin: 0 auto;
            }
            .movie-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            .back-button, .more-options {
                width: 24px;
                height: 24px;
                cursor: pointer;
            }
            .movie-content {
                text-align: center;
            }
            .movie-poster img {
                width: 100%;
                max-width: 300px;
                height: auto;
                border-radius: 10px;
            }
            .movie-info {
                margin-top: 20px;
            }
            h2 {
                font-size: 24px;
                margin: 10px 0;
            }
            .genre {
                color: #888;
                margin-bottom: 10px;
            }
            .watch-trailer {
                background-color: #ff0000;
                color: #fff;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                font-size: 16px;
                margin: 10px 0;
            }
            .description {
                margin-top: 10px;
                font-size: 14px;
                color: #ccc;
                text-align: left;
            }
            .cast, .cinema {
                margin-top: 20px;
                text-align: left;
            }
            .cast h3, .cinema h3 {
                font-size: 18px;
                margin-bottom: 10px;
            }
            .cast-list {
                display: flex;
                overflow-x: auto;
                padding-bottom: 10px;
            }
            .actor {
                flex: 0 0 auto;
                text-align: center;
                margin-right: 15px;
            }
            .actor img {
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }
            .actor p {
                margin: 5px 0;
                font-size: 12px;
            }
            .cinema-item {
                display: flex;
                align-items: center;
                background-color: #222;
                padding: 10px;
                border-radius: 5px;
            }
            .cinema-item img {
                width: 40px;
                height: 40px;
                margin-right: 10px;
            }
            .cinema-item p {
                margin: 0;
                font-size: 14px;
            }
            #book-now {
                width: 100%;
                padding: 15px;
                background-color: #ff0000;
                color: #fff;
                border: none;
                border-radius: 5px;
                margin-top: 20px;
                cursor: pointer;
                font-weight: bold;
                font-size: 16px;
            }
        `;
        document.head.appendChild(styleElement);

    } catch (error) {
        console.error('Error al obtener los detalles de la película:', error);
    }
}

function goToHome() {
    location.reload();
}

function scrollToSlide(index) {
    const slider = document.getElementById('movieSlider');
    const slideWidth = slider.offsetWidth;
    slider.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
    });
}

function updateActiveDot(index) {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function bookMovie() {
    alert('Funcionalidad de reserva no implementada');
}

// Evento para el slider de películas en cartelera
if (document.getElementById('movieSlider')) {
    document.getElementById('movieSlider').addEventListener('scroll', function() {
        const index = Math.round(this.scrollLeft / this.offsetWidth);
        updateActiveDot(index);
    });
}