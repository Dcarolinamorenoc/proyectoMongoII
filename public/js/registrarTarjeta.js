document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tarjetaVipForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const usuarioInput = document.getElementById('usuarioInput').value;

            const datosTarjetaVip = {};
            if (usuarioInput.startsWith('id:')) {
                datosTarjetaVip.id_usuario = parseInt(usuarioInput.slice(3));
            } else if (usuarioInput.match(/^\d+$/)) {
                datosTarjetaVip.identificacion = usuarioInput;
            } else {
                datosTarjetaVip.nickname = usuarioInput;
            }

            try {
                const response = await fetch('/api/usuarios/tarjeta-vip', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(datosTarjetaVip),
                });

                const data = await response.json();

                if (response.ok) {
                    showPopup(`Tarjeta VIP creada con éxito. Número: ${data.numero}`);
                } else {
                    showPopup(`Error: ${data.error}`);
                }
            } catch (error) {
                showPopup(`Error de conexión: ${error.message}`);
            }
        });
    } else {
        console.error('El formulario con id "tarjetaVipForm" no se encontró en el DOM');
    }
});

function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');
    if (popup && popupMessage) {
        popupMessage.textContent = message;
        popup.style.display = 'block';
    } else {
        console.error('Elementos del popup no encontrados');
    }
}

function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'none';
    }
}