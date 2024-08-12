document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#loginForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nickname = document.querySelector('#username').value;
        const identificacion = document.querySelector('#password').value;

        try {
            const url = 'http://localhost:5001/api/usuario/consultar-todos?nickname=FelixCB&identificacion=1098672134&rol';

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
                    // Guardar la información del usuario en localStorage
                    localStorage.setItem('usuarioActual', JSON.stringify({
                        nombre: usuarioEncontrado.nombre_completo,
                        imagen: usuarioEncontrado.imagen
                    }));

                    window.location.href = './views/home.html';
                } else {
                    alert('Usuario o contraseña incorrectos');
                }
            } else {
                alert('No se pudo obtener la lista de usuarios');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al intentar iniciar sesión');
        }
    });
});