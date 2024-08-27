document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const closePopup = document.querySelector('.close');

    const tarjetasImagenes = {
        'Visa': 'https://i.pinimg.com/736x/ec/69/18/ec69182974fa21bb0a2c36b511c01cf1.jpg',
        'Mastercard': 'https://i.pinimg.com/736x/b9/58/5f/b9585f2d6d5cc9d88a526bc9a1752f58.jpg',
        'Diners Club': 'https://i.pinimg.com/736x/d0/3c/a8/d03ca8633853502fb51315367546962d.jpg',
        'American Express': 'https://i.pinimg.com/736x/c3/11/95/c31195d8db60946aa24fe6024220e3ac.jpg'
    };

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());


        userData.metodo_pago = [];
        for (let i = 0; i < 3; i++) {
            const nombreTarjeta = userData[`nombre_tarjeta_${i}`];
            const numeroTarjeta = userData[`numero_tarjeta_${i}`];
            if (nombreTarjeta && numeroTarjeta) {
                const imagenTarjeta = tarjetasImagenes[nombreTarjeta] || '';
                userData.metodo_pago.push({
                    nombre_tarjeta: nombreTarjeta,
                    numero_tarjeta: numeroTarjeta,
                    imagen_tarjeta: imagenTarjeta
                });
            }
            delete userData[`nombre_tarjeta_${i}`];
            delete userData[`numero_tarjeta_${i}`];
        }


        if (userData.metodo_pago.length === 0) {
            showPopup('Debe proporcionar al menos un método de pago.');
            return;
        }


        userData.id = parseInt(userData.id);

        console.log('Datos a enviar:', userData);

        fetch('/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            console.log('Respuesta del servidor:', response);
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos:', data);
            if (data.error) {
                showPopup(data.error);
            } else {
                showPopup(data.mensaje || 'Usuario creado con éxito');
                form.reset();
            }
        })
        .catch(error => {
            console.error('Error en la petición:', error);
            showPopup('Error al registrar el usuario: ' + error.message);
        });
    });

    function showPopup(message) {
        popupMessage.textContent = message;
        popup.style.display = 'block';
    }

    closePopup.onclick = function() {
        popup.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    }
});