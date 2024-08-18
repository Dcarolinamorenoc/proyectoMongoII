document.addEventListener('DOMContentLoaded', function() {
    fetchMoviesEnCartelera();
    fetchMoviesProximoEstreno();
    fetchMoviesNoDisponible();
});

async function fetchMoviesEnCartelera() {
    try {
        const response = await fetch('http://localhost:5001/api/peliculas/estado/En%20cartelera');
        const data = await response.json();
        
        if (Array.isArray(data)) {
            displayMoviesEnCartelera(data);
            setupCarousel();
        } else {
            console.error('No se encontraron películas en cartelera o el formato de respuesta es incorrecto');
        }
    } catch (error) {
        console.error('Error al obtener las películas en cartelera:', error);
    }
}

async function fetchMoviesProximoEstreno() {
    try {
        const response = await fetch('http://localhost:5001/api/peliculas/estado/Pr%C3%B3ximo%20estreno');
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
        const response = await fetch('http://localhost:5001/api/peliculas/estado/No%20disponible');
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
    const container = document.getElementById('now-playing-container');
    container.innerHTML = '';
    container.className = 'cards_container';
    
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'cards_eachOne';
        movieCard.onclick = () => displayMovieDetails(movie.id, 'En cartelera');
        
        movieCard.innerHTML = `
            <div class="cards_img">
                <img src="${movie.imagen_pelicula}" alt="${movie.titulo}" loading="lazy" onerror="this.src='path_to_default_image.jpg'">
            </div>
            <div class="cards_content">
                <h1>${movie.titulo}</h1>
                <p>${movie.genero}</p>
            </div>
        `;
        
        container.appendChild(movieCard);
    });
}

