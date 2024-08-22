document.addEventListener('DOMContentLoaded', function() {
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
                        <img src="${movie.imagen_banner}" alt="${movie.titulo}">
                    </div>
                    <div class="movie-info">
                        <h2>${movie.titulo}</h2>
                        <button class="watch-trailer" onclick="showTrailerPopup('${movie.trailer}')">
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
                                <img src="../storage/img/Cinecampus.png" alt="Cinema logo">
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
            
            <div id="video-player" class="video-player">
                <div class="video-container">
                    <button class="close-video" onclick="closeVideoPlayer()">X</button>
                    <div id="youtube-player"></div>
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
                margin-bottom: 15px;
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
                width: 330px;
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
                margin-top: 20px;
                cursor: not-allowed;
                font-weight: bold;
                font-size: 16px;
                transition: all 0.3s ease;
                margin-left: -1%;
                width: 330px;
            }
            #book-now.active {
                background-color: red;
                color: white;
                cursor: pointer;
                margin-top: 60px;
            }

        `;
        document.head.appendChild(styleElement);

        loadYouTubeAPI();

        // Agregar evento de clic al div de CineCampus
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
    // La API está lista, pero no creamos el reproductor aquí
}

function showTrailerPopup(trailerUrl) {
    document.getElementById('trailer-popup').style.display = 'flex';
}

function closeTrailerPopup() {
    document.getElementById('trailer-popup').style.display = 'none';
}

function playTrailer(trailerUrl) {
    closeTrailerPopup();
    const videoPlayer = document.getElementById('video-player');
    videoPlayer.style.display = 'flex';
    
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
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function closeVideoPlayer() {
    const videoPlayer = document.getElementById('video-player');
    videoPlayer.style.display = 'none';
    if (player) {
        player.stopVideo();
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
            body {
                font-family: Arial, sans-serif;
                background-color: #000;
                color: #fff;
                margin: 0;
                padding: 0;
            }

            .movie-details-container {
                max-width: 400px;
                margin: 0 auto;
                padding: 20px;
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
            }

            .seat-icon.reserved {
                background-color: #CECECE;
            }

            .seat-icon.ocupado {
                background-color: #632727;
            }

            .seat-icon.selected {
                background-color: #FE0000;
            }

            .date-selector, .time-selector {
                display: flex;
                overflow-x: auto;
                margin-bottom: 20px;
            }

            .date-btn, .time-btn {
                background-color: #333;
                border: none;
                color: #fff;
                padding: 10px;
                margin-right: 10px;
                border-radius: 5px;
                cursor: pointer;
                min-width: 60px;
                text-align: center;
            }

            .date-btn.selected, .time-btn.selected {
                background-color: #e50914;
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
                font-size: 12px;
            }

            .price-section {
                display: flex;
                justify-content: space-between;
                align-items: center;
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
        `;

        document.head.appendChild(styleElement);

        let totalPrice = 0;

        const seatSelectionHTML = `
            <div class="movie-details-container">
                <div class="movie-header">
                    <img src="../storage/img/arrow.png" alt="Back" class="back-button" onclick="goBack()">
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
                    <div>
                        <span>Precio Total</span>
                        <span class="total-price">$${totalPrice.toFixed(2)}</span>
                    </div>
                    <button class="buy-btn">Comprar boleto</button>
                </div>
            </div>
        `;
        
        document.body.innerHTML = seatSelectionHTML;
        addEventListeners(movieData);

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
            let seatsHTML = '';

            rows.forEach(row => {
                const rowSeats = asientos.filter(seat => seat.fila === row);
                if (rowSeats.length > 0) {
                    seatsHTML += `
                        <div class="row">
                            <span class="row-letter">${row}</span>
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
                    `;
                }
            });

            return seatsHTML;
        }

        function getSeatColor(estado) {
            switch (estado) {
                case 'disponible':
                    return '#323232'; // Color para asientos disponibles
                case 'reservado':
                    return '#CECECE'; // Color para asientos reservados
                case 'ocupado':
                    return '#632727'; // Color para asientos ocupados
                default:
                    return '#323232'; // Color por defecto (disponible)
            }
        }

        function generateDateButtons(proyecciones) {
            const uniqueDates = [...new Set(proyecciones.map(p => p.horario.fecha_proyeccion))];

            return uniqueDates.map((date, index) => {
                const dateObj = new Date(date.split('/').reverse().join('-'));
                dateObj.setDate(dateObj.getDate() + 1);  // Ajuste en la fecha

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
                    <div class="price">$${proyeccion.horario.precio_pelicula.toFixed(2)} - ${proyeccion.sala.tipo}</div>
                </button>
            `).join('');
        }

        function addEventListeners(movieData) {
            document.querySelectorAll('.seat').forEach(seat => {
                seat.addEventListener('click', (e) => {
                    const seatElement = e.currentTarget;
                    if (seatElement.classList.contains('disponible')) {
                        seatElement.classList.toggle('selected');
                        const seatPrice = parseFloat(seatElement.dataset.price);
                        const moviePrice = parseFloat(getSelectedProjection().horario.precio_pelicula);

                        if (seatElement.classList.contains('selected')) {
                            totalPrice += (seatPrice + moviePrice);
                        } else {
                            totalPrice -= (seatPrice + moviePrice);
                        }

                        // Actualiza el precio total sumando el precio de la película más los asientos seleccionados
                        document.querySelector('.total-price').textContent = `$${totalPrice.toFixed(2)}`;

                        seatElement.style.backgroundColor = seatElement.classList.contains('selected') ? '#FF0000' : getSeatColor(seatElement.dataset.estado);
                    }
                });
            });

            document.querySelectorAll('.date-btn').forEach(dateBtn => {
                dateBtn.addEventListener('click', (e) => {
                    document.querySelectorAll('.date-btn').forEach(btn => btn.classList.remove('selected'));
                    e.currentTarget.classList.add('selected');
                    updateAvailableTimes();
                });
            });

            document.querySelectorAll('.time-btn').forEach(timeBtn => {
                timeBtn.addEventListener('click', (e) => {
                    document.querySelectorAll('.time-btn').forEach(btn => btn.classList.remove('selected'));
                    e.currentTarget.classList.add('selected');
                    updateSeats();
                });
            });
        }

        function updateAvailableTimes() {
            const selectedDate = getSelectedDate();
            const filteredProjections = movieData.proyecciones.filter(p => p.horario.fecha_proyeccion === selectedDate);
            
            document.querySelector('.time-selector').innerHTML = generateTimeButtons(filteredProjections);
            
            // Agregar event listeners para las nuevas horas
            document.querySelectorAll('.time-btn').forEach(timeBtn => {
                timeBtn.addEventListener('click', (e) => {
                    document.querySelectorAll('.time-btn').forEach(btn => btn.classList.remove('selected'));
                    e.currentTarget.classList.add('selected');
                    updateSeats();
                });
            });
    
            // Actualiza los asientos basados en la nueva selección de hora
            updateSeats();
        }

        function updateSeats() {
            const selectedProjection = getSelectedProjection();
            document.querySelector('.seats').innerHTML = generateSeats(selectedProjection.asientos);
            
            // Resetea el precio total cuando se cambia de proyección
            totalPrice = 0;

            // Actualiza el precio basado en la nueva selección
            document.querySelector('.total-price').textContent = `$${totalPrice.toFixed(2)}`;
            
            // Reaplicar event listeners para la selección de asientos
            document.querySelectorAll('.seat').forEach(seat => {
                seat.addEventListener('click', (e) => {
                    const seatElement = e.currentTarget;
                    if (seatElement.classList.contains('disponible')) {
                        seatElement.classList.toggle('selected');
                        const seatPrice = parseFloat(seatElement.dataset.price);
                        const moviePrice = parseFloat(getSelectedProjection().horario.precio_pelicula);

                        if (seatElement.classList.contains('selected')) {
                            totalPrice += (seatPrice + moviePrice);
                        } else {
                            totalPrice -= (seatPrice + moviePrice);
                        }

                        // Actualiza el precio total sumando el precio de la película más los asientos seleccionados
                        document.querySelector('.total-price').textContent = `$${totalPrice.toFixed(2)}`;

                        seatElement.style.backgroundColor = seatElement.classList.contains('selected') ? '#FF0000' : getSeatColor(seatElement.dataset.estado);
                    }
                });
            });
        }

    } catch (error) {
        console.error('Error al cargar los datos de la película:', error);
    }
}

function goBack() {
    window.history.back();
}