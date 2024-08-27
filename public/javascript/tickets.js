document.addEventListener('DOMContentLoaded', async () => {
    const userInfo = JSON.parse(localStorage.getItem('usuarioActual'));
    
    if (!userInfo) {
        console.error('No se encontró información del usuario');
        return;
    }
    try {
        const response = await fetch(`/api/boletos/usuario/${userInfo.id}`);
        if (!response.ok) {
            throw new Error('Error al obtener los boletos');
        }
        const boletos = await response.json();

        const boletosContainer = document.getElementById('boletos-container');
        boletosContainer.innerHTML = ''; 

        boletos.forEach(boleto => {
            const boletoElement = createBoletoElement(boleto);
            boletosContainer.appendChild(boletoElement);
        });
    } catch (error) {
        console.error('Error:', error);

    }
});

function createBoletoElement(boleto) {
    const mainBox = document.createElement('div');
    mainBox.className = 'main_box';

    mainBox.innerHTML = `
        <div class="main_box_img">
            <img src="${boleto.pelicula.imagen_pelicula}" alt="${boleto.pelicula.titulo}">
            <button class="main_button">${boleto.estado_compra}</button>
        </div>
        <div class="main_box_content">
            <h1 class="titulo_boletico">${boleto.pelicula.titulo}</h1>
            <p>ID Boleto: ${boleto.id_boleto}</p>
            <p>Fecha de compra: ${boleto.fecha_compra}</p>
            <p>Asientos: ${boleto.asientos_comprados.join(', ')}</p>
            <p>Fecha proyección: ${boleto.fecha_proyeccion}</p>
            <p>Hora: ${boleto.horario_proyeccion}</p>
            <p>Total: $${boleto.total}</p>
        </div>
    `;

    const imgElement = mainBox.querySelector('.main_box_img img');
    imgElement.addEventListener('click', () => showFullTicketDetails(boleto));

    return mainBox;
}

function goToHome() {
    window.location.href = 'home.html';
}

function showFullTicketDetails(boleto) {
    // Crear el elemento de estilo
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
            <img src="../storage/img/arrow.png" alt="Back" class="back-button2" onclick="goBackToTickets()">
            <h1>Resumen de Pedido</h1>
            <img src="../storage/img/points.png" alt="More options" class="more-options">
        </div>
        <section class="card">
            <div class="card_img">
                <img src="${boleto.pelicula.imagen_banner}" alt="${boleto.pelicula.titulo}">
            </div>
            <div class="card_title">
                <h2 class="titulo-ticket">${boleto.pelicula.titulo}</h2>
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
                    <h2>${formatearFecha(boleto.fecha_proyeccion)}</h2>
                </div>
                <div class="card_time">
                    <h1 class="color-gray">Hora</h1>
                    <h2>${boleto.horario_proyeccion}</h2>
                </div>
            </div>
            <div class="card_boxes1">
                <div class="card_cinema">
                    <h1 class="color-gray">Sala #</h1>
                    <h2>${boleto.sala || 'N/A'}</h2>
                </div>
                <div class="card_seat">
                    <h1 class="color-gray">Asiento(s)</h1>
                    <h2>${boleto.asientos_comprados.join(', ')}</h2>
                </div>
            </div>
            <div class="card_boxes2">
                <div class="card_cost">
                    <h1 class="color-gray">Costo</h1>
                    <h2>$${boleto.total.toLocaleString('es-CO')}</h2>
                </div>
                <div class="card_order">
                    <h1 class="color-gray">ID Orden</h1>
                    <h2>${boleto.id_boleto}</h2>
                </div>
            </div>
            <div class="line">
                <img src="../storage/img/Line.svg" alt="line">
            </div>
            <div class="barras">
                <img src="${generateBarcode(boleto.id_boleto)}" alt="Código de barras">
            </div>
        </section>
    `;

    document.body.innerHTML = ticketHTML;
}

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

function generateBarcode(idBoleto) {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, idBoleto, {
        format: "CODE128",
        width: 2,
        height: 100,
        displayValue: false
    });
    return canvas.toDataURL("image/png");
}

function goBackToTickets() {
    location.reload(); // Esto recargará la página, volviendo a la lista de boletos
}