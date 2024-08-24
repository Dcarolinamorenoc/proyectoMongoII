/**
 * Espera a que el DOM esté completamente cargado antes de ejecutar cualquier lógica.
 * Configura los manejadores de eventos y controla el flujo de inicio de sesión.
 * 
 * @function
 */


document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorPopup = document.getElementById('errorPopup');

        /**
     * Maneja el evento de envío del formulario de inicio de sesión.
     * Previene el comportamiento por defecto del formulario, captura los valores de nombre de usuario y contraseña,
     * e intenta validar las credenciales con la API.
     * 
     * @event submit
     * @param {Event} e - El evento de envío del formulario.
     */

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log('Intentando iniciar sesión con:', username, password);

            /**
         * Realiza una solicitud GET a la API para obtener la lista de usuarios y verifica las credenciales.
         * 
         * @function fetch
         * @param {string} url - La URL a la que se realiza la solicitud.
         * @returns {Promise} - La promesa que resuelve los datos recibidos de la API.
         */

        fetch('/api/consultar-todos?nickname=FelixCB&identificacion=1098672134&rol')
            .then(response => response.json())
            .then(data => {
                console.log('Datos recibidos de la API:', data);

                if (!data.usuarios || !Array.isArray(data.usuarios)) {
                    console.error('La respuesta de la API no contiene un array de usuarios:', data);
                    showErrorPopup('Error en el formato de datos');
                    return;
                }

                /**
                 * Busca un usuario en la lista de usuarios obtenidos que coincida con el nombre de usuario y contraseña proporcionados.
                 * 
                 * @function find
                 * @param {Object} u - Objeto usuario en la lista.
                 * @returns {Object|undefined} - Devuelve el usuario encontrado o `undefined` si no se encuentra.
                 */


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

    /**
     * Muestra un popup de error con un mensaje específico y lo oculta después de 3 segundos.
     * 
     * @function showErrorPopup
     * @param {string} message - El mensaje de error a mostrar en el popup.
     */

    function showErrorPopup(message) {
        errorPopup.textContent = message;
        errorPopup.style.display = 'block';
        setTimeout(() => {
            errorPopup.style.display = 'none';
        }, 3000);
    }
});