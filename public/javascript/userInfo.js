document.addEventListener('DOMContentLoaded', () => {
    const userInfo = JSON.parse(localStorage.getItem('usuarioActual'));

    if (userInfo) {
        fetchUserInfo(userInfo.nombre);
    } else {
        console.error('No se encontró información del usuario en localStorage');
    }
});

function fetchUserInfo(nombreCompleto) {
    const apiUrl = `http://localhost:5001/api/consultar-todos?nickname=FelixCB&identificacion=1098672134&rol`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.usuarios && data.usuarios.length > 0) {
                const user = data.usuarios.find(u => u.nombre_completo === nombreCompleto);
                if (user) {
                    updateUserInterface(user);
                    fetchVipCardInfo(user.id);
                } else {
                    console.error('No se encontró el usuario en la respuesta de la API');
                }
            } else {
                console.error('No se encontró información de usuarios en la respuesta de la API');
            }
        })
        .catch(error => console.error('Error al obtener datos del usuario:', error));
}

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
    user.metodo_pago.forEach(method => {
        const methodElement = document.createElement('div');
        methodElement.className = 'payment-method';
        methodElement.innerHTML = `
            <h4>${method.nombre_tarjeta}</h4>
            <p>Número: ${method.numero_tarjeta}</p>
            <img src="${method.imagen_tarjeta}" alt="${method.nombre_tarjeta}">
        `;
        paymentMethodsContainer.appendChild(methodElement);
    });
}

function fetchVipCardInfo(userId) {
    // Simula una llamada a la API para obtener la información de la tarjeta VIP
    // Reemplaza esto con tu llamada real a la API cuando esté disponible
    setTimeout(() => {
        const vipCardInfo = {
            id: 1,
            id_usuario: userId,
            numero: "VIP001",
            porcentaje_descuento: 15,
            fecha_expiracion: "31/12/2024",
            estado: "activa",
            tarjeta_img: "https://i.pinimg.com/736x/a4/dc/ab/a4dcab9932c9e10f2f7efd77c022a979.jpg"
        };
        updateVipCardInfo(vipCardInfo);
    }, 500);
}

function updateVipCardInfo(vipCard) {
    const vipCardContainer = document.getElementById('vipCardContainer');
    if (vipCard) {
        document.getElementById('vipCardImage').src = vipCard.tarjeta_img;
        document.getElementById('vipNumber').textContent = vipCard.numero;
        document.getElementById('vipDiscount').textContent = vipCard.porcentaje_descuento;
        document.getElementById('vipExpiration').textContent = vipCard.fecha_expiracion;
        document.getElementById('vipStatus').textContent = vipCard.estado;
        vipCardContainer.style.display = 'block';
    } else {
        vipCardContainer.style.display = 'none';
    }
}