function setupCarousel() {
    const cardsContainer = document.querySelector('.cards_container');
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'carousel-indicators';
    cardsContainer.parentNode.insertBefore(indicatorsContainer, cardsContainer.nextSibling);

    const cards = document.querySelectorAll('.cards_eachOne');

    // Clonar las cards múltiples veces para crear un efecto infinito
    const cloneCount = 3;
    for (let i = 0; i < cloneCount; i++) {
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            cardsContainer.appendChild(clone);
        });
    }

    const allCards = document.querySelectorAll('.cards_eachOne');
    const cardWidth = cards[0].offsetWidth;
    const containerWidth = cardsContainer.offsetWidth;
    const visibleCards = Math.floor(containerWidth / cardWidth);
    const scrollStep = cardWidth * visibleCards;
    const totalWidth = cardWidth * cards.length;

    // Posicionar el scroll en la mitad
    const initialIndex = Math.floor(cards.length / 2);
    cardsContainer.scrollLeft = cardWidth * initialIndex;

    // Crear 5 indicadores fijos
    for (let i = 0; i < 5; i++) {
        const button = document.createElement('button');
        button.dataset.index = i;
        indicatorsContainer.appendChild(button);
    }

    const indicators = document.querySelectorAll('.carousel-indicators button');

    function updateActiveIndicator() {
        const scrollPosition = cardsContainer.scrollLeft;
        const adjustedScrollPosition = scrollPosition % totalWidth;
        const activeIndex = Math.floor((adjustedScrollPosition / totalWidth) * 5);
        
        indicators.forEach((indicator, i) => {
            if (i === activeIndex) {
                indicator.classList.add('active');
                indicator.style.width = '24px';
            } else {
                indicator.classList.remove('active');
                indicator.style.width = '8px';
            }
        });
    }

    function handleInfiniteScroll() {
        const scrollLeft = cardsContainer.scrollLeft;
        const maxScroll = cardsContainer.scrollWidth - cardsContainer.clientWidth;
        
        if (scrollLeft <= 0) {
            cardsContainer.scrollLeft = totalWidth;
        } else if (scrollLeft >= maxScroll) {
            cardsContainer.scrollLeft = totalWidth;
        }
    }

    cardsContainer.addEventListener('scroll', () => {
        updateActiveIndicator();
        handleInfiniteScroll();
    });

    indicators.forEach((button, index) => {
        button.addEventListener('click', () => {
            const scrollPosition = (totalWidth / 5) * index + totalWidth;
            cardsContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        });
    });

    updateActiveIndicator();
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
        const response = await fetch(`http://localhost:5001/api/peliculas/${movieId}`);
        const movie = await response.json();
        
        if (movie.error) {
            console.error(movie.error);
            return;
        }

        document.body.innerHTML = `
            <div class="movie-details-container">
        <div class="movie-header">
            <img src="../storage/img/arrow.png" alt="Back" class="back-button" onclick="goToHome()">
            <h1>Cinema Selection</h1>
            <img src="../storage/img/points.png" alt="More options" class="more-options">
        </div>
        <div class="movie-content">
            <div class="movie-poster">
                <img src="${movie.imagen_banner}" alt="${movie.titulo}">
            </div>
            <div class="movie-info">
                <h2>${movie.titulo}</h2>
                <button class="watch-trailer" onclick="window.open('${movie.trailer}', '_blank')">
                    <img src="../storage/img/music.png" alt="Trailer Icon" class="trailer-icon">
                    Watch Trailer
                </button>
            </div>
            <div class="movie-inf">
                <p class="genre">${movie.genero}</p>
                
                <p class="description">${movie.sinopsis}</p>
            </div>
            <div class="cast">
                <h3>Cast</h3>
                <div class="cast-list">
                    ${movie.reparto.map(actor => `
                        <div class="actor">
                            <img src="${actor.imagen_actor}" alt="${actor.nombre_real}">
                            <div class="actors">
                                <p class="actor-name">${actor.nombre_real}</p>
                                <p class="character-name">${actor.nombre_personaje}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ${movieState !== 'No disponible' ? `
                <div class="cinema">
                    <h3>Cinema</h3>
                    <div class="cinema-item">
                        <div>
                            <p>CineCampus</p>
                            <p>Zona Franca Santander</p>
                        </div>
                        <img src="../storage/img/Cinecampus.png" alt="Cinema logo">
                    </div>
                </div>
                <button id="book-now" onclick="bookMovie()" disabled>Book Now</button>
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
                margin-top:10px;
            }
            .back-button, .more-options {
                width: 24px;
                height: 24px;
                cursor: pointer;
                margin-right: 20px;
                margin-left: 20px;
            }
            .movie-content {
                text-align: center;
            }

            .movie-poster{
                width:100%
                heigth:60px
                border: 1px solid red
            }
            .movie-poster img {
                width: 100%;
                max-width: 400px;
                height: 180px;
                border-radius: 10px;
                object-fit: cover;
            }

            .movie-info {
                display: flex;
                margin-top: 20px;
                flex-direction: row;
                justify-content: space-between;
                margin: 15px;
                margin-top: 1px;
            }

            h2 {
                font-size: 16px;
                margin: 10px 0;
            }

            .genre {
                display: flex;
                justify-content: start;
                color: #efefef;
                margin-bottom: 10px;
                margin-top: -20px;
                margin-left: 15px;
                font-size: 14px;

            }

            .watch-trailer {
                display: flex;
                width: 130px;
                height: 30px;
                align-items: center;
                font-size: 12px;
                padding: 10px 20px;
                border: none;
                color: white;
                cursor: pointer;
                border-radius: 6px;
                margin-top: 10px;
                font-weight: bold;
            }

            .description {
                width: 318px;
                margin-top: 10px;
                font-size: 14px;
                color: #ccc;
                text-align: left;
                margin-left: 15px;
            }
            .cast, .cinema, .mode-selection {
                display: flex;
                flex-direction: column;
                margin-top: 20px;
                text-align: left;
            }
            .cast h3, .cinema h3, .mode-selection h3 {
                font-size: 18px;
                margin-bottom: 10px;
                margin-left: 15px;
            }
            .cast-list {
                display: flex;
                overflow-x: auto;
                padding-bottom: 10px;
                margin-left: 10px;
            }
            .actors {
                display: flex;
                flex-direction: column;
                margin: 0px;
                justify-content: center;
            }
            
            .actor {
                display: flex;
                flex-direction: row;
                flex: 0 0 auto;
                width: auto;
                height: 70px;
                text-align: center;
                margin-right: 15px;
                gap: 10px;
            }

            .actor img {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                justify-content: space-around
            }

            .actor p {
                display: flex;
                margin: 1px 0;
                font-size: 12px;
                align-items: flex-start;
            }

            .cinema-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: #222;
                padding: 10px;
                border-radius: 12px;
                border: 2px solid red
            }
            .cinema-item img {
                width: 40px;
                height: 40px;
            }
            .cinema-item p {
                margin: 0;
                font-size: 14px;
            }
            .mode-buttons {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .mode-button {
                padding: 10px;
                background-color: #222;
                color: #fff;
                border: 2px solid #222;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                transition: all 0.3s ease;
            }
            .mode-button.selected {
                border-color: #ff0000;
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
            #book-now:disabled {
                background-color: #555;
                cursor: not-allowed;
            }

            .movie-header h1 {
                font-size: 20px; 
            }

            .trailer-icon {
                display: flex;
                align-items: self-start;
                margin-right: 10px;
                width: 15px;
                height: 20px;
                margin-left: -10px;
            }

            .actor-name {
                font-weight: bold; 
            }

            .character-name {
                font-weight: normal;
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

function selectMode(button, mode) {
    const buttons = document.querySelectorAll('.mode-button');
    buttons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    document.getElementById('book-now').disabled = false;
}

function bookMovie() {
    const selectedMode = document.querySelector('.mode-button.selected');
    if (selectedMode) {
        const mode = selectedMode.textContent;
        alert(`Has seleccionado: ${mode}`);
    } else {
        alert('Por favor, selecciona un modo de reserva');
    }
}

// Evento para el slider de películas en cartelera
if (document.getElementById('movieSlider')) {
    document.getElementById('movieSlider').addEventListener('scroll', function() {
        const index = Math.round(this.scrollLeft / this.offsetWidth);
        updateActiveDot(index);
    });
}



document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search_input');
    
    // Cargar información del usuario
    const userInfo = JSON.parse(localStorage.getItem('usuarioActual'));
    if (userInfo) {
        const avatarImg = document.querySelector('.avatar');
        avatarImg.src = userInfo.imagen;
        avatarImg.alt = `${userInfo.nombre}'s Avatar`;
        
        const userNameSpan = document.querySelector('.user-info span');
        userNameSpan.textContent = `Hi, ${userInfo.nombre}!`;
    } else {
        console.error('No se encontró información del usuario');
    }

    searchInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                try {
                    const response = await fetch(`http://localhost:5001/api/peliculas/buscar?query=${encodeURIComponent(query)}`);
                    const movies = await response.json();
                    displaySearchResults(movies, query);
                } catch (error) {
                    console.error('Error al buscar películas:', error);
                    displaySearchResults([], query);
                }
            }
        }
    });
});

