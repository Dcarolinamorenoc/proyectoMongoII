document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorPopup = document.getElementById('errorPopup');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log('Intentando iniciar sesión con:', username, password);

        fetch('/api/consultar-todos?nickname=FelixCB&identificacion=1098672134&rol')
            .then(response => response.json())
            .then(data => {
                console.log('Datos recibidos de la API:', data);

                if (!data.usuarios || !Array.isArray(data.usuarios)) {
                    console.error('La respuesta de la API no contiene un array de usuarios:', data);
                    showErrorPopup('Error en el formato de datos');
                    return;
                }

                const user = data.usuarios.find(u => 
                    u.nickname.toLowerCase() === username.toLowerCase() && 
                    u.identificacion === password
                );

                console.log('Usuario encontrado:', user);

                if (user) {
                    if (user.rol === 'Administrador') {
                        console.log('Inicio de sesión exitoso como administrador');
                        window.location.href = '/views/registrar.html';
                    } else {
                        console.log('Usuario no es administrador');
                        showErrorPopup('No tienes permisos de administrador');
                    }
                } else {
                    console.log('Usuario no encontrado');
                    showErrorPopup('Usuario o contraseña incorrectos');
                }
            })
            .catch(error => {
                console.error('Error al hacer la solicitud:', error);
                showErrorPopup('Error de conexión');
            });
    });

    function showErrorPopup(message) {
        errorPopup.textContent = message;
        errorPopup.style.display = 'block';
        setTimeout(() => {
            errorPopup.style.display = 'none';
        }, 3000);
    }
});