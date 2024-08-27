document.addEventListener('DOMContentLoaded', () => {
  const userInfo = JSON.parse(localStorage.getItem('usuarioActual'));

  if (userInfo) {
      // Actualizar la imagen del usuario
      const avatarImg = document.querySelector('.avatar');
      avatarImg.src = userInfo.imagen;
      avatarImg.alt = `${userInfo.nombre}'s Avatar`;

      // Actualizar el nombre del usuario
      const userNameSpan = document.querySelector('.user-info span');
      userNameSpan.textContent = `Hi, ${userInfo.nombre}!`;
  } else {
      console.error('No se encontró información del usuario');
  }
});