document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#loginForm');
    const errorPopup = document.getElementById('errorPopup');

    function showErrorPopup(message) {
        errorPopup.querySelector('p').textContent = message;
        errorPopup.style.display = 'block';
        setTimeout(() => {
            errorPopup.style.display = 'none';
        }, 3000);
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nickname = document.querySelector('#username').value;
        const identificacion = document.querySelector('#password').value;

        try {
            const url = '/api/consultar-todos?nickname=FelixCB&identificacion=1098672134&rol';

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (response.ok && result.usuarios && result.usuarios.length > 0) {
                const usuarioEncontrado = result.usuarios.find(u => u.nickname === nickname && u.identificacion === identificacion);

                if (usuarioEncontrado) {
                    localStorage.setItem('usuarioActual', JSON.stringify({
                        nombre: usuarioEncontrado.nombre_completo,
                        imagen: usuarioEncontrado.imagen_user
                    }));

                    window.location.href = './views/home.html';
                } else {
                    showErrorPopup('Usuario o contraseña incorrectos');
                }
            } else {
                showErrorPopup('No se pudo obtener la lista de usuarios');
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorPopup('Ocurrió un error al intentar iniciar sesión');
        }
    });
});