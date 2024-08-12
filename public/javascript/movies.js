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
        
        movieSlide.innerHTML = `
            <img src="${movie.imagen_pelicula}" alt="${movie.titulo}" loading="lazy" onerror="this.src='path_to_default_image.jpg'">
            <h3>${movie.titulo.length > 20 ? movie.titulo.substring(0, 20) + '...' : movie.titulo}</h3>
            <p>${movie.genero}</p>
        `;
        
        slider.appendChild(movieSlide);

        const dot = document.createElement('span');
        dot.className = 'slider-dot';
        dot.onclick = () => scrollToSlide(index);
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

// Evento para el slider de películas en cartelera
if (document.getElementById('movieSlider')) {
    document.getElementById('movieSlider').addEventListener('scroll', function() {
        const index = Math.round(this.scrollLeft / this.offsetWidth);
        updateActiveDot(index);
    });
}