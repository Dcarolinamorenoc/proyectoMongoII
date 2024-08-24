/**
 * Gestiona la interacción con el Service Worker y las funciones relacionadas con la visualización de películas.
 * 
 * @description
 * - Registra el Service Worker para optimizar el rendimiento del sitio y habilitar el soporte sin conexión.
 * - Llama a funciones que listan películas en cartelera, próximos estrenos y no disponibles.
 * - Proporciona una función para limpiar la caché almacenada por el Service Worker.
 * 
 * @function clearCache
 * - Limpia la caché almacenada por el Service Worker.
 * 
 * @event DOMContentLoaded
 * - Escucha la carga del documento para registrar el Service Worker y ejecutar las funciones de película.
 * 
 * @returns {void}
 */



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

function clearCache() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            return new Promise((resolve, reject) => {
                const messageChannel = new MessageChannel();
                messageChannel.port1.onmessage = event => {
                    if (event.data.error) {
                        reject(event.data.error);
                    } else {
                        resolve(event.data);
                    }
                };
                registration.active.postMessage(
                    { action: 'clearCache' },
                    [messageChannel.port2]
                );
            });
        }).then(response => {
            console.log(response.result);
            // Aquí puedes añadir cualquier acción adicional después de limpiar la caché
        }).catch(error => {
            console.error('Error al limpiar la caché:', error);
        });
    }
}

/**
 * Realiza solicitudes a la API para obtener películas en diferentes estados y las muestra en el sitio web.
 * 
 * @function fetchMoviesEnCartelera
 * - Obtiene las películas que están actualmente en cartelera.
 * - Si la respuesta es válida y contiene un array, llama a `displayMoviesEnCartelera` para mostrar las películas y configura el carrusel con `setupCarousel`.
 * - Maneja errores en caso de fallo en la solicitud o respuesta incorrecta.
 * 
 * @function fetchMoviesProximoEstreno
 * - Obtiene las películas que están próximas a estrenarse.
 * - Si la respuesta es válida y contiene un array, llama a `displayMoviesProximoEstreno` para mostrar las películas.
 * - Maneja errores en caso de fallo en la solicitud o respuesta incorrecta.
 * 
 * @function fetchMoviesNoDisponible
 * - Obtiene las películas que ya no están disponibles.
 * - Si la respuesta es válida y contiene un array, llama a `displayMoviesNoDisponible` para mostrar las películas.
 * - Maneja errores en caso de fallo en la solicitud o respuesta incorrecta.
 * 
 * @returns {Promise<void>}
 */



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



/**
 * Muestra las películas en cartelera en un contenedor de tarjetas y configura un carrusel infinito.
 * 
 * @function displayMoviesEnCartelera
 * - Recibe un array de películas y las muestra como tarjetas en el contenedor con el ID 'now-playing-container'.
 * - Cada tarjeta incluye una imagen, título y género de la película, y un evento `onclick` para mostrar detalles de la película.
 * - Si la imagen de la película no se carga, utiliza una imagen por defecto.
 * 
 * @function setupCarousel
 * - Configura un carrusel infinito con las tarjetas de películas en cartelera.
 * - Clona varias veces las tarjetas para crear un efecto infinito de desplazamiento.
 * - Crea indicadores de carrusel para mostrar la posición actual en el carrusel.
 * - Ajusta el desplazamiento del carrusel y actualiza los indicadores y la visibilidad de las tarjetas activas.
 * - Implementa un desplazamiento infinito que reinicia el scroll cuando llega al inicio o al final.
 * - Maneja eventos de clic en los indicadores para desplazarse suavemente a la posición correspondiente.
 * 
 * @returns {void}
 */


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


/**
 * Muestra las películas próximas a estrenarse en una lista de elementos y configura los eventos para mostrar detalles de cada película.
 * 
 * @function displayMoviesProximoEstreno
 * - Recibe un array de películas y las muestra en el contenedor con el ID 'coming-soon-movies'.
 * - Cada película se muestra con una imagen, título (con el año de estreno extraído) y género.
 * - Si la imagen de la película no se carga, se utiliza una imagen por defecto.
 * - Cada película incluye un evento `onclick` para mostrar detalles específicos de la película.
 * 
 * @function displayMoviesNoDisponible
 * - Muestra las películas no disponibles en un contenedor de elementos con el ID 'not-avaliable-movies'.
 * - Cada película se muestra con una imagen, título (con el año de estreno, o "Desconocido" si no está disponible) y género.
 * - Cada tarjeta tiene un evento `onclick` para mostrar los detalles de la película no disponible.
 * - Si la imagen de la película no se carga, se utiliza una imagen por defecto.
 * 
 * @returns {void}
 */


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


/**
 * Muestra los detalles de una película específica y permite interactuar con su contenido, como ver el tráiler o seleccionar cine para la compra de boletos.
 * 
 * @async
 * @function displayMovieDetails
 * @param {number} movieId - El ID de la película cuyos detalles se desean mostrar.
 * @param {string} movieState - El estado actual de la película, como "En cartelera", "Próximo estreno" o "No disponible".
 * 
 * - Obtiene los detalles de la película a través de una solicitud `fetch` a la API (`/api/peliculas/:movieId`).
 * - Muestra la imagen del banner de la película, sinopsis, género y el elenco en un formato dinámico.
 * - Permite ver el tráiler en un reproductor de YouTube incrustado.
 * - Si el estado de la película es "En cartelera", habilita la opción de compra de boletos, que se activa seleccionando un cine.
 * - Si no está disponible o es un estreno futuro, desactiva el botón de compra.
 * - Controla el popup para confirmar si el usuario desea ver el tráiler.
 * - Incluye un botón para regresar a la página de inicio.
 * 
 * @returns {void}
 * 
 * @example
 * // Ejemplo de uso:
 * displayMovieDetails(3, 'En cartelera');
 * // Muestra los detalles de la película con ID 3 que está en cartelera.
 */


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
                    <h1>Selección de cine</h1>
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
                            Ver tráiler
                        </button>
                    </div>
                    <div class="movie-inf">
                        <p class="genre">${movie.genero}</p>
                        <p class="description">${movie.sinopsis}</p>
                    </div>
                    <div class="cast">
                        <h3>Elenco</h3>
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
                            <h3>Cine</h3>
                            <div id="cinecampus" class="cinema-item">
                                <div>
                                    <p>Cine Campus</p>
                                    <p>Zona Franca Santander</p>
                                </div>
                                <img src="../storage/img//newLogo.webp" alt="Cinema logo">
                            </div>
                        </div>
                    <button id="book-now" onclick="displaySeatSelection(${movieId})" ${movieState !== 'En cartelera' ? 'disabled' : ''}>Comprar ahora</button>
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
                margin-right: 20px;
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

