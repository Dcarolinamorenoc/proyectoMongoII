document.addEventListener('DOMContentLoaded', function() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker
            .register('/service-worker.js')
            .then(registration => {
              console.log('Service Worker registrado con éxito:', registration.scope);
            })
            .catch(error => {
              console.log('Fallo al registrar el Service Worker:', error);
            });
        });
      }
      ~
    fetchMoviesEnCartelera();
    fetchMoviesProximoEstreno();
    fetchMoviesNoDisponible();
});

async function fetchMoviesEnCartelera() {
    try {
        const response = await fetch('/api/peliculas/estado/En%20cartelera');
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
        const response = await fetch('/api/peliculas/estado/Pr%C3%B3ximo%20estreno');
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
        const response = await fetch('/api/peliculas/estado/No%20disponible');
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
            // Asegúrate de que el clon tenga el mismo evento de clic que el original
            clone.onclick = card.onclick;
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

    function updateCardVisibility() {
        const containerCenter = cardsContainer.offsetWidth / 2;
        const scrollPosition = cardsContainer.scrollLeft;
        
        allCards.forEach((card) => {
            const cardCenter = card.offsetLeft - scrollPosition + (card.offsetWidth / 2);
            const distanceFromCenter = Math.abs(containerCenter - cardCenter);
            
            if (distanceFromCenter < card.offsetWidth / 2) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    cardsContainer.addEventListener('scroll', () => {
        updateActiveIndicator();
        handleInfiniteScroll();
        updateCardVisibility();
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
    updateCardVisibility();
}




function displayMoviesProximoEstreno(movies) {
    const movieList = document.getElementById('coming-soon-movies');
    movieList.innerHTML = '';
    
    movies.forEach((movie) => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie-item';
        movieElement.onclick = () => displayMovieDetails(movie.id, 'Próximo estreno');
        
        // Extraer el año de la fecha de estreno
        const año = movie.fecha_estreno.split('/')[2];
        
        movieElement.innerHTML = `
        <img src="${movie.imagen_pelicula}" alt="${movie.titulo}" loading="lazy" onerror="this.src='path_to_default_image.jpg'">
        <div class="movie-info">
        <h3>${movie.titulo} (${año})</h3>
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
        
        // Extraer el año de la fecha de estreno
        const año = movie.fecha_estreno ? movie.fecha_estreno.split('/')[2] : 'Desconocido';
        
        movieElement.innerHTML = `
            <img src="${movie.imagen_pelicula}" alt="${movie.titulo}" loading="lazy" onerror="this.src='path_to_default_image.jpg'">
            <div class="movie-info">
            <h3 style="font-size: 1rem;">${movie.titulo} (${año})</h3>
                <p>${movie.genero}</p>
            </div>
        `;
        
        movieList.appendChild(movieElement);
    });
}

async function displayMovieDetails(movieId, movieState) {
    try {
        const response = await fetch(`/api/peliculas/${movieId}`);
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
                        <img id="movie-banner" src="${movie.imagen_banner}" alt="${movie.titulo}">
                        <div id="youtube-player" style="display: none;"></div>
                    </div>
                    <div class="movie-info">
                        <h2>${movie.titulo}</h2>
                        <button id="trailer-button" class="watch-trailer" onclick="showTrailerPopup('${movie.trailer}')">
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
                    ${movieState !== 'No disponible' && movieState !== 'Próximo estreno' ? `
                        <div class="cinema">
                            <h3>Cinema</h3>
                            <div id="cinecampus" class="cinema-item">
                                <div>
                                    <p>CineCampus</p>
                                    <p>Zona Franca Santander</p>
                                </div>
                                <img src="../storage/img//newLogo.webp" alt="Cinema logo">
                            </div>
                        </div>
                    <button id="book-now" onclick="displaySeatSelection(${movieId})" ${movieState !== 'En cartelera' ? 'disabled' : ''}>Book Now</button>
                    ` : ''}
                </div>
            </div>
            
            <div id="trailer-popup" class="popup">
                <div class="popup-content">
                    <p>¿Estás seguro de que quieres ver el trailer?</p>
                    <button onclick="playTrailer('${movie.trailer}')">Sí</button>
                    <button onclick="closeTrailerPopup()">No</button>
                </div>
            </div>
        `;


        const styleElement = document.createElement('style');
        styleElement.textContent = `
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #000;
                color: #fff;
                padding: 0 7%;
                margin-top: 7%;

            }
            .movie-details-container {
                display: flex;
                flex-direction: column;
                width: 116%;
                height: auto;
                margin-left: -26px;
                margin-top: -20px;
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
                margin-top: 6px;
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
                margin-bottom: 15px;
                margin-left: 15px;
            }
            .cast-list {
                display: flex;
                overflow-x: auto;
                padding-bottom: 10px;
                margin-left: 10px;
                scrollbar-width: none;
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
                border: 2px solid red,
                
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
                background-color: #ccc;
                color: #666;
                cursor: not-allowed;
                margin-top: 60px;
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

             .popup {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }

            .popup-content {
                background-color: white;
                padding: 20px;
                border-radius: 5px;
                text-align: center;
                color: black;
            }

            .popup-content button {
                margin: 10px;
                padding: 5px 20px;
                background-color: red;
                color: white;
                border: none;
                cursor: pointer;
            }

            .video-player {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                justify-content: center;
                align-items: center;
                z-index: 1001;
            }

            .video-container {
                position: relative;
                width: 80%;
                max-width: 800px;
                aspect-ratio: 16 / 9;
            }

            .close-video {
                position: absolute;
                top: -40px;
                right: 0px;
                background-color: red;
                color: white;
                border: none;
                font-size: 20px;
                cursor: pointer;
                padding: 5px 10px;
                border-radius: 50%;
            }

            #youtube-player {
                width: 100%;
                height: 100%;
            }
                .cinema-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: #222;
                padding: 10px;
                border-radius: 12px;
                border: 2px solid transparent;
                cursor: pointer;
                transition: border-color 0.3s ease;
                margin-left: 3%;
                width: 84vw;
            }
            .cinema-item.selected {
                border-color: red;
            }
            .cinema-item img {
                width: 40px;
                height: 40px;
            }
            .cinema-item p {
                margin: 0;
                font-size: 14px;
            }

            #book-now {
                width: 100%;
                padding: 15px;
                background-color: #ccc;
                color: #666;
                border: none;
                border-radius: 10px;
                margin-top: 15%;
                cursor: not-allowed;
                font-weight: bold;
                font-size: 16px;
                transition: all 0.3s ease;
                width: 82vw;
            }
            #book-now.active {
                background-color: red;
                color: white;
                cursor: pointer;
                margin-top: 17%;
            }

            #youtube-player {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }

            .movie-poster {
                position: relative;
                width: 100%;
                height: 180px;
            }

            .video-stream html5-main-video{
                width: 100%;
                height: 180px;
                left: px;
                top: 0px;
            }

        `;
        document.head.appendChild(styleElement);

        loadYouTubeAPI();


        const cinecampusDiv = document.getElementById('cinecampus');
        const bookButton = document.getElementById('book-now');

        cinecampusDiv.addEventListener('click', function() {
            this.classList.toggle('selected');
            if (this.classList.contains('selected')) {
                bookButton.classList.add('active');
                bookButton.disabled = false;
            } else {
                bookButton.classList.remove('active');
                bookButton.disabled = true;
            }
        });

        const bookNowButton = document.getElementById('book-now');
        bookNowButton.addEventListener('click', () => {
            displaySeatSelection(movieId);
        });

    } catch (error) {
        console.error('Error al obtener los detalles de la película:', error);
    }
}

function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

let player;
function onYouTubeIframeAPIReady() {
    console.log("YouTube API is ready");
}

function showTrailerPopup(trailerUrl) {
    document.getElementById('trailer-popup').style.display = 'flex';
}

function closeTrailerPopup() {
    document.getElementById('trailer-popup').style.display = 'none';
}

function playTrailer(trailerUrl) {
    closeTrailerPopup();
    const movieBanner = document.getElementById('movie-banner');
    const youtubePlayer = document.getElementById('youtube-player');
    const trailerButton = document.getElementById('trailer-button');
    
    movieBanner.style.display = 'none';
    youtubePlayer.style.display = 'block';
    
    // Extraer el ID del video de YouTube de la URL
    const videoId = trailerUrl.split('v=')[1];
    
    if (player) {
        player.loadVideoById(videoId);
    } else {
        player = new YT.Player('youtube-player', {
            height: '100%',
            width: '100%',
            videoId: videoId,
            events: {
                'onReady': onPlayerReady
            }
        });
    }

    trailerButton.textContent = 'Stop Trailer';
    trailerButton.onclick = stopTrailer;
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function stopTrailer() {
    const movieBanner = document.getElementById('movie-banner');
    const youtubePlayer = document.getElementById('youtube-player');
    const trailerButton = document.getElementById('trailer-button');

    if (player) {
        player.stopVideo();
    }

    movieBanner.style.display = 'block';
    youtubePlayer.style.display = 'none';

    trailerButton.innerHTML = `
        <img src="../storage/img/music.png" alt="Trailer Icon" class="trailer-icon">
        Watch Trailer
    `;
    trailerButton.onclick = function() {
        showTrailerPopup(player.getVideoUrl());
    };
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
                    const response = await fetch(`/api/peliculas/buscar?query=${encodeURIComponent(query)}`);
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
        const response = await fetch(`/api/peliculas/buscar?query=${encodeURIComponent(query)}`);
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












async function displaySeatSelection(movieId) {
    try {
        const response = await fetch(`/api/peliculas/${movieId}/info-completa`);
        const movieData = await response.json();

        console.log('Datos recibidos de la API:', movieData);

        if (movieData.error) {
            console.error(movieData.error);
            return;
        }

        const styleElement = document.createElement('style');
        styleElement.textContent = `
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            html, body{
                margin: 0;
                padding: 0;
                height: 100%;
                width: 100%;
                top: 0;
                left: 0;
            }
        
            body {
                font-family: Arial, sans-serif;
                background-color: #000;
                color: #fff;
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            .movie-details-container2 {
                max-width: 100%;
                margin: 0 auto;
            }

            .movie-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 40px;
                margin-bottom: 20px;
            }

            .back-button2, .more-options {
                width: 24px;
                height: 24px;
                cursor: pointer;
                margin-right: 18px;
                margin-left: 20px;
            }

            .movie-header h1 {
                font-size: 20px;
                margin: 0;
            }

            .screen {
                text-align: center;
                font-size: 14px;
                margin-bottom: 20px;
                position: relative;
                margin-top: 30px;
            }

            .seats {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 20px;
            }

            .row {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
            }

            .row-letter {
                width: 20px;
                text-align: right;
                margin-right: 10px;
                font-weight: bold;
            }

            .seat {
                width: 30px;
                height: 30px;
                margin: 0 5px;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                font-size: 12px;
                color: #fff;
            }

            .seat.disponible {
                background-color: #323232;
            }

            .seat.reservado {
                background-color: #CECECE;
                color: #000;
                cursor: not-allowed;
            }

            .seat.ocupado {
                background-color: #632727;
                cursor: not-allowed;
            }

            .seat.selected {
                background-color: #FE0000;
            }

            .legend {
                display: flex;
                justify-content: space-around;
                margin-bottom: 20px;
                gap: 5px;
            }

            .legend-item {
                display: flex;
                align-items: center;
                font-size: 12px;
            }

            .seat-icon {
                width: 15px;
                height: 15px;
                border-radius: 3px;
                margin-right: 5px;
            }

            .seat-icon.available {
                background-color: #323232;
                border-radius: 20px;
            }

            .seat-icon.reserved {
                background-color: #CECECE;
                border-radius: 20px;
            }

            .seat-icon.ocupado {
                background-color: #632727;
                border-radius: 20px;
            }

            .seat-icon.selected {
                background-color: #FE0000;
                border-radius: 20px;
            }

            .time-selector {
                display: flex;
                overflow-x: auto;
                margin-bottom: 20px;
                scrollbar-width: none;
                overflow-x: auto;
                margin-left: 5%;

            }

            .date-selector {
                display: flex;
                overflow-x: auto;
                margin-bottom: 20px;
                margin-left: 7%;
                scrollbar-width: none;

            }

            .time-btn {
                background-color: #fff;
                border: none;
                color: #969696;
                padding: 10px;
                margin-right: 10px;
                border-radius: 5px;
                cursor: pointer;
                min-width: 60px;
                text-align: center;
                width: 26vw;
            }

            .date-btn{
                background-color: #fff;
                border: none;
                color: #969696;
                padding: 10px;
                margin-right: 10px;
                height: 90px;
                border-radius: 8px;
                cursor: pointer;
                min-width: 60px;
                text-align: center;
            }

            .date-btn span{
                color: #000;
                font-size: 25px;
                margin-top: 4%;
            }

                .time{
                color: #000;
                font-size: 25px;
                margin-top: 4%;
            }


            .span.date-number{
                margin-top: 5%;
            }

            .date-btn.selected {
                background-color: #e50914;
                width: 15vw;
                height: 10vh;
                height: 90px;
                color: #fff;
            }

            .date-btn.selected span{
                background-color: #e50914;
                width: 15vw;
                height: 10vh;
                color: #fff;
            }

            .time-btn.selected {
                background-color: #e50914;
                width: 26vw;
                height: 8vh;
                color: #fff;
            }

            .time-btn.selected .time{
                color: #fff;
            }



            .day {
                font-size: 12px;
            }

            .date-number {
                font-size: 18px;
                font-weight: bold;
            }

            .time {
                font-size: 16px;
                font-weight: bold;
            }

            .price {
                font-size: 0.7rem;
                font-weight: bold;
            }

            .price-section {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-left: 5%;
                width: 90vw;
            }

            .total-precio {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: baseline;
                gap: 5px; 
                margin-top:20px;
                margin-left: 2%;
            }

            .total-price {
                font-size: 24px;
                font-weight: bold;
            }

            .buy-btn {
                background-color: #e50914;
                color: #fff;
                border: none;
                padding: 15px 30px;
                border-radius: 5px;
                font-size: 18px;
                cursor: pointer;
                margin-top: 20px;
                margin-right: 4%;
            }

            .seat {
                width: 30px;
                height: 30px;
                margin: 0 5px;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                font-size: 12px;
                color: #fff;
            }

            .seat.disponible {
                background-color: #323232;
            }

            .seat.reservado {
                background-color: #CECECE;
                color: #000;
                cursor: not-allowed;
            }

            .seat.ocupado {
                background-color: #632727;
                cursor: not-allowed;
            }

            .seat.selected {
                background-color: #FE0000 !important;
            }

            .seats-container {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
            }
            
            .row {
                display: flex;
                align-items: center;
            }
            .row-letter {
                width: 2px;
                text-align: right;
                margin-right: 10px;
                font-weight: bold;
                margin-right: 15px;
                margin-left: -20px;
                font-size: 0.8rem;
                margin-left: 1px;

            }
            
            .seats-row {
                display: flex;
                margin-bottom: -10px;
            }
            
            .seat-spacer {
                width: 35px;
                height: 30px;
            }
            
            .seat {
                width: 30px;
                height: 30px;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                font-size: 10px;
                color: #fff;
                margin: 3px;
            }

            .row-b {
                margin-bottom: 40px;
            }

            .time-selector {
                display: flex;
                overflow-x: auto;
                margin-bottom: 20px;
                margin-left: 7%;
                margin-right: 5%;
                scrollbar-width: none;  /* Para Firefox */
                -ms-overflow-style: none;  /* Para Internet Explorer y Edge */
                white-space: nowrap;
                -webkit-overflow-scrolling: touch; /* Para un desplazamiento suave en iOS */
            }
            
            /* Ocultar la barra de desplazamiento para Chrome, Safari y Opera */
            .date-selector::-webkit-scrollbar,
            .time-selector::-webkit-scrollbar {
                display: none;
            }

            .date-btn,
            .time-btn {
                flex-shrink: 0;
            }

            .date-btn .day {
                margin-bottom: 8px;
                font-size: 1rem;
            }

               .popup {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .popup-content {
                background-color: white;
                padding: 20px;
                border-radius: 5px;
                text-align: center;
                margin: 15%;
            }
            .popup-content button {
                margin: 10px;
                padding: 10px 20px;
                border-radius: 10px;
            }
            
            .custom-popup {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            .custom-popup-content {
                background-color: white;
                padding: 20px;
                border-radius: 5px;
                text-align: center;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                color: black; /* Asegura que el texto sea negro en todos los popups */
            }
            .custom-popup-info .custom-popup-content {
                border-top: 5px solid #3498db;
            }
            .custom-popup-success .custom-popup-content {
                border-top: 5px solid #2ecc71;
            }
            .custom-popup-error .custom-popup-content {
                border-top: 5px solid #e74c3c;
            }
            .custom-popup-close {
                margin-top: 10px;
                padding: 5px 10px;
                background-color: #3498db;
                color: white;
                border: none;
                border-radius: 3px;
                cursor: pointer;
            }
            .custom-popup-close:hover {
                background-color: #2980b9;
            }
        `;

        document.head.appendChild(styleElement);



        let totalPrice = 0;

        const seatSelectionHTML = `
            <div class="movie-details-container2">
                <div class="movie-header">
                    <img src="../storage/img/arrow.png" alt="Back" class="back-button2" onclick="goBack(${movieId}, '${movieData.estado}')">
                    <h1>Escoger Asientos</h1>
                    <img src="../storage/img/points.png" alt="More options" class="more-options">
                </div>
                
                <div class="screen">
                    <img src="../storage/img/pantalla.png" alt="screen">
                </div>
                
                <div class="seats">
                    ${generateSeats(movieData.proyecciones[0].asientos)}
                </div>
                
                <div class="legend">
                    <span class="legend-item"><span class="seat-icon available"></span> Disponible</span>
                    <span class="legend-item"><span class="seat-icon ocupado"></span> Ocupado</span>
                    <span class="legend-item"><span class="seat-icon reserved"></span> Reservado</span>
                    <span class="legend-item"><span class="seat-icon selected"></span> Seleccionado</span>
                </div>
                
                <div class="date-selector">
                    ${generateDateButtons(movieData.proyecciones)}
                </div>
                
                <div class="time-selector">
                    ${generateTimeButtons(movieData.proyecciones.filter(p => p.horario.fecha_proyeccion === getSelectedDate()))}
                </div>
                
                <div class="price-section">
                    <div class="total-precio">
                        <span>Precio Total</span>
                        <span class="total-price">$${totalPrice.toFixed(2)}</span>
                    </div>
                    <button class="buy-btn" id="buyButton">Comprar boleto</button>
                </div>
            </div>
        `;

        document.body.innerHTML = seatSelectionHTML;
        addEventListeners(movieData);

        document.getElementById('buyButton').addEventListener('click', () => showPurchasePopup(movieId, movieData));

        function showPurchasePopup(movieId, movieData) {
            const selectedSeats = document.querySelectorAll('.seat.selected');
            if (selectedSeats.length === 0) {
                createCustomPopup('Por favor, selecciona al menos un asiento.', 'error');
                return;
            }

            const popup = document.createElement('div');
            popup.className = 'popup';
            popup.innerHTML = `
                <div class="popup-content">
                    <h2>¿Qué deseas hacer?</h2>
                    <button id="reserveButton">Reservar</button>
                    <button id="buyTicketButton">Comprar Boleto</button>
                    <button id="cancelButton">Cancelar</button>
                </div>
            `;
            document.body.appendChild(popup);

            document.getElementById('reserveButton').addEventListener('click', () => handleReservation(movieId, movieData, 'reserve'));
            document.getElementById('buyTicketButton').addEventListener('click', () => handleReservation(movieId, movieData, 'buy'));
            document.getElementById('cancelButton').addEventListener('click', () => popup.remove());
        }

        async function handleReservation(movieId, movieData, action) {
            // Selecciona los asientos con el campo `data-id` que corresponde al `id` (no `_id`)
            const selectedSeats = Array.from(document.querySelectorAll('.seat.selected')).map(seat => seat.dataset.id);
        
            const selectedDate = document.querySelector('.date-btn.selected').dataset.date;
            const selectedTime = document.querySelector('.time-btn.selected').dataset.time;
        
            const selectedProjection = movieData.proyecciones.find(p =>
                p.horario.fecha_proyeccion === selectedDate && p.horario.horario_proyeccion === selectedTime
            );

            const userInfo = JSON.parse(localStorage.getItem('usuarioActual'));
            if (!userInfo || !userInfo.id) {
                createCustomPopup('No se pudo encontrar la información del usuario. Por favor, inicia sesión nuevamente.', 'error');
                return;
            }
        
        
            const reservationData = {
                id: Math.floor(Math.random() * 1000000),
                id_usuario: userInfo.id, // Aquí se usa el ID del usuario actual
                fecha_reserva: new Date().toLocaleDateString('es-ES'),
                estado: action === 'reserve' ? 'reservada' : 'comprada', // Dependiendo de la acción (reservar o comprar)
                fecha_expiracion: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES'),
                asientos_reservados: selectedSeats,
                id_pelicula: movieId,
                id_horario_proyeccion: selectedProjection.horario.id
            };
             
        
            try {
                const response = await fetch('/api/reservas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reservationData),
                });
        
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Server response:', errorData);
                    throw new Error(errorData.error || 'Error al realizar la reserva');
                }
        
                createCustomPopup(
                    action === 'reserve' ? 'Reserva realizada con éxito' : 'Compra realizada con éxito',
                    'success',
                    3000
                );   
                setTimeout(() => {
                    window.location.href = action === 'reserve' ? '../views/home.html' : '../views/principal.js';
                }, 3500)
            }catch (error) {
                console.error('Error:', error);
                createCustomPopup('Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.', 'error');
            }
        }
        

        function getSelectedDate() {
            const selectedDateBtn = document.querySelector('.date-btn.selected');
            return selectedDateBtn ? selectedDateBtn.dataset.date : movieData.proyecciones[0].horario.fecha_proyeccion;
        }

        function getSelectedProjection() {
            const selectedTimeBtn = document.querySelector('.time-btn.selected');
            const selectedDateBtn = document.querySelector('.date-btn.selected');
            return selectedTimeBtn
                ? movieData.proyecciones.find(p => p.horario.horario_proyeccion === selectedTimeBtn.dataset.time && p.horario.fecha_proyeccion === selectedDateBtn.dataset.date)
                : movieData.proyecciones.find(p => p.horario.fecha_proyeccion === getSelectedDate());
        }

        function generateSeats(asientos) {
            const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
            let seatsHTML = '<div class="seats-container">';

            rows.forEach(row => {
                const rowSeats = asientos.filter(seat => seat.fila === row);
                if (rowSeats.length > 0) {
                    seatsHTML += `
                        <div class="row ${row === 'B' ? 'row-b' : ''}">
                            <span class="row-letter">${row}</span>
                            <div class="seats-row">
                                ${row === 'A' ? '<div class="seat-spacer"></div><div class="seat-spacer"></div>' : ''}
                                ${row === 'B' ? '<div class="seat-spacer"></div>' : ''}
                                ${rowSeats.map(seat => `
                                    <div class="seat ${seat.estado}" 
                                         data-id="${seat.id}"
                                         data-row="${seat.fila}" 
                                         data-number="${seat.numero}" 
                                         data-estado="${seat.estado}" 
                                         data-price="${seat.Precio}"
                                         style="background-color: ${getSeatColor(seat.estado)};">
                                        ${seat.numero}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }
            });

            seatsHTML += '</div>';
            return seatsHTML;
        }

        function getSeatColor(estado) {
            switch (estado) {
                case 'disponible':
                    return '#323232';
                case 'reservado':
                    return '#CECECE';
                case 'ocupado':
                    return '#632727';
                default:
                    return '#323232';
            }
        }



        function createCustomPopup(message, type = 'info', duration = null) {
            const popup = document.createElement('div');
            popup.className = `custom-popup custom-popup-${type}`;
            popup.innerHTML = `
                <div class="custom-popup-content">
                    <p>${message}</p>
                    ${duration === null ? '<button class="custom-popup-close">Cerrar</button>' : ''}
                </div>
            `;
            document.body.appendChild(popup);
        
            if (duration === null) {
                popup.querySelector('.custom-popup-close').addEventListener('click', () => {
                    popup.remove();
                });
            } else {
                setTimeout(() => {
                    popup.remove();
                }, duration);
            }
        }


        function generateDateButtons(proyecciones) {
            const uniqueDates = [...new Set(proyecciones.map(p => p.horario.fecha_proyeccion))];

            return uniqueDates.map((date, index) => {
                const dateObj = new Date(date.split('/').reverse().join('-'));
                dateObj.setDate(dateObj.getDate() + 1);

                return `
                    <button class="date-btn ${index === 0 ? 'selected' : ''}" data-date="${date}">
                        <div class="day">${dateObj.toLocaleDateString('es-ES', { weekday: 'short' })}</div>
                        <div class="date">
                            <span class="date-number">${dateObj.getDate()}</span>
                        </div>
                    </button>
                `;
            }).join('');
        }

        function generateTimeButtons(proyecciones) {
            return proyecciones.map((proyeccion, index) => `
                <button class="time-btn ${index === 0 ? 'selected' : ''}" 
                        data-date="${proyeccion.horario.fecha_proyeccion}" 
                        data-time="${proyeccion.horario.horario_proyeccion}"
                        data-sala="${proyeccion.sala.id}">
                    <div class="time">${proyeccion.horario.horario_proyeccion}</div>
                    <div class="price">$${proyeccion.horario.precio_pelicula}</div>
                </button>
            `).join('');
        }

        function addEventListeners(movieData) {
            const seatElements = document.querySelectorAll('.seat');

            seatElements.forEach(seatElement => {
                if (seatElement.dataset.estado === 'disponible') {
                    seatElement.addEventListener('click', () => {
                        seatElement.classList.toggle('selected');
                        const seatPrice = parseFloat(seatElement.dataset.price);
                        const moviePrice = parseFloat(getSelectedProjection().horario.precio_pelicula);

                        if (seatElement.classList.contains('selected')) {
                            totalPrice += seatPrice + moviePrice;
                        } else {
                            totalPrice -= seatPrice + moviePrice;
                        }

                        document.querySelector('.total-price').textContent = `$${totalPrice.toFixed(2)}`;
                    });
                }
            });

            const dateButtons = document.querySelectorAll('.date-btn');
            dateButtons.forEach(dateButton => {
                dateButton.addEventListener('click', () => {
                    document.querySelector('.date-btn.selected').classList.remove('selected');
                    dateButton.classList.add('selected');
                    updateAvailableTimes();
                    updateSeats();
                });
            });

            const timeButtons = document.querySelectorAll('.time-btn');
            timeButtons.forEach(timeButton => {
                timeButton.addEventListener('click', () => {
                    document.querySelector('.time-btn.selected').classList.remove('selected');
                    timeButton.classList.add('selected');
                    updateSeats();
                });
            });

            function updateAvailableTimes() {
                const selectedDate = getSelectedDate();
                const filteredProjections = movieData.proyecciones.filter(p => p.horario.fecha_proyeccion === selectedDate);

                const timeSelector = document.querySelector('.time-selector');
                timeSelector.innerHTML = generateTimeButtons(filteredProjections);
            }

            function updateSeats() {
                const selectedProjection = getSelectedProjection();
                const seatsContainer = document.querySelector('.seats');
                seatsContainer.innerHTML = generateSeats(selectedProjection.asientos);
                addEventListeners(movieData);
            }
        }

    } catch (error) {
        console.error('Error al cargar los datos de la película:', error);
    }
}

function goBack(movieId, movieState) {
    console.log('Volviendo a los detalles de la película con ID:', movieId, 'y estado:', movieState);
    displayMovieDetails(movieId, movieState);
}