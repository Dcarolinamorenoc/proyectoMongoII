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

    return mainBox;
}

function goToHome() {
    window.location.href = 'home.html';
}