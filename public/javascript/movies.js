document.addEventListener('DOMContentLoaded', function() {
    fetchMovies();
});

async function fetchMovies() {
    try {
        const response = await fetch('http://localhost:5001/pelicula/por-estado?estado=En%20cartelera');
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
    const slider = document.getElementById('movieSlider');
    const dotsContainer = document.getElementById('sliderDots');
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    movies.forEach((movie, index) => {
        const movieSlide = document.createElement('div');
        movieSlide.className = 'movie-slide';
        
        movieSlide.innerHTML = `
            <img src="${movie.imagen_pelicula}" alt="${movie.titulo}" onerror="this.src='path_to_default_image.jpg'">
            <h3>${movie.titulo.length > 20 ? movie.titulo.substring(0, 20) + '...' : movie.titulo}</h3>
            <p>${movie.genero}</p>
        `;
        
        slider.appendChild(movieSlide);

        // Añadir punto al slider
        const dot = document.createElement('span');
        dot.className = 'slider-dot';
        dot.onclick = () => scrollToSlide(index);
        dotsContainer.appendChild(dot);
    });

    updateActiveDot(0);
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

// Añadir evento de scroll al slider
document.getElementById('movieSlider').addEventListener('scroll', function() {
    const index = Math.round(this.scrollLeft / this.offsetWidth);
    updateActiveDot(index);
});