// Función para mostrar los resultados de la búsqueda
function displaySearchResults(movies, query) {
    const mainContent = document.getElementById('main-content');
    
    let html = `
        <header>
            <div class="inicio">
                <div class="user-info">
                    <img src="" alt="User Avatar" class="avatar">
                    <span>Hi, User!</span>
                </div>
                <div class="user-inf">
                    <span>¡Veamos una película juntos!</span>
                </div>
            </div>
            <div class="notification">
                <img src="../storage/img/notifi.png" alt="Notification">
            </div>
        </header>

        <section id="search-section" class="search">
            <div class="search_bus">
                <div class="search_wrapper">
                    <img src="../storage/img/lupa.svg" alt="Search" class="search_icon">
                    <input class="search_input" type="text" placeholder="Search movie, cinema, genre..." value="${query}">
                </div>
            </div>
        </section>

        <section>
            <div class="search-title">
                <h1>Resultado de Búsqueda</h1>
            </div>
            <div class="search-cards">
    `;

    if (movies.length === 0) {
        html += `
            <div class="no-results">
                <p>No Se Encontraron Resultados Para: "${query}"</p>
                <img src="../storage/img/noResult.png" alt="No results found" class="no-results-image">
            </div>
        `;
    } else {
        movies.forEach(movie => {
            html += `
                <div class="search-card-container" onclick="displayMovieDetails(${movie.id}, '${movie.estado}')">
                    <img src="${movie.imagen_pelicula}" alt="${movie.titulo}">
                    <div class="search-card-title">${movie.titulo}</div>
                    <div class="search-card-subtitle">${movie.genero}</div>
                </div>
            `;
        });
    }

    html += `
            </div>
        </section>

        <nav class="bottom-nav">
            <a href="home.html" class="active">
                <img src="../storage/img/home.png" alt="Home">
                <span>Home</span>
            </a>
            <a href="#search-section">
                <img src="../storage/img/browse.png" alt="Browse">
                <span>Browse</span>
            </a>
            <a href="#">
                <img src="../storage/img/ticket.png" alt="Tickets">
                <span>Tickets</span>
            </a>
            <a href="../views/infoUser.html">
                <img src="../storage/img/user.png" alt="Profile">
                <span>Profile</span>
            </a>
        </nav>
    `;

    mainContent.innerHTML = html;

    // Volver a añadir el event listener para la búsqueda
    const searchInput = document.querySelector('.search_input');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const newQuery = searchInput.value.trim();
            if (newQuery) {
                fetchAndDisplaySearchResults(newQuery);
            }
        }
    });

    // Actualizar la información del usuario después de renderizar
    updateUserInfo();
}

// Función auxiliar para fetch y display de resultados
async function fetchAndDisplaySearchResults(query) {
    try {
        const response = await fetch(`http://localhost:5001/api/peliculas/buscar?query=${encodeURIComponent(query)}`);
        const movies = await response.json();
        displaySearchResults(movies, query);
    } catch (error) {
        console.error('Error al buscar películas:', error);
        displaySearchResults([], query);
    }
}

// Función para actualizar la información del usuario
function updateUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('usuarioActual'));
    if (userInfo) {
        const avatarImg = document.querySelector('.avatar');
        avatarImg.src = userInfo.imagen;
        avatarImg.alt = `${userInfo.nombre}'s Avatar`;
        
        const userNameSpan = document.querySelector('.user-info span');
        userNameSpan.textContent = `Hi, ${userInfo.nombre}!`;
    } else {
        console.error('No se encontró información del usuario');
    }
}