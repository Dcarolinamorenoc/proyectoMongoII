/**
 * Maneja la carga inicial de la página y recupera la información del usuario desde el almacenamiento local.
 * 
 * @function
 */

document.addEventListener('DOMContentLoaded', () => {
    const userInfo = JSON.parse(localStorage.getItem('usuarioActual'));
    if (userInfo) {
        fetchUserInfo(userInfo.nombre);
    } else {
        console.error('No se encontró información del usuario en localStorage');
    }
});


/**
 * Obtiene la información del usuario desde la API y actualiza la interfaz de usuario.
 * 
 * @param {string} nombreCompleto - El nombre completo del usuario para buscar en la respuesta de la API.
 * 
 * @function
 */


function fetchUserInfo(nombreCompleto) {
    const apiUrl = `/api/consultar-todos?nickname=FelixCB&identificacion=1098672134&rol`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.usuarios && data.usuarios.length > 0) {
                const user = data.usuarios.find(u => u.nombre_completo === nombreCompleto);
                if (user) {
                    updateUserInterface(user);
                } else {
                    console.error('No se encontró el usuario en la respuesta de la API');
                }
            } else {
                console.error('No se encontró información de usuarios en la respuesta de la API');
            }
        })
        .catch(error => console.error('Error al obtener datos del usuario:', error));
}

/**
 * Actualiza la interfaz de usuario con la información del usuario.
 * 
 * @param {Object} user - El objeto que contiene los datos del usuario.
 * @param {string} user.imagen_user - URL de la imagen del usuario.
 * @param {string} user.nickname - Apodo del usuario.
 * @param {string} user.id - ID del usuario.
 * @param {string} user.rol - Rol del usuario (por ejemplo, 'Administrador').
 * @param {string} user.nombre_completo - Nombre completo del usuario.
 * @param {string} user.identificacion - Identificación del usuario.
 * @param {string} user.celular - Número de celular del usuario.
 * @param {string} user.telefono - Número de teléfono del usuario.
 * @param {string} user.email - Correo electrónico del usuario.
 * @param {Array<Object>} user.metodo_pago - Métodos de pago asociados al usuario.
 * @param {Object} user.tarjeta_vip - Información de la tarjeta VIP del usuario.
 * 
 * @function
 */

function updateUserInterface(user) {
    document.getElementById('userImage').src = user.imagen_user;
    document.getElementById('nickname').textContent = user.nickname;
    document.getElementById('userId').textContent = user.id;
    document.getElementById('userRole').textContent = user.rol;
    document.getElementById('fullName').textContent = user.nombre_completo;
    document.getElementById('identification').textContent = user.identificacion;
    document.getElementById('cellphone').textContent = user.celular;
    document.getElementById('phone').textContent = user.telefono;
    document.getElementById('email').textContent = user.email;

    const paymentMethodsContainer = document.getElementById('paymentMethodsContainer');
    paymentMethodsContainer.innerHTML = ''; // Limpiar contenedor antes de agregar nuevos métodos

    if (user.rol === 'Administrador') {
        paymentMethodsContainer.innerHTML = '<p>Como administrador, no tienes métodos de pago asociados.</p>';
    } else {
        user.metodo_pago.forEach(method => {
            const methodElement = document.createElement('div');
            methodElement.className = 'payment-method';
            methodElement.innerHTML = `
                <h4>${method.nombre_tarjeta}</h4>
                <p class="payment-method-number">Número: ${method.numero_tarjeta}</p>
                <img src="${method.imagen_tarjeta}" alt="${method.nombre_tarjeta}">
            `;
            paymentMethodsContainer.appendChild(methodElement);
        });
    }

    // Actualizar información de la tarjeta VIP
    const vipCardContainer = document.getElementById('vipCardContainer');
    if (user.rol === 'Administrador') {
        vipCardContainer.innerHTML = '<h3>Tarjeta VIP</h3><p>Como administrador, no tienes una tarjeta VIP asociada.</p>';
        
    } else if (user.tarjeta_vip && user.tarjeta_vip.id) {
        vipCardContainer.innerHTML = `
            <h3>Tarjeta VIP</h3>
            <img id="vipCardImage" src="${user.tarjeta_vip.tarjeta_img}" alt="Tarjeta VIP" class="vip-card-image">
            <p><strong>Número:</strong> <span id="vipNumber">${user.tarjeta_vip.numero}</span></p>
            <p><strong>Porcentaje Descuento:</strong> <span id="vipDiscount">${user.tarjeta_vip.porcentaje_descuento}</span>%</p>
            <p><strong>Fecha expiración:</strong> <span id="vipExpiration">${user.tarjeta_vip.fecha_expiracion}</span></p>
            <p><strong>Estado:</strong> <span id="vipStatus">${user.tarjeta_vip.estado}</span></p>
        `;
    } else {
        vipCardContainer.innerHTML = `
            <h3>Tarjeta VIP</h3>
            <p>${user.tarjeta_vip && user.tarjeta_vip.mensaje ? user.tarjeta_vip.mensaje : "Querido usuario, no tienes una tarjeta VIP pero puedes adquirir una."}</p>
            <img src="../storage/img/vipaccess.png" alt="Adquiere tu tarjeta VIP" class="no-vip-image">
        `;
    }
    vipCardContainer.style.display = 'block';
}