
// const slider = document.querySelector('.movie-slider');
// let isDown = false;
// let startX;
// let scrollLeft;

// slider.addEventListener('mousedown', (e) => {
//   isDown = true;
//   slider.classList.add('active');
//   startX = e.pageX - slider.offsetLeft;
//   scrollLeft = slider.scrollLeft;
// });

// slider.addEventListener('mouseleave', () => {
//   isDown = false;
//   slider.classList.remove('active');
// });

// slider.addEventListener('mouseup', () => {
//   isDown = false;
//   slider.classList.remove('active');
// });

// slider.addEventListener('mousemove', (e) => {
//   if(!isDown) return;
//   e.preventDefault();
//   const x = e.pageX - slider.offsetLeft;
//   const walk = (x - startX) * 3;
//   slider.scrollLeft = scrollLeft - walk;
// });


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