/**
 * Carga la API de YouTube para poder reproducir videos incrustados en la página.
 * 
 * @function loadYouTubeAPI
 * - Inserta un script dinámicamente en el documento para cargar la API de YouTube.
 * 
 * @returns {void}
 */

function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}


/**
 * Callback que indica cuando la API de YouTube está lista para ser usada.
 * 
 * @function onYouTubeIframeAPIReady
 * - Se llama automáticamente cuando la API de YouTube se ha cargado.
 * - Inicializa la consola con un mensaje para indicar que la API está lista.
 * 
 * @returns {void}
 */


let player;
function onYouTubeIframeAPIReady() {
    console.log("YouTube API is ready");
}


/**
 * Muestra un popup para confirmar si el usuario desea ver el tráiler.
 * 
 * @function showTrailerPopup
 * @param {string} trailerUrl - La URL del tráiler de YouTube que se mostrará.
 * - Hace visible el popup que contiene el mensaje de confirmación.
 * 
 * @returns {void}
 */

function showTrailerPopup(trailerUrl) {
    document.getElementById('trailer-popup').style.display = 'flex';
}

/**
 * Cierra el popup de confirmación del tráiler.
 * 
 * @function closeTrailerPopup
 * - Oculta el popup de confirmación.
 * 
 * @returns {void}
 */

function closeTrailerPopup() {
    document.getElementById('trailer-popup').style.display = 'none';
}

/**
 * Reproduce el tráiler en un reproductor incrustado de YouTube y oculta el banner de la película.
 * 
 * @function playTrailer
 * @param {string} trailerUrl - La URL del tráiler de YouTube.
 * - Cierra el popup de confirmación y muestra el reproductor de YouTube.
 * - Extrae el ID del video desde la URL del tráiler.
 * - Si ya existe un reproductor de YouTube, carga el video en él. De lo contrario, crea uno nuevo.
 * - Cambia el botón de ver tráiler a "Detener Trailer" para permitir detener la reproducción.
 * 
 * @returns {void}
 */

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

    trailerButton.textContent = 'Detener Trailer';
    trailerButton.onclick = stopTrailer;
}


/**
 * Callback que se ejecuta cuando el reproductor de YouTube está listo para reproducir el video.
 * 
 * @function onPlayerReady
 * @param {object} event - El evento que indica que el reproductor está listo.
 * - Inicia la reproducción automática del tráiler cuando el reproductor esté listo.
 * 
 * @returns {void}
 */


function onPlayerReady(event) {
    event.target.playVideo();
}


/**
 * Detiene la reproducción del tráiler y vuelve a mostrar el banner de la película.
 * 
 * @function stopTrailer
 * - Detiene el video del reproductor de YouTube y oculta el reproductor.
 * - Vuelve a mostrar el banner de la película y cambia el botón a "Ver tráiler".
 * 
 * @returns {void}
 */

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

/**
 * Recarga la página y vuelve al inicio.
 * 
 * @function goToHome
 * - Recarga la página actual.
 * 
 * @returns {void}
 */

function goToHome() {
    location.reload();
}








/**
 * Desplaza el slider de películas hasta la diapositiva especificada.
 *
 * @function scrollToSlide
 * - Utiliza el índice proporcionado para calcular el desplazamiento y moverse al slide correspondiente.
 * 
 * @param {number} index - Índice de la diapositiva a la que se debe desplazar el slider.
 * 
 * @returns {void}
 */




function scrollToSlide(index) {
    const slider = document.getElementById('movieSlider');
    const slideWidth = slider.offsetWidth;
    slider.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
    });
}


/**
 * Actualiza el punto activo en el slider según la diapositiva actual.
 *
 * @function updateActiveDot
 * - Activa el punto correspondiente a la diapositiva visible y desactiva los demás.
 * 
 * @param {number} index - Índice de la diapositiva actualmente visible.
 * 
 * @returns {void}
 */


function updateActiveDot(index) {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}


/**
 * Agrega un evento al slider para detectar el desplazamiento y actualizar los puntos activos.
 * 
 * @event movieSlider.scroll
 * - Detecta cuando el usuario desplaza el slider y actualiza los puntos activos.
 * 
 * @returns {void}
 */


// Evento para el slider de películas en cartelera
if (document.getElementById('movieSlider')) {
    document.getElementById('movieSlider').addEventListener('scroll', function() {
        const index = Math.round(this.scrollLeft / this.offsetWidth);
        updateActiveDot(index);
    });
}


/**
 * Evento ejecutado al cargar la página.
 * 
 * @event DOMContentLoaded
 * - Carga la información del usuario desde localStorage y asigna eventos de búsqueda.
 * 
 * @returns {void}
 */


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



/**
 * Muestra los resultados de la búsqueda en la interfaz.
 *
 * @function displaySearchResults
 * - Renderiza los resultados de la búsqueda en el contenedor principal.
 * 
 * @param {Array<Object>} movies - Lista de películas que coinciden con la búsqueda.
 * @param {string} query - Término de búsqueda utilizado.
 * 
 * @returns {void}
 */


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


/**
 * Realiza la búsqueda de películas y muestra los resultados.
 *
 * @async
 * @function fetchAndDisplaySearchResults
 * - Hace una solicitud a la API para obtener los resultados de búsqueda de películas.
 * 
 * @param {string} query - El término de búsqueda.
 * 
 * @returns {Promise<void>}
 */

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








/**
 * Muestra la selección de asientos para una película específica.
 * 
 * @async
 * @function displaySeatSelection
 * 
 * @param {string} movieId - El ID de la película para la cual se mostrarán los asientos disponibles.
 * 
 * @description
 * - Esta función realiza una solicitud a la API para obtener la información completa de una película específica y luego
 *   muestra la disposición de los asientos en función de los datos obtenidos.
 * - Si hay un error en la respuesta de la API, se maneja adecuadamente y se muestra en la consola.
 * - En caso de éxito, se generan los asientos según la disposición recibida y se aplican estilos dinámicos para su visualización.
 * - También permite seleccionar una acción (Reservar, Comprar Boleto o Cancelar) después de seleccionar los asientos.
 * 
 * @returns {void}
 */



async function displaySeatSelection(movieId) {
    await clearCache(); 
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
                margin-top: -10px;
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
                margin-top: 3%;

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

            .text-screen{
                font-size: 0.8rem;
                margin-top: -5%;
                margin-bottom: 10%;
            }

            .seat .seat-number {
                display: none;
            }

            .seat.selected .seat-number {
                display: block;
                font-size: 1rem;
                font-weight: bold;
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
                    <img src="../storage/img/onlyscreen.png" alt="screen">
                    <p class="text-screen">Pantalla de esta manera</p>
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
                            <span class="total-price">COP ${totalPrice.toFixed(2)}</span>
                    </div>
                    <button class="buy-btn" id="buyButton">Comprar boleto</button>
                </div>
            </div>
        `;

        document.body.innerHTML = seatSelectionHTML;
        addEventListeners(movieData);

        document.getElementById('buyButton').addEventListener('click', () => showPurchasePopup(movieId, movieData));


/**
 * Muestra una ventana emergente (popup) para confirmar la acción de compra o reserva de asientos.
 * 
 * @function showPurchasePopup
 * 
 * @param {string} movieId - El ID de la película seleccionada.
 * @param {object} movieData - Los datos completos de la película obtenidos desde la API.
 * 
 * @description
 * - Esta función crea y muestra una ventana emergente que permite al usuario decidir entre reservar o comprar boletos
 *   para los asientos seleccionados.
 * - Si no hay asientos seleccionados, se muestra un mensaje de error.
 * - La ventana emergente incluye botones que permiten al usuario realizar una acción o cancelar.
 * 
 * @returns {void}
 */


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
            document.getElementById('buyTicketButton').addEventListener('click', () => showOrderSummary(movieId, movieData, selectedSeats));
            document.getElementById('cancelButton').addEventListener('click', () => popup.remove());
        }


        /**
     * Procesa la reserva de los asientos seleccionados.
     * 
     * @async
     * @function handleReservation
     * 
     * @param {string} movieId - El ID de la película para la cual se realizará la reserva.
     * @param {object} movieData - Los datos completos de la película obtenidos desde la API.
     * @param {string} action - La acción a realizar, en este caso 'reserve'.
     * 
     * @description
     * - Esta función maneja la reserva de asientos para una película específica.
     * - Recopila la información de los asientos seleccionados y la proyección seleccionada (fecha y hora).
     * - Luego envía estos datos al servidor para crear una nueva reserva.
     * - Si la reserva se realiza correctamente, se muestra un mensaje de éxito y se redirige al usuario a la página de inicio.
     * - Si ocurre un error, se muestra un mensaje de error al usuario.
     * 
     * @returns {void}
     */

        async function handleReservation(movieId, movieData, action) {
            if (action !== 'reserve') {
                console.error('Acción no válida');
                return;
            }
        
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
                estado: 'reservada',
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
        
                createCustomPopup('Reserva realizada con éxito', 'success', 3000);   
                setTimeout(() => {
                    window.location.href = '../views/home.html';
                }, 3500);

                await clearCache();  // Limpiar la caché después de una reserva exitosa
                createCustomPopup('Reserva realizada con éxito', 'success', 3000);   
                setTimeout(() => {
                    window.location.href = '../views/home.html';
                }, 3500);

            } catch (error) {
                console.error('Error:', error);
                createCustomPopup('Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.', 'error');
            }
        }


/**
 * Obtiene la fecha seleccionada en la interfaz de usuario.
 * 
 * @function getSelectedDate
 * 
 * @description
 * - Esta función devuelve la fecha seleccionada actualmente por el usuario en la interfaz de usuario.
 * - Si no se ha seleccionado ninguna fecha, se devuelve la fecha de la primera proyección disponible.
 * 
 * @returns {string} - La fecha seleccionada o la primera fecha disponible.
 */


        function getSelectedDate() {
            const selectedDateBtn = document.querySelector('.date-btn.selected');
            return selectedDateBtn ? selectedDateBtn.dataset.date : movieData.proyecciones[0].horario.fecha_proyeccion;
        }

/**
 * Obtiene la proyección seleccionada en la interfaz de usuario.
 * 
 * @function getSelectedProjection
 * 
 * @description
 * - Esta función devuelve la proyección (fecha y hora) seleccionada actualmente por el usuario.
 * - Si no se ha seleccionado una hora, se devuelve la proyección correspondiente a la fecha seleccionada.
 * 
 * @returns {object} - El objeto de proyección seleccionado o el primero disponible.
 */

        function getSelectedProjection() {
            const selectedTimeBtn = document.querySelector('.time-btn.selected');
            const selectedDateBtn = document.querySelector('.date-btn.selected');
            return selectedTimeBtn
                ? movieData.proyecciones.find(p => p.horario.horario_proyeccion === selectedTimeBtn.dataset.time && p.horario.fecha_proyeccion === selectedDateBtn.dataset.date)
                : movieData.proyecciones.find(p => p.horario.fecha_proyeccion === getSelectedDate());
        }

/**
 * Genera el HTML para mostrar la disposición de los asientos en la sala de cine.
 * 
 * @function generateSeats
 * 
 * @param {Array} asientos - Un array de objetos que representan los asientos en la sala.
 * 
 * @description
 * - Esta función genera y devuelve el HTML necesario para mostrar los asientos en la sala de cine.
 * - Organiza los asientos por filas y les aplica estilos basados en su estado (disponible, reservado, ocupado).
 * 
 * @returns {string} - Una cadena de HTML que representa la disposición de los asientos.
 */

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
                                        <span class="seat-number">${seat.numero}</span>
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

/**
 * Devuelve el color de un asiento según su estado.
 * 
 * @function getSeatColor
 * 
 * @param {string} estado - El estado del asiento (disponible, reservado, ocupado).
 * 
 * @description
 * - Esta función determina el color de fondo que se debe aplicar a un asiento según su estado actual.
 * 
 * @returns {string} - Un valor de color en formato hexadecimal.
 */

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

/**
 * Crea y muestra una ventana emergente personalizada (popup).
 * 
 * @function createCustomPopup
 * 
 * @param {string} message - El mensaje que se mostrará en el popup.
 * @param {string} [type='info'] - El tipo de popup (puede ser 'info', 'error', 'success', etc.).
 * @param {number} [duration=null] - La duración en milisegundos después de la cual el popup se cerrará automáticamente. Si es `null`, el popup se cierra manualmente.
 * 
 * @description
 * - Esta función crea un popup en la página con el mensaje y el tipo especificados.
 * - Si se proporciona una duración, el popup se cierra automáticamente después de ese tiempo.
 * - Si no se proporciona una duración, el popup incluye un botón de "Cerrar" que permite al usuario cerrarlo manualmente.
 * 
 * @returns {void}
 */

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


        /**
 * Reinicia el precio total a 0.
 * 
 * @function resetTotalPrice
 * 
 * @description
 * - Esta función reinicia el precio total de la compra a 0 y actualiza el valor mostrado en la interfaz de usuario.
 * - Es útil cuando se actualizan los asientos seleccionados o cuando se cambia la fecha o la hora de la proyección.
 * 
 * @returns {void}
 */

        function resetTotalPrice() {
            totalPrice = 0;
            document.querySelector('.total-price').textContent = `COP ${totalPrice.toFixed(2)}`;
        }


/**
 * Genera botones de selección de fechas para las proyecciones de una película.
 * 
 * @function generateDateButtons
 * 
 * @param {Array} proyecciones - Un array de objetos de proyecciones que contienen información sobre las fechas y horas de las proyecciones.
 * 
 * @description
 * - Esta función crea botones de fecha basados en las fechas de proyección únicas disponibles en los datos.
 * - Cada botón representa una fecha y, por defecto, la primera fecha está seleccionada.
 * 
 * @returns {string} - Una cadena de HTML que contiene los botones de fecha.
 */


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

/**
 * Genera botones de selección de horarios para las proyecciones de una película.
 * 
 * @function generateTimeButtons
 * 
 * @param {Array} proyecciones - Un array de objetos de proyecciones que contienen información sobre los horarios y salas de las proyecciones.
 * 
 * @description
 * - Esta función crea botones de tiempo para seleccionar entre diferentes horarios de proyección.
 * - Cada botón incluye el horario, el precio y el tipo de sala, y por defecto, el primer horario está seleccionado.
 * 
 * @returns {string} - Una cadena de HTML que contiene los botones de horario.
 */



        function generateTimeButtons(proyecciones) {
            return proyecciones.map((proyeccion, index) => {
                const salaType = proyeccion.sala.tipo; 
                const price = proyeccion.horario.precio_pelicula;
                
                return `
                    <button class="time-btn ${index === 0 ? 'selected' : ''}" 
                            data-date="${proyeccion.horario.fecha_proyeccion}" 
                            data-time="${proyeccion.horario.horario_proyeccion}"
                            data-sala="${proyeccion.sala.id}">
                        <div class="time">${proyeccion.horario.horario_proyeccion}</div>
                        <div class="price">${price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} · ${salaType}</div>

                    </button>
                `;
            }).join('');
        }

/**
 * Añade listeners a los elementos interactivos en la selección de asientos y fechas/horarios.
 * 
 * @function addEventListeners
 * 
 * @param {object} movieData - Los datos completos de la película obtenidos desde la API.
 * 
 * @description
 * - Esta función añade eventos de clic a los asientos disponibles para permitir su selección y actualizar el precio total.
 * - También añade eventos a los botones de fecha y hora para actualizar las proyecciones y la disposición de los asientos según la selección.
 * - Resetea el precio total y actualiza la disponibilidad de asientos cuando se cambia la fecha o la hora.
 * 
 * @returns {void}
 */


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
        
                        document.querySelector('.total-price').textContent = `${totalPrice.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`;
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


/**
 * Actualiza los horarios disponibles según la fecha seleccionada.
 * 
 * @function updateAvailableTimes
 * 
 * @description
 * - Esta función filtra las proyecciones disponibles según la fecha seleccionada y genera botones de tiempo actualizados.
 * - También deselecciona todos los asientos y resetea el precio total cuando se actualiza el horario.
 * 
 * @returns {void}
 */


            function updateAvailableTimes() {
                const selectedDate = getSelectedDate();
                const filteredProjections = movieData.proyecciones.filter(p => p.horario.fecha_proyeccion === selectedDate);
            
                const timeSelector = document.querySelector('.time-selector');
                timeSelector.innerHTML = generateTimeButtons(filteredProjections);
            
                // Deseleccionar todos los asientos
                const selectedSeats = document.querySelectorAll('.seat.selected');
                selectedSeats.forEach(seat => seat.classList.remove('selected'));
            
                // Resetear el precio total
                resetTotalPrice();
            }


/**
 * Actualiza la disposición de asientos según la proyección seleccionada.
 * 
 * @function updateSeats
 * 
 * @description
 * - Esta función genera la disposición de asientos basándose en la proyección (fecha y hora) seleccionada.
 * - Luego añade los listeners necesarios para permitir la selección de asientos y actualiza el precio total.
 * 
 * @returns {void}
 */


            function updateSeats() {
                const selectedProjection = getSelectedProjection();
                const seatsContainer = document.querySelector('.seats');
                seatsContainer.innerHTML = generateSeats(selectedProjection.asientos);
                addEventListeners(movieData);
            
                // Resetear el precio total
                resetTotalPrice();
            }
        }

    } catch (error) {
        console.error('Error al cargar los datos de la película:', error);
    }
}

/**
 * Vuelve a la página de detalles de la película y limpia la caché.
 * 
 * @async
 * @function goBack
 * 
 * @param {string} movieId - El ID de la película a la que se desea volver.
 * @param {string} movieState - El estado actual de la película.
 * 
 * @description
 * - Esta función limpia la caché del navegador antes de volver a la página de detalles de la película.
 * - Útil para asegurarse de que se muestra información actualizada cuando se regresa a la página de detalles.
 * 
 * @returns {void}
 */

async function goBack(movieId, movieState) {
    await clearCache();  // Limpiar la caché antes de volver
    console.log('Volviendo a los detalles de la película con ID:', movieId, 'y estado:', movieState);
    displayMovieDetails(movieId, movieState);
}


/**
 * Limpia la caché del navegador.
 * 
 * @async
 * @function clearCache
 * 
 * @description
 * - Esta función elimina todos los caches disponibles en el navegador.
 * - Se asegura de que la información almacenada en caché no interfiera con la obtención de datos actualizados.
 * 
 * @returns {void}
 */

async function clearCache() {
    if ('caches' in window) {
        try {
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
            console.log('Cache limpiada exitosamente');
        } catch (error) {
            console.error('Error al limpiar la cache:', error);
        }
    }
}









/**
 * Muestra un resumen del pedido para la selección de película, fecha, hora y asientos.
 * 
 * @async
 * @function showOrderSummary
 * 
 * @param {string} movieId - El ID de la película seleccionada.
 * @param {object} movieData - Los datos completos de la película obtenidos desde la API.
 * @param {NodeList|Array} selectedSeats - Una colección de elementos DOM que representan los asientos seleccionados o un array de objetos asiento.
 * 
 * @description
 * - Esta función genera y muestra un resumen del pedido que incluye la fecha, hora, y asientos seleccionados, así como un desglose del precio total, incluyendo tarifas de servicio y descuentos aplicables.
 * - Si no se encuentra la proyección seleccionada en los datos de la película, se muestra un mensaje de error.
 * - El resumen incluye información del usuario actual (obtenida de `localStorage`), como su tarjeta VIP y métodos de pago disponibles.
 * - Calcula los precios de los asientos (regulares y VIP) y aplica un descuento si el usuario tiene una tarjeta VIP.
 * - Genera un número de orden aleatorio y crea la interfaz para seleccionar métodos de pago.
 * 
 * @returns {void}
 * 
 * @throws {Error} Si no se encuentra la proyección seleccionada, se muestra un mensaje de error en la consola y una alerta al usuario.
 * 
 */




async function showOrderSummary(movieId, movieData, selectedSeats) {
    const selectedDate = document.querySelector('.date-btn.selected').dataset.date;
    const selectedTime = document.querySelector('.time-btn.selected').dataset.time;
    const selectedProjection = movieData.proyecciones.find(p =>
        p.horario.fecha_proyeccion === selectedDate && p.horario.horario_proyeccion === selectedTime
    );

    if (!selectedProjection) {
        console.error('No se encontró la proyección seleccionada');
        alert('Error al cargar los detalles de la proyección');
        return;
    }

    const moviePrice = selectedProjection.horario.precio_pelicula;
    let regularSeats = [];
    let vipSeats = [];
    let seatNames = [];

    // Convertir selectedSeats a un array si no lo es
    const seatsArray = Array.isArray(selectedSeats) ? selectedSeats : Array.from(selectedSeats);

    seatsArray.forEach(seat => {
        const seatData = selectedProjection.asientos.find(s => s.id.toString() === seat.dataset.id);
        if (seatData) {
            seatNames.push(seatData.nombre_general);
            if (seatData.tipo === "Preferencial") {
                vipSeats.push(seatData);
            } else {
                regularSeats.push(seatData);
            }
        }
    });

    // Obtener la información del usuario actual desde localStorage
    const userInfo = JSON.parse(localStorage.getItem('usuarioActual'));
    
    // Obtener el porcentaje de descuento de la tarjeta VIP del usuario
    let vipDiscount = 0;
    let isVip = false;
    if (userInfo && userInfo.tarjeta_vip) {
        vipDiscount = userInfo.tarjeta_vip.porcentaje_descuento / 100;
        isVip = true;
    }

    let regularSeatPrice = regularSeats.length > 0 ? regularSeats[0].Precio + moviePrice : 0;
    let vipSeatPrice = vipSeats.length > 0 ? vipSeats[0].Precio + moviePrice : 0;

    // Calcular precios con y sin descuento
    const regularPriceNoDiscount = regularSeatPrice;
    const vipPriceNoDiscount = vipSeatPrice;

    // Aplicar descuento si el usuario tiene tarjeta VIP
    if (isVip) {
        regularSeatPrice *= (1 - vipDiscount);
        vipSeatPrice *= (1 - vipDiscount);
    }

    const totalRegularPrice = regularSeatPrice * regularSeats.length;
    const totalVipPrice = vipSeatPrice * vipSeats.length;
    const serviceFee = 1.99 * seatsArray.length;
    const totalPrice = totalRegularPrice + totalVipPrice + serviceFee;

    // Generar ORDER NUMBER
    const orderNumber = Math.floor(Math.random() * 100000000);

    // Generar HTML para los métodos de pago
    let paymentMethodsHTML = '';
    if (userInfo && userInfo.metodosPago && userInfo.metodosPago.length > 0) {
        paymentMethodsHTML = userInfo.metodosPago.map((method, index) => `
            <div class="payment-method-option">
                <label for="${method.nombre_tarjeta}">
                    <img src="${method.imagen_tarjeta}" alt="${method.nombre_tarjeta}">
                    <div class="union">
                    <span class="tarjet-name">${method.nombre_tarjeta} </span>
                    <span class="number-tarjet">**** **** ${method.numero_tarjeta.slice(-8)}</span>
                    </div>
                    <input type="radio" id="${method.nombre_tarjeta}" name="payment-method" value="${method.nombre_tarjeta}" ${index === 0 ? 'checked' : ''}>
                </label>
            </div>
        `).join('');
    } else {
        paymentMethodsHTML = '<p>No se encontraron métodos de pago</p>';
    }

    const styleElement = document.createElement('style');
    styleElement.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
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

        .movie-details-container4part {
            background-color: #121212;
            padding: 20px;
            width: 100%;
            margin: 0 auto;
        }

        .movie-header4 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            margin-top: 5%;
        }

        .back-button2, .more-options {
            width: 24px;
            height: 24px;
            cursor: pointer;
        }

        h1 {
            font-size: 20px;
            font-weight: bold;
        }

        .movie-information {
            display: flex;
            margin-bottom: 20px;
        }

        .movie-image {
            width: 100px;
            height: 35vw;
            margin-left: 6%;
            border-radius: 10px;
            object-fit: cover;
        }

        .movie-details h2 {
            font-size: 18px;
            margin-bottom: 5px;
            color:red;
        }


        .order-details p {
            font-size: 3.6vw;
            margin-bottom: 10px;
        }

    .payment-method h3 {
        font-size: 16px;
        margin-bottom: 15px;
        color: #ffffff;
        margin-top: 8%;
    }

.payment-method-option {
    background-color: #2a2a2a;
    border-radius: 10px;
    height: 70px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 80vw;
    border: 1px solid #b9b9b994;
}

    .payment-method-option label {
        display: flex;
        align-items: center;
        width: 100%;
        cursor: pointer;
    }

    .payment-method-option img {
        width: 70px;
        height: 50px;
        margin-right: 15px;
        border-radius: 10px;
    }



    .payment-method-option input[type="radio"] {
        appearance: none;
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid #ffffff;
        outline: none;
        margin-left: auto;
    }

    .payment-method-option input[type="radio"]:checked {
        background-color: #e50914;
        border-color: #e50914;
    }

    .payment-method-option input[type="radio"]:checked::before {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        background-color: #ffffff;
        border-radius: 50%;
        margin: 3px auto;
    }

        .buy-ticket-btn {
            background-color: #e50914;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
            height: 12vw;
            margin-top: 20px;
        }

        .buy-ticket-btn:hover {
            background-color: #f40612;
        }

        .order-summary{
            margin-top: 12%;
        }

        .movie-details{
            margin-left: 8%;
        }

        .cine-campus{
        margin-top: 20%;
        margin-bottom: 5%;
        color: white;
        font-weight: bold;
        }

        .genero{
            font-size: 0.9rem;
            color: gray;
        }
        
        .fecha{
            color: gray;
            font-size: 0.9rem;
        }

        .order-details{
            margin: 7% 10%;
        }

        .union{
            display: flex;
            flex-direction: column;
        }

        tarjet-name{
            font-size: 1.1rem;
        font-weight: bold;
        }

        .line {
            margin-top: -3%;
            margin-bottom: 6%;
        }

        .number-tarjet{
            font-size: 0.8rem;
            font-weight: bold;
            margin-top: 5%;
        }
        

        .movie-details-containerpay {
            width: 100%;
        }

        .order-details {
            font-family: Arial, sans-serif;
            color: #fff;
        }

        .flex-row {
            display: flex;
            justify-content: space-between;
        }

        .timer-display {
        background-color: rgba(66, 10, 10, 0.8); /* Dark red with some transparency */
        color: white;
        width: 80vw;
        padding: 10px 15px;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-weight: normal;
        box-sizing: border-box;
        margin-top: 5%;
        margin-bottom: 10%;
        }

        #time {
        font-weight: bold;
        color: #ff0000; /* Bright red for the timer */
        }

        .popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .popup-content {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            text-align: center;
        }

        #close-popup {
            margin-top: 10px;
            padding: 5px 10px;
            background-color: #FE0000;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }

    `;

    // Añade el estilo al documento
    document.head.appendChild(styleElement);

    const orderSummaryHTML = `
        <div class="movie-details-container4part">
            <div class="movie-header4">
                <img src="../storage/img/arrow.png" alt="Back" class="back-button2" onclick="goBack(${movieId}, '${movieData.pelicula.estado}')">
                <h1>Resumen de Pedido</h1>
                <img src="../storage/img/points.png" alt="More options" class="more-options">
            </div>
            <div class="order-summary">
                <div class="movie-information">
                    <img src="${movieData.pelicula.imagen_pelicula}" alt="${movieData.pelicula.titulo}" class="movie-image">
                    <div class="movie-details">
                        <h2>${movieData.pelicula.titulo}</h2>
                        <p class="genero">${movieData.pelicula.genero}</p>
                        <p class="cine-campus">CINE CAMPUS</p>
                        <p class="fecha">${formatearFecha(selectedDate)}, ${selectedTime}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="movie-details-containerpay">
            <div class="order-details">
                <p>NÚMERO DE ORDEN: ${orderNumber}</p>

                <p class="line">________________________________________</p>

                <div class="flex-row">
                    <p>${seatsArray.length} BOLETO(S):</p>
                    <p>${seatNames.join(', ')}</p>
                </div>

                <p class="line">________________________________________</p>

                ${regularSeats.length > 0 ? `
                    <div class="flex-row">
                        <p>ASIENTO REGULAR${vipDiscount > 0 ? ` (${vipDiscount * 100}% Descuento VIP Aplicado)` : ''}:</p>
                        <p>${regularSeatPrice.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} x ${regularSeats.length}</p>
                    </div>` : ''}

                ${vipSeats.length > 0 ? `
                    <div class="flex-row">
                        <p>ASIENTO VIP${vipDiscount > 0 ? ` (${vipDiscount * 100}% Descuento VIP Aplicado)` : ''}:</p>
                        <p>${vipSeatPrice.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} x ${vipSeats.length}</p>
                    </div>` : ''}

                <p class="line">________________________________________</p>

                <div class="flex-row">
                    <p>CARGO POR SERVICIO:</p>
                    <p>${serviceFee.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                </div>

                <p class="line">________________________________________</p>

                <div class="flex-row">
                    <p>TOTAL:</p>
                    <p>${totalPrice.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                </div>

                <p class="line">________________________________________</p>

                <div class="payment-method">
                    <h3 class="Payment">Método de pago</h3>
                    <div id="payment-methods-container">
                        ${paymentMethodsHTML}
                    </div>
                </div>
                    <div class="timer-display">
                    <span id="message">Complete su pago en</span>
                    <span id="time"></span>
                    </div>

                <button class="buy-ticket-btn">Comprar boleto</button>
            </div>

                        <div id="expiration-popup" class="popup" style="display:none;">
                <div class="popup-content">
                    <h2>Tiempo Expirado</h2>
                    <p>El tiempo para completar el pago ha expirado.</p>
                    <button id="close-popup">Aceptar</button>
                </div>
            </div>
        </div>
    `;

    document.body.innerHTML = orderSummaryHTML;

    const timerDisplay = document.querySelector('.timer-display');
    const timerDuration = 15 * 60; // 15 minutos
    const timerId = startTimer(timerDuration, timerDisplay);

    document.querySelector('.buy-ticket-btn').addEventListener('click', async () => {
        const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked');
        if (selectedPaymentMethod) {
            clearInterval(timerId);
            await handleTicketPurchase(movieId, movieData, seatsArray, selectedPaymentMethod.value, orderNumber, totalPrice, selectedProjection);
        } else {
            alert('Por favor, selecciona un método de pago');
        }
    });
}

/**
 * Formatea una fecha en formato `dd/mm/yyyy` a un formato más legible.
 * 
 * @function formatearFecha
 * @param {string} fecha - La fecha en formato `dd/mm/yyyy`.
 * @returns {string} - La fecha formateada como `Día, dd Mes yyyy`.
 * 
 * @example
 * formatearFecha('27/08/2024'); // "Mar, 27 Ago 2024"
 */


function formatearFecha(fecha) {
    const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    const [dia, mes, anio] = fecha.split('/');
    const fechaObj = new Date(anio, mes - 1, dia);
    
    return `${diasSemana[fechaObj.getDay()]}, ${dia} ${meses[fechaObj.getMonth()]} ${anio}`;
}

/**
 * Inicia un temporizador que cuenta regresivamente desde una duración especificada.
 * 
 * @function startTimer
 * @param {number} duration - La duración del temporizador en segundos.
 * @param {HTMLElement} display - El elemento DOM donde se mostrará el tiempo restante.
 * @returns {number} - El identificador del intervalo, que puede usarse para detener el temporizador.
 * 
 * @example
 * const display = document.querySelector('#time-display');
 * startTimer(300, display); // Inicia un temporizador de 5 minutos.
 */



function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    return setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.querySelector('#time').textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(this);
            showExpirationPopup();
        }
    }, 1000);
}

/**
 * Muestra un popup de expiración cuando el temporizador llega a cero.
 * 
 * @function showExpirationPopup
 * 
 * @example
 * showExpirationPopup(); // Muestra el popup de expiración.
 */


function showExpirationPopup() {
    const popup = document.getElementById('expiration-popup');
    popup.style.display = 'flex';

    document.getElementById('close-popup').addEventListener('click', function() {
        popup.style.display = 'none';
        window.location.href = '../views/home.html';
    });
}


/**
 * Gestiona el proceso de compra de boletos, incluyendo la generación del código de barras y el almacenamiento de los datos de la compra.
 * 
 * @async
 * @function handleTicketPurchase
 * 
 * @param {string} movieId - El ID de la película seleccionada.
 * @param {object} movieData - Los datos completos de la película.
 * @param {NodeList|Array} selectedSeats - Una colección de elementos DOM que representan los asientos seleccionados o un array de objetos asiento.
 * @param {string} paymentMethod - El método de pago seleccionado por el usuario.
 * @param {number} orderNumber - El número de orden generado para la compra.
 * @param {number} totalPrice - El precio total de la compra.
 * @param {object} selectedProjection - Los detalles de la proyección seleccionada.
 * 
 * @description
 * - La función realiza la compra del boleto, enviando los datos al servidor.
 * - Genera un código de barras que se incluye en los detalles de la compra.
 * - Si la compra es exitosa, muestra un mensaje de confirmación y un resumen del boleto comprado.
 * 
 * @returns {void}
 * 
 * @throws {Error} Si ocurre un error durante el proceso de compra, se muestra un mensaje de error.
 * 
 * @example
 * handleTicketPurchase('12345', movieData, selectedSeats, 'tarjeta', 987654, 50000, selectedProjection);
 */


async function handleTicketPurchase(movieId, movieData, selectedSeats, paymentMethod, orderNumber, totalPrice, selectedProjection) {
    const userInfo = JSON.parse(localStorage.getItem('usuarioActual'));

    if (!selectedProjection || !selectedProjection.horario) {
        console.error('No se encontró la proyección seleccionada o falta información del horario');
        alert('Error al procesar la compra. Faltan datos de la proyección.');
        return;
    }

    const purchaseData = {
        id: orderNumber,
        id_pelicula: movieId,
        id_horario_proyeccion: selectedProjection.horario.id,
        id_usuario: userInfo.id,
        asientos_comprados: selectedSeats.map(seat => parseInt(seat.dataset.id)),
        modo_compra: "virtual",
        fecha_compra: new Date().toLocaleDateString('en-US'),
        total: totalPrice,
        metodo_pago: "tarjeta de crédito",
        id_reserva: null,
        estado_compra: "completada"
    };

    // Generar el código de barras
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, orderNumber.toString(), {
        format: "CODE128",
        width: 2,
        height: 100,
        displayValue: false 
    });

    // Convertir el canvas a una cadena base64
    const barcodeBase64 = canvas.toDataURL("image/png");

    // Añadir el código de barras a purchaseData
    purchaseData.barcode = barcodeBase64;

    try {
        const response = await fetch('/api/boletos/confirmacion-compra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchaseData),
        });
    
        if (response.ok) {
            const result = await response.json();
            
            // Crear y mostrar el popup
            const popup = document.createElement('div');
            popup.className = 'exito-compra';
            popup.textContent = 'Compra realizada con éxito';
            document.body.appendChild(popup);
    
            // Eliminar el popup después de 3 segundos
            setTimeout(() => {
                document.body.removeChild(popup);
            }, 3000);
            
            // Mostrar el ticket
            await showTicketDetails(purchaseData, movieData, movieId);
        } else {
            alert('Error al realizar la compra');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al procesar la compra');
    }

    
/**
 * Vuelve a la pantalla de detalles de la película.
 * 
 * @function goBack
 * @param {string} movieId - El ID de la película.
 * @param {string} movieState - El estado actual de la película.
 * 
 * @example
 * goBack('12345', 'playing'); // Vuelve a los detalles de la película con ID 12345.
 */



    function goBack(movieId, movieState) {
        console.log('Volviendo a los detalles de la película con ID:', movieId, 'y estado:', movieState);
        displayMovieDetails(movieId, movieState);
    }






async function showTicketDetails(purchaseData, movieData, movieId) {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #000;
            color: #fff;
        }

        .movie-header5 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            margin-top: 10%;
        }

        .header {
            background-color: #111;
            padding: 10px;
        }
        .header_content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .header_content img {
            width: 24px;
            height: 24px;
        }

        .card {
            display: flex;
            flex-direction: column;
            background-color: #fff;
            /* width: 300px; */
            border-radius: 10px;
            margin: 8vw;
            padding: 20px;
            color: black;
            margin-top: 10px;
        }

        .back-button2, .more-options {
            width: 24px;
            height: 24px;
            cursor: pointer;
            margin-left: 9%;
            margin-right: 6%;
        }


        .card_img img {
            width: 100%;
            border-radius: 10px;
            height: 15vh;
        }
        .card_title h1 {
            font-size: 24px;
            margin-bottom: 5px;
            margin-top: 2%;
        }
        .card_title p {
            color: #888;
        }
        .card_content, .card_boxes, .card_boxes1, .card_boxes2 {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }
        .card_right img {
            width: 50px;
            border-radius: 10px;
        }
        .line img {
            width: 100%;
            margin: 20px 0;
        }
        .barras img {
            width: 100%;
            height: 8vh;
            margin-top: -10%;
        }
            
        .color-gray {
            color: gray;
        }

        .titulo-ticket{
            font-size: 1.2rem;
        }

        .card_time{
            margin-right: 20%;
        }

        .card_seat{
            margin-right: 3%;
        }

        .card_order{
            margin-right: 8%;
        }


        .liner{
            color: #D9D9D9;
            margin-top: 4%;
        }

        .exito-compra {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            border-radius: 5px;
            z-index: 1000;
            text-align: center;
            font-size: 18px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
    `;
    document.head.appendChild(styleElement);

 
        const ticketHTML = `
        <div class="movie-header5">
            <img src="../storage/img/arrow.png" alt="Back" class="back-button2" onclick="goBack(${movieId}, '${movieData.pelicula.estado}')">
            <h1>Resumen de Pedido</h1>
            <img src="../storage/img/points.png" alt="More options" class="more-options">
        </div>
        <section class="card">
            <div class="card_img">
                <img src="${movieData.pelicula.imagen_banner}" alt="${movieData.pelicula.titulo}">
            </div>
            <div class="card_title">
                <h2 class="titulo-ticket">${movieData.pelicula.titulo}</h2>
                <p>Muestra este boleto en la entrada.</p>
            </div>
            <p class="liner">________________________________</p>
            <div class="card_content">
                <div class="card_left">
                    <h1 class="color-gray">Cine</h1>
                    <h2>Cine Campus</h2>
                </div>
                <div class="card_right">
                    <img src="../storage/img/newLogo.webp" alt="">
                </div>
            </div>
            <div class="card_boxes">
                <div class="card_date">
                    <h1 class="color-gray">Día</h1>
                    <h2>${formatearFecha(movieData.proyecciones.find(p => p.horario.id === purchaseData.id_horario_proyeccion)?.horario.fecha_proyeccion || 'N/A')}</h2>
                </div>
                <div class="card_time">
                    <h1 class="color-gray">Hora</h1>
                    <h2>${movieData.proyecciones.find(p => p.horario.id === purchaseData.id_horario_proyeccion)?.horario.horario_proyeccion || 'N/A'}</h2>
                </div>
            </div>
            <div class="card_boxes1">
                <div class="card_cinema">
                    <h1 class="color-gray">Sala #</h1>
                    <h2>${movieData.proyecciones.find(p => p.horario.id === purchaseData.id_horario_proyeccion)?.sala.nombre || 'N/A'}</h2>
                </div>
                <div class="card_seat">
                    <h1 class="color-gray">Asiento(s)</h1>
                    <h2>${purchaseData.asientos_comprados.map(id => 
                        movieData.proyecciones.find(p => p.horario.id === purchaseData.id_horario_proyeccion)?.asientos.find(a => a.id === id)?.nombre_general
                    ).join(', ')}</h2>
                </div>
            </div>
            <div class="card_boxes2">
                <div class="card_cost">
                    <h1 class="color-gray">Costo</h1>
                    <h2>$${purchaseData.total.toLocaleString('es-CO')}</h2>
                </div>
                <div class="card_order">
                    <h1 class="color-gray">ID Orden</h1>
                    <h2>${purchaseData.id}</h2>
                </div>
            </div>
            <div class="line">
                <img src="../storage/img/Line.svg" alt="line">
            </div>
            <div class="barras">
                <img src="${purchaseData.barcode}" alt="Código de barras">
            </div>
        </section>
    `;


    document.body.innerHTML = ticketHTML;
}

/**
 * Formatea una fecha en formato `dd/mm/yyyy` a un formato más legible.
 * 
 * @function formatearFecha
 * @param {string} fechaString - La fecha en formato `dd/mm/yyyy`.
 * @returns {string} - La fecha formateada como `Día, dd Mes yyyy`.
 * 
 * @example
 * formatearFecha('27/08/2024'); // "Mar, 27 Ago 2024"
 */


function formatearFecha(fechaString) {
    const [dia, mes, año] = fechaString.split('/');
    const fecha = new Date(año, mes - 1, dia); 
    const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    const diaSemana = diasSemana[fecha.getDay()];
    const diaNum = fecha.getDate();
    const mesNombre = meses[fecha.getMonth()];
    const añoNum = fecha.getFullYear();
    
    return `${diaSemana}, ${diaNum} ${mesNombre} ${añoNum}`;
}
function goBack(movieId, movieState) {
    console.log('Volviendo a los detalles de la película con ID:', movieId, 'y estado:', movieState);
    displayMovieDetails(movieId, movieState);
}
}