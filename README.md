# Integrante:

```
-Diana Carolina Moreno Cárdenas
```



─────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀─────



### Proyecto: CineCampus

#### Problemtica

CineCampus es una empresa de entretenimiento que se especializa en ofrecer una experiencia de cine completa y personalizada. La empresa desea desarrollar una aplicación web que permita a los usuarios seleccionar películas, comprar boletos y asignar asientos de manera eficiente y cómoda. La aplicación también ofrecerá opciones de descuento para usuarios con tarjeta VIP y permitirá realizar compras en línea.

#### Objetivo

Desarrollar una serie de APIs para la aplicación web de CineCampus utilizando MongoDB como base de datos. Las APIs deberán gestionar la selección de películas, la compra de boletos, la asignación de asientos, y la implementación de descuentos para tarjetas VIP, con soporte para diferentes roles de usuario.



─────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀─────



### Instalaciones necesarias

```
npm install mongodb
```



#### Ejecutar desde consola el proyecto

```
npm run dev
```



─────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀─────



#### Requisitos Funcionales

1. ### **Selección de Películas:**
   
   ★ **API para Listar Películas:** Permitir la consulta de todas las películas disponibles en el catálogo, con detalles como título, género, duración y horarios de proyección.
   
   
   
   Este caso de uso puede ser aplicado a los siguientes usuarios: Administrador, Estandar o VIP 
   Los siguientes ejemplos toman de referencia a un usuario de diferente Rol, sin embargo si queremos hacerlo con otros diferentes al Final del Readme podremos encontrarlos
   
   EJEMPLO:
   
   Usuario VIP 2:
   
   user: "CarolinaM"
   pwd: "1087654321"
   
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   
   
   **listarPeliculas():** Lista todas las películas disponibles. 
   
   ***Parámetros:*** Traer todas las peliculas disponibles, es decir las que estan con estado en Cartelera y con proximo estreno 
   
   Cuando se ejecuta esto :
   
   ```js
   let objPelicula = new pelicula();
   
   console.log(await objPelicula.listarPeliculas());
   
   objPelicula.destructor();
   ```
   
   En consola obtendremos una respuesta como esta:
   
   ```js
   [
     {
       id: 1,
       titulo: 'Intensamente 2',
       sinopsis: 'Riley, ahora adolescente, enfrenta nuevos desafíos emocionales mientras sus emociones se adaptan a cambios en su mente.',
       fecha_estreno: '14/06/2024',
       genero: 'Animación',
       duracion: '107 minutos',
       estado: 'En cartelera',
       pais_origen: 'Estados Unidos',
       horarios_proyeccion: [ [Object], [Object], [Object] ]
     },
     {
       id: 2,
       titulo: 'Mi villano favorito 4',
       sinopsis: 'Gru y su familia se embarcan en una nueva aventura llena de travesuras y desafíos inesperados.',
       fecha_estreno: '03/07/2024',
       genero: 'Animación',
       duracion: '90 minutos',
       estado: 'En cartelera',
       pais_origen: 'Estados Unidos',
       horarios_proyeccion: [ [Object], [Object], [Object] ]
     },
     {
       id: 3,
       titulo: 'Deadpool & Wolverine',
       sinopsis: 'Deadpool se une a Wolverine en una aventura irreverente que atraviesa el multiverso Marvel.',
       fecha_estreno: '26/07/2024',
       genero: 'Acción',
       duracion: '124 minutos',
       estado: 'En cartelera',
       pais_origen: 'Estados Unidos',
       horarios_proyeccion: [ [Object], [Object], [Object] ]
     },
     {
       id: 4,
       titulo: 'Inmaculada',
       sinopsis: 'Una joven novicia enfrenta fuerzas sobrenaturales en un convento aislado en Italia.',
       fecha_estreno: '22/03/2024',
       genero: 'Terror',
       duracion: '89 minutos',
       estado: 'En cartelera',
       pais_origen: 'Estados Unidos',
       horarios_proyeccion: [ [Object], [Object], [Object] ]
     },
     {
       id: 5,
       titulo: 'Tornados',
       sinopsis: 'Un grupo de cazadores de tormentas se enfrenta al tornado más devastador de la historia.',
       fecha_estreno: '19/04/2024',
       genero: 'Acción',
       duracion: '110 minutos',
       estado: 'En cartelera',
       pais_origen: 'Estados Unidos',
       horarios_proyeccion: [ [Object], [Object], [Object] ]
     },
     {
       id: 6,
       titulo: 'Bad Boys: Ride or Die',
       sinopsis: 'Mike Lowrey y Marcus Burnett regresan para una última misión llena de acción y comedia.',
       fecha_estreno: '07/06/2024',
       genero: 'Acción',
       duracion: '118 minutos',
       estado: 'En cartelera',
       pais_origen: 'Estados Unidos',
       horarios_proyeccion: [ [Object], [Object], [Object] ]
     },
     {
       id: 7,
       titulo: 'Escucha como todo comenzó',
       sinopsis: 'La historia del origen de la música hip-hop y sus pioneros en el Bronx de los años 70.',
       fecha_estreno: '09/02/2024',
       genero: 'Drama musical',
       duracion: '135 minutos',
       estado: 'En cartelera',
       pais_origen: 'Estados Unidos',
       horarios_proyeccion: [ [Object], [Object], [Object] ]
     },
     {
       id: 8,
       titulo: 'Coraline',
       sinopsis: 'Remake live-action del clásico de animación sobre una niña que descubre una realidad alternativa siniestra.',
       fecha_estreno: '25/10/2024',
       genero: 'Fantasía',
       duracion: '100 minutos',
       estado: 'Próximo estreno',
       pais_origen: 'Estados Unidos',
       horarios_proyeccion: [ [Object], [Object], [Object] ]
     },
     {
       id: 9,
       titulo: 'Masacre en el tren',
       sinopsis: 'Un viaje en tren se convierte en una pesadilla cuando un asesino comienza a atacar a los pasajeros.',
       fecha_estreno: '13/09/2024',
       genero: 'Terror',
       duracion: '95 minutos',
       estado: 'Próximo estreno',
       pais_origen: 'Reino Unido',
       horarios_proyeccion: [ [Object], [Object], [Object] ]
     },
     {
       id: 10,
       titulo: 'Herencia Siniestra',
       sinopsis: 'Una familia hereda una mansión antigua, solo para descubrir que viene con un terrible secreto sobrenatural.',
       fecha_estreno: '01/11/2024',
       genero: 'Terror',
       duracion: '112 minutos',
       estado: 'Próximo estreno',
       pais_origen: 'Estados Unidos',
       horarios_proyeccion: [ [Object], [Object], [Object] ]
     }
   ]
   ```
   
   
   
   ★ **API para Listar Películas:** Permitir la consulta de todas las películas disponibles en el catálogo, con detalles como título, género, duración y horarios de proyección.
   
   Este caso de uso puede ser aplicado a los siguientes usuarios: Administrador, Estandar o VIP 
   Los siguientes ejemplos toman de referencia a un usuario de diferente Rol, sin embargo si queremos hacerlo con otros diferentes al Final del Readme podremos encontrarlos
   
   EJEMPLO:
   
   Usuario VIP 2:
   
   user: "CarolinaM"
   pwd: "1087654321"
   
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   
   
   **obtenerDetallesPelicula(titulo):** Obtiene los detalles de una película específica por su título. ***Parámetro:*** El título de la película a consultar 
   
   Cuando se ejecuta esto con el título de la película que queremos consultar
   
   ```js
   let objPelicula = new pelicula();
   
   console.log(await objPelicula.obtenerDetallesPelicula("Intensamente 2"));
   
   objPelicula.destructor();
   ```
   
   En consola obtendremos una respuesta como esta:
   
   ```js
   {
     id: 1,
     titulo: 'Intensamente 2',
     sinopsis: 'Riley, ahora adolescente, enfrenta nuevos desafíos emocionales mientras sus emociones se adaptan a cambios en su mente.',
     fecha_estreno: '14/06/2024',
     genero: 'Animación',
     duracion: '107 minutos',
     estado: 'En cartelera',
     pais_origen: 'Estados Unidos',
     horarios_proyeccion: [
       {
         fecha_proyeccion: '14/06/2024',
         horario_proyeccion: '14:00',
         hora_finalizacion: '15:47',
         id_sala: 1,
         precio_pelicula: 15000
       },
       {
         fecha_proyeccion: '14/06/2024',
         horario_proyeccion: '18:30',
         hora_finalizacion: '20:17',
         id_sala: 2,
         precio_pelicula: 15000
       },
       {
         fecha_proyeccion: '15/06/2024',
         horario_proyeccion: '16:00',
         hora_finalizacion: '17:47',
         id_sala: 3,
         precio_pelicula: 15000
       }
     ]
   }
   ```
   
   en caso de no ser encontrada la pelicula por su nombre :
   
   ```js
   let objPelicula = new pelicula();
   
   console.log(await objPelicula.obtenerDetallesPelicula("Tom y Jerry"));
   
   objPelicula.destructor();
   ```
   
   devolvera lo siguiente en consola:
   
   ```js
   { error: 'No se encontró una película con el ID o título Tom y Jerry' }
   ```
   
   
   
   **obtenerDetallesPelicula(id):** Obtiene los detalles de una película específica por su ID.
   
    ***Parámetro:*** El ID de la película a consultar 
   
   Cuando se ejecuta esto con el ID de la película que queremos consultar:
   
   ```js
   let objPelicula = new pelicula();
   
   console.log(await objPelicula.obtenerDetallesPelicula(2));
   
   objPelicula.destructor();
   ```
   
   En consola obtendremos una respuesta como esta:
   
   ```js
   {
     id: 2,
     titulo: 'Mi villano favorito 4',
     sinopsis: 'Gru y su familia se embarcan en una nueva aventura llena de travesuras y desafíos inesperados.',
     fecha_estreno: '03/07/2024',
     genero: 'Animación',
     duracion: '90 minutos',
     estado: 'En cartelera',
     pais_origen: 'Estados Unidos',
     horarios_proyeccion: [
       {
         fecha_proyeccion: '03/07/2024',
         horario_proyeccion: '15:00',
         hora_finalizacion: '16:30',
         id_sala: 1,
         precio_pelicula: 15000
       },
       {
         fecha_proyeccion: '03/07/2024',
         horario_proyeccion: '19:00',
         hora_finalizacion: '20:30',
         id_sala: 2,
         precio_pelicula: 15000
       },
       {
         fecha_proyeccion: '04/07/2024',
         horario_proyeccion: '17:30',
         hora_finalizacion: '19:00',
         id_sala: 3,
         precio_pelicula: 15000
       }
     ]
   }
   ```
   
   en caso de no ser encontrada la pelicula por su id :
   
   ```js
   let objPelicula = new pelicula();
   
   console.log(await objPelicula.obtenerDetallesPelicula("56"));
   
   objPelicula.destructor();
   ```
   
   devolvera lo siguiente en consola:
   
   ```js
   { error: 'No se encontró una película con el ID o título 56' }
   ```
   
   
   
   
   ☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆
   
   
   
2. ### **Compra de Boletos:**
   
   ★ **API para Comprar Boletos:** Permitir la compra de boletos para una película específica, incluyendo la selección de la fecha y la hora de la proyección.
   
   
   
   Este caso de uso puede ser aplicado a los siguientes usuarios: Administrador, Estandar o VIP 
   Los siguientes ejemplos toman de referencia a un usuario de diferente Rol, sin embargo si queremos hacerlo con otros diferentes al Final del Readme podremos encontrarlos
   
   EJEMPLO:
   
   Usuario VIP 2:
   
   user: "CarolinaM"
   pwd: "1087654321"
   
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   
   
   **comprarBoletos(datosBoleto):** Realiza la compra de boletos para una película.
   
   ***Parámetros:*** Un objeto con los siguientes datos:
   
   - id: Identificador único del boleto
   - id_pelicula: Identificador de la película
   - id_horario_proyeccion: Identificador del horario de proyección
   - id_usuario: Identificador del usuario que realiza la compra
   - asientos_comprados: Array con los números de asientos seleccionados
   - modo_compra: Modo de compra ("virtual" o "presencial")
   - metodo_pago: Método de pago utilizado
   - id_reserva: Identificador de la reserva (si aplica o si no un null)
   
   
   
   Cuando se ejecuta esto para un usuario VIP:
   
   ```js
   let objBoleto = new boleto();
   
   const datosBoleto = {
       id: 15,
       id_pelicula: 1,
       id_horario_proyeccion: 1,
       id_usuario: 1,
       asientos_comprados: [48,49], 
       modo_compra: "virtual",
       metodo_pago: "tarjeta de crédito",
       id_reserva: null
   };
   
   console.log(await objBoleto.comprarBoletos(datosBoleto));
   
   objBoleto.destructor();
   ```
   
   en consola obtendremos (si es un usuario VIP)
   
   ```js
   {
     mensaje: 'Compra realizada con éxito',
     detallesBoleto: {
       id: 15,
       id_pelicula: 1,
       id_horario_proyeccion: 1,
       id_usuario: 1,
       asientos_comprados: [ 48, 49 ],
       modo_compra: 'virtual',
       metodo_pago: 'tarjeta de crédito',
       id_reserva: 1,
       total: 25500,
       descuento_aplicado: 15,
       fecha_compra: '27/7/2024',
       estado_compra: 'completada',
       _id: new ObjectId('66a5a3b52d66d18e8ad19c33')
     }
   }
   ```
   
   en caso de que sea un usuario estandar 
   
   ```js
   let objBoleto = new boleto();
   
   const datosBoleto = {
       id: 19,
       id_pelicula: 6,
       id_horario_proyeccion: 1,
       id_usuario: 1,
       asientos_comprados: [46,45], 
       modo_compra: "virtual",
       metodo_pago: "tarjeta de crédito",
       id_reserva: null
   };
   
   console.log(await objBoleto.comprarBoletos(datosBoleto));
   
   objBoleto.destructor();
   ```
   
   obtendremos en consola:
   
   ```js
   {
     mensaje: 'Compra realizada con éxito',
     detallesBoleto: {
       id: 18,
       id_pelicula: 1,
       id_horario_proyeccion: 1,
       id_usuario: 7,
       asientos_comprados: [ 46, 45 ],
       modo_compra: 'virtual',
       metodo_pago: 'tarjeta de crédito',
       id_reserva: 1,
       total: 30000,
       descuento_aplicado: 0,
       fecha_compra: '27/7/2024',
       estado_compra: 'completada',
       _id: new ObjectId('66a5a41e6f0a78eee96779b4')
     }
   }
   ```
   
   En caso de que un asiento o ambos esten ocupados 
   
   ```js
   let objBoleto = new boleto();
   
   const datosBoleto = {
       id: 16,
       id_pelicula: 1,
       id_horario_proyeccion: 1,
       id_usuario: 1,
       asientos_comprados: [1,49], 
       modo_compra: "virtual",
       metodo_pago: "tarjeta de crédito",
       id_reserva: 1
   };
   
   console.log(await objBoleto.comprarBoletos(datosBoleto));
   
   objBoleto.destructor();
   ```
   
   devolvera un mensaje como este 
   
   ```js
   {
     error: 'Error al realizar la compra: Uno o más asientos seleccionados no están disponibles.'
   }
   ```
   
   y si la pelicula ya salio de cartelera
   
   ```js
   let objBoleto = new boleto();
   
   const datosBoleto = {
       id: 16,
       id_pelicula: 11,
       id_horario_proyeccion: 1,
       id_usuario: 1,
       asientos_comprados: [1,49], 
       modo_compra: "virtual",
       metodo_pago: "tarjeta de crédito",
       id_reserva: 1
   };
   
   console.log(await objBoleto.comprarBoletos(datosBoleto));
   
   objBoleto.destructor();
   ```
   
   devolvera en consola lo siguiente:
   
   ```js
   {
     error: 'Error al realizar la compra: La película no existe o no está disponible para compra de boletos.'
   }
   ```
   
   
   
   
   
   ★ **API para Verificar Disponibilidad de Asientos:** Permitir la consulta de la disponibilidad de asientos en una sala para una proyección específica.
   
   Este caso de uso puede ser aplicado a los siguientes usuarios: Administrador, Estandar o VIP 
   Los siguientes ejemplos toman de referencia a un usuario de diferente Rol, sin embargo si queremos hacerlo con otros diferentes al Final del Readme podremos encontrarlos
   
   EJEMPLO:
   
   Usuario VIP 2:
   
   user: "CarolinaM"
   pwd: "1087654321"
   
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   
   
   **consultarDisponibilidadAsientos(id_sala):** Consulta la disponibilidad de asientos en una sala específica.
   
   ***Parámetros:*** El identificador de la sala a consultar.
   
   Cuando se ejecuta esto:
   
   ```js
   let objBoleto = new boleto();
   
   console.log(await objBoleto.consultarDisponibilidadAsientos(1));
   
   objBoleto.destructor();
   ```
   
   obtendremos en consola un resultado como este:
   
   ```js
   {
     idHorarioProyeccion: 1,
     fechaProyeccion: '14/06/2024',
     horarioProyeccion: '14:00',
     idSala: 1,
     nombreSala: 'Sala 1',
     capacidadTotal: 25,
     asientosDisponibles: 19,
     asientos: [
       {
         id: 31,
         nombre: 'F5',
         fila: 'F',
         numero: 5,
         tipo: 'estándar',
         estado: 'disponible'
       },
       {
         id: 32,
         nombre: 'F6',
         fila: 'F',
         numero: 6,
         tipo: 'estándar',
         estado: 'disponible'
       },
       {
         id: 33,
         nombre: 'G1',
         fila: 'G',
         numero: 1,
         tipo: 'estándar',
         estado: 'disponible'
       },
       {
         id: 34,
         nombre: 'G2',
         fila: 'G',
         numero: 2,
         tipo: 'estándar',
         estado: 'disponible'
       },
       {
         id: 35,
         nombre: 'G3',
         fila: 'G',
         numero: 3,
         tipo: 'estándar',
         estado: 'disponible'
       },
       {
         id: 36,
         nombre: 'G4',
         fila: 'G',
         numero: 4,
         tipo: 'estándar',
         estado: 'disponible'
       },
       {
         id: 37,
         nombre: 'G5',
         fila: 'G',
         numero: 5,
         tipo: 'estándar',
         estado: 'disponible'
       },
       {
         id: 38,
         nombre: 'G6',
         fila: 'G',
         numero: 6,
         tipo: 'estándar',
         estado: 'disponible'
       },
       {
         id: 39,
         nombre: 'H1',
         fila: 'H',
         numero: 1,
         tipo: 'reclinable',
         estado: 'disponible'
       },
       {
         id: 40,
         nombre: 'H2',
         fila: 'H',
         numero: 2,
         tipo: 'reclinable',
         estado: 'disponible'
       },
       {
         id: 41,
         nombre: 'H3',
         fila: 'H',
         numero: 3,
         tipo: 'reclinable',
         estado: 'disponible'
       },
       {
         id: 42,
         nombre: 'H4',
         fila: 'H',
         numero: 4,
         tipo: 'reclinable',
         estado: 'disponible'
       },
       {
         id: 43,
         nombre: 'H5',
         fila: 'H',
         numero: 5,
         tipo: 'reclinable',
         estado: 'disponible'
       },
       {
         id: 44,
         nombre: 'H6',
         fila: 'H',
         numero: 6,
         tipo: 'reclinable',
         estado: 'disponible'
       },
       {
         id: 45,
         nombre: 'I1',
         fila: 'I',
         numero: 1,
         tipo: 'VIP',
         estado: 'disponible'
       },
       {
         id: 46,
         nombre: 'I2',
         fila: 'I',
         numero: 2,
         tipo: 'VIP',
         estado: 'disponible'
       },
       {
         id: 47,
         nombre: 'I3',
         fila: 'I',
         numero: 3,
         tipo: 'VIP',
         estado: 'disponible'
       },
       {
         id: 48,
         nombre: 'I4',
         fila: 'I',
         numero: 4,
         tipo: 'VIP',
         estado: 'disponible'
       },
       {
         id: 49,
         nombre: 'I5',
         fila: 'I',
         numero: 5,
         tipo: 'VIP',
         estado: 'disponible'
       }
     ]
   }
   ```
   
   En caso de que el horario de proyeccion no exista
   
   ```js
   let objBoleto = new boleto();
   
   console.log(await objBoleto.consultarDisponibilidadAsientos(50));
   
   objBoleto.destructor();
   ```
   
   obtendremos en consola lo siguiente:
   
   ```js
   {
     error: 'Error al consultar disponibilidad de asientos: Horario de proyección no encontrado.'
   }
   ```
   
   
   
   
   ☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆
   
   
   
3. ### **Asignación de Asientos:**
   
   ★ **API para Reservar Asientos:** Permitir la selección y reserva de asientos para una proyección específica.
   
   
   
   Este caso de uso puede ser aplicado a los siguientes usuarios: Administrador, Estandar o VIP 
   Los siguientes ejemplos toman de referencia a un usuario de diferente Rol, sin embargo si queremos hacerlo con otros diferentes al Final del Readme podremos encontrarlos
   
   EJEMPLO:
   
   Usuario VIP 2:
   
   user: "CarolinaM"
   pwd: "1087654321"
   
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   
   
   **reservarAsientos(datosReserva):** Realiza la reserva de asientos para una película. 
   
   ##### Parámetros: Un objeto con los siguientes datos: 
   
   - id: Identificador único de la reserva 
   - id_pelicula: Identificador de la película 
   - id_horario_proyeccion: Identificador del horario de proyección 
   - id_usuario: Identificador del usuario que realiza la reserva 
   - asientos_reservados: Array con los números de asientos a reservar 
   
   Cuando se ejecuta esto:
   
   ```js
   let objReserva = new reserva();
   
   const datosReserva = {
       id: 7,
       id_pelicula: 1,
       id_horario_proyeccion: 2,
       id_usuario: 2,
       asientos_reservados: [60, 61],
   };
   
   console.log(await objReserva.reservarAsientos(datosReserva));
   
   objReserva.destructor();
   ```
   
   en consola sale
   
   ```js
   {
     mensaje: 'Reserva realizada con éxito',
     detallesReserva: {
       id: 7,
       id_pelicula: 1,
       id_horario_proyeccion: 2,
       id_usuario: 2,
       asientos_reservados: [ 60, 61 ],
       fecha_reserva: '27/07/2024',
       estado: 'activa',
       fecha_expiracion: '30/07/2024',
       _id: new ObjectId('66a5cd8273195fe75a8f4ce8')
     }
   }
   ```
   
   Cuando ya hay un asiento ocupado o ambos 
   
   ```js
   let objReserva = new reserva();
   
   const datosReserva = {
       id: 8,
       id_pelicula: 1,
       id_horario_proyeccion: 2,
       id_usuario: 2,
       asientos_reservados: [6, 61],
   };
   
   console.log(await objReserva.reservarAsientos(datosReserva));
   
   objReserva.destructor();
   ```
   
   en la consola sale
   
   ```js
   {
     error: 'Error al realizar la reserva: Uno o más asientos seleccionados no pertenecen a la sala de esta proyección.'
   }
   ```
   
   y finalmente si el horario de proyeccion no coincide con la pelicula 
   
   ```js
   let objReserva = new reserva();
   
   const datosReserva = {
       id: 8,
       id_pelicula: 1,
       id_horario_proyeccion: 12,
       id_usuario: 2,
       asientos_reservados: [6, 61],
   };
   
   console.log(await objReserva.reservarAsientos(datosReserva));
   
   objReserva.destructor();
   ```
   
   devuelve en consola lo siguiente
   
   ```js
   {
     error: 'Error al realizar la reserva: El horario de proyección no es válido para esta película.'
   }
   ```
   
   
   
   ★ **API para Cancelar Reserva de Asientos:** Permitir la cancelación de una reserva de asiento ya realizada.
   
   
   
   Este caso de uso puede ser aplicado a los siguientes usuarios: Administrador, Estandar o VIP 
   Los siguientes ejemplos toman de referencia a un usuario de diferente Rol, sin embargo si queremos hacerlo con otros diferentes al Final del Readme podremos encontrarlos
   
   EJEMPLO:
   
   Usuario VIP 2:
   
   user: "CarolinaM"
   pwd: "1087654321"
   
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   
   
   **cancelarReserva(datosCancelacion):**  Cancela parcial o totalmente una reserva de asientos.
   
   ***Parámetros:*** Un objeto con los siguientes datos:
   
   - id: Identificador único de la reserva
   - id_pelicula: Identificador de la película
   - id_horario_proyeccion: Identificador del horario de proyección
   - id_usuario: Identificador del usuario que realiza la cancelación
   - asientos_reservados: Array con los números de asientos a cancelar
   
   Cuando se ejecuta esto para una cancelación parcial:
   
   ```js
   let objReserva = new reserva();
   
   const datosCancelacionParcial = {
       id: 7,
       id_pelicula: 1,
       id_horario_proyeccion: 2,
       id_usuario: 2,
       asientos_reservados: [60],
   };
   
   console.log(await objReserva.cancelarReserva(datosCancelacionParcial));
   
   objReserva.destructor();
   ```
   
   en consola obtenemos un resultado como este
   
   ```js
   {
     mensaje: 'Reserva actualizada con éxito',
     detallesReserva: {
       _id: new ObjectId('66a5d4e48ea73424d56c022b'),
       id: 7,
       id_pelicula: 1,
       id_horario_proyeccion: 2,
       id_usuario: 2,
       asientos_reservados: [ 60 ],
       fecha_reserva: '28/07/2024',
       estado: 'activa',
       fecha_expiracion: '31/07/2024'
     }
   }
   ```
   
   En caso de cancelación total de todos los asientos ejecutamos lo siguiente:
   
   ```js
   let objReserva = new reserva();
   
   const datosCancelacionParcial = {
       id: 7,
       id_pelicula: 1,
       id_horario_proyeccion: 2,
       id_usuario: 2,
       asientos_reservados: [],
   };
   
   console.log(await objReserva.cancelarReserva(datosCancelacionParcial));
   
   objReserva.destructor();
   ```
   
   en consola sale lo siguiente
   
   ```js
   {
     mensaje: 'Reserva cancelada con éxito',
     detallesReserva: {
       _id: new ObjectId('66a5d4e48ea73424d56c022b'),
       id: 7,
       id_pelicula: 1,
       id_horario_proyeccion: 2,
       id_usuario: 2,
       asientos_reservados: [],
       fecha_reserva: '28/07/2024',
       estado: 'cancelada',
       fecha_expiracion: '31/07/2024'
     }
   }
   ```
   
   y en caso de que otro usuario quiera modificar la reserva:
   
   ```js
   const datosCancelacionParcial = {
       id: 7,
       id_pelicula: 1,
       id_horario_proyeccion: 2,
       id_usuario: 6,
       asientos_reservados: [60],
   };
   
   console.log(await objReserva.cancelarReserva(datosCancelacionParcial));
   ```
   
   en consola le saldra lo siguiente:
   
   ```js
   {
     error: 'Error al cancelar/actualizar la reserva: No tienes permiso para modificar esta reserva.'
   }
   ```
   
   
   
   
   ☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆
   
   
   
4. **Descuentos y Tarjetas VIP:**
   
   ★ **API para Aplicar Descuentos:** Permitir la aplicación de descuentos en la compra de boletos para usuarios con tarjeta VIP.
   
   
   
   Este caso de uso puede ser aplicado a los siguientes usuarios: Administrador, Estandar o VIP 
   Los siguientes ejemplos toman de referencia a un usuario de diferente Rol, sin embargo si queremos hacerlo con otros diferentes al Final del Readme podremos encontrarlos
   
   EJEMPLO:
   
   Usuario VIP 2:
   
   user: "CarolinaM"
   pwd: "1087654321"
   
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   
   
   **comprarBoletosVIP(datosBoletoVip):** Realiza la compra de boletos VIP para una película, aplicando descuentos para usuarios VIP.
   
   **Parámetros:** Un objeto con los siguientes datos:
   
   - id: Identificador único del boleto
   - id_pelicula: Identificador de la película
   - id_horario_proyeccion: Identificador del horario de proyección
   - id_usuario: Identificador del usuario que realiza la compra
   - asientos_comprados: Array con los números de asientos a comprar
   - modo_compra: Modo de compra (por ejemplo, "virtual" o "presencial")
   - metodo_pago: Método de pago utilizado
   - id_reserva: Identificador de la reserva (si aplica), puede ser null
   
   Cuando se ejecuta esto:
   
   ```js
   let objTarjetaVip = new TarjetaVip();
   
   const datosBoletoVip = {
       id: 20,
       id_pelicula: 4,
       id_horario_proyeccion: 11,
       id_usuario: 4,
       asientos_comprados: [107,108], 
       modo_compra: "virtual",
       metodo_pago: "efectivo",
       id_reserva: null
   };
   
   console.log(await objTarjetaVip.comprarBoletosVIP(datosBoletoVip));
   
   objTarjetaVip.destructor();
   ```
   
   en consola obtendremos un resultado:
   
   ```js
   {
     mensaje: 'Compra realizada con éxito. Eres un cliente VIP y por eso te hemos otorgado un descuento de: 15%',
     detallesBoleto: {
       id: 20,
       id_pelicula: 4,
       id_horario_proyeccion: 11,
       id_usuario: 4,
       asientos_comprados: [ 107, 108 ],
       modo_compra: 'virtual',
       metodo_pago: 'efectivo',
       id_reserva: null,
       total: 27200,
       descuento_aplicado: 15,
       fecha_compra: '28/7/2024',
       estado_compra: 'completada',
       _id: new ObjectId('66a69721bb12080912e2ce58')
     }
   }
   ```
   
   Como podemos observar la notifica al usuario, que al ser un cliente vip se le ha aplicado el correspondiente descuento.
   
   
   
   ★ **API para Verificar Tarjeta VIP:** Permitir la verificación de la validez de una tarjeta VIP durante el proceso de compra.
   
   
   
   Este caso de uso puede ser aplicado a los siguientes usuarios: Administrador, Estandar o VIP 
   Los siguientes ejemplos toman de referencia a un usuario de diferente Rol, sin embargo si queremos hacerlo con otros diferentes al Final del Readme podremos encontrarlos
   
   EJEMPLO:
   
   Usuario VIP 2:
   
   user: "CarolinaM"
   pwd: "1087654321"
   
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   
   
   **ComprarBoletosVIPConVerificacionTarjeta(datosBoletoVip):** Realiza la compra de boletos VIP para una película, verificando la validez de la tarjeta VIP durante el proceso.
   
   **Parámetros:** Un objeto con los siguientes datos:
   
   - id: Identificador único del boleto
   - id_pelicula: Identificador de la película
   - id_horario_proyeccion: Identificador del horario de proyección
   - id_usuario: Identificador del usuario que realiza la compra
   - asientos_comprados: Array con los números de asientos a comprar
   - modo_compra: Modo de compra (por ejemplo, "virtual" o "presencial")
   - metodo_pago: Método de pago utilizado
   - id_reserva: Identificador de la reserva (si aplica), puede ser null
   
   Cuando se ejecuta esto:
   
   ```js
   let objTarjetaVip = new TarjetaVip();
   
   const datosBoletoVip = {
       id: 21,
       id_pelicula: 6,
       id_horario_proyeccion: 18,
       id_usuario: 4,
       asientos_comprados: [76,77], 
       modo_compra: "virtual",
       metodo_pago: "efectivo",
       id_reserva: null
   };
   
   console.log(await objTarjetaVip.comprarBoletosVIPConVerificacionTarjeta(datosBoletoVip));
   
   objTarjetaVip.destructor();
   ```
   
   obtendremos desde consola una respuesta asi, en caso de que la tarjeta este en un estado activo:
   
   ```js
   {
     mensaje: 'Compra realizada con éxito. Querido usuario VIP tu tarjeta esta (activa) y por eso te hemos otorgado un descuento de: 15%',
     detallesBoleto: {
       id: 21,
       id_pelicula: 6,
       id_horario_proyeccion: 18,
       id_usuario: 4,
       asientos_comprados: [ 76, 77 ],
       modo_compra: 'virtual',
       metodo_pago: 'efectivo',
       id_reserva: null,
       total: 30600,
       descuento_aplicado: 15,
       fecha_compra: '28/7/2024',
       estado_compra: 'completada',
       _id: new ObjectId('66a69a07afc20d91f1dd284e')
     }
   }
   ```
   
   Como vemos le notifica que se le realizo la compra y se le aplico un descuento al estar su tarjeta en estado activo
   
   
   
   Cuando se ejecuta esto para un usuario que tiene su tarjeta expirada:
   
   ```js
   let objTarjetaVip = new TarjetaVip();
   
   const datosBoletoVip = {
       id: 20,
       id_pelicula: 6,
       id_horario_proyeccion: 18,
       id_usuario: 3,
       asientos_comprados: [86,87], 
       modo_compra: "virtual",
       metodo_pago: "efectivo",
       id_reserva: null
   };
   
   console.log(await objTarjetaVip.comprarBoletosVIPConVerificacionTarjeta(datosBoletoVip));
   
   objTarjetaVip.destructor();
   ```
   
   En consola obtendremos una respuesta asi:
   
   ```js
   {
     mensaje: 'Compra realizada con éxito. Pero Lo sentimos mucho querido usuario VIP pero tu tarjeta esta (expirada) por eso no hemos podido realizarte un descuento, te invitamos a que vuelvas a activar tu tarjeta',
     detallesBoleto: {
       id: 20,
       id_pelicula: 6,
       id_horario_proyeccion: 18,
       id_usuario: 3,
       asientos_comprados: [ 86, 87 ],
       modo_compra: 'virtual',
       metodo_pago: 'efectivo',
       id_reserva: null,
       total: 36000,
       descuento_aplicado: 0,
       fecha_compra: '28/7/2024',
       estado_compra: 'completada',
       _id: new ObjectId('66a698258f442e2c611c8711')
     }
   }
   ```
   
   Como vemos se realizo la compra, pero le notifico al usuario VIP que su tarjeta ya expiro y que si quiere que le sigan aplicando descuentos debe renovarla.
   
   
   
   
   ☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆
   
   
   
5. #### Roles Definidos:
   
   - **Administrador:** Tiene permisos completos para gestionar el sistema, incluyendo la venta de boletos en el lugar físico. Los administradores no están involucrados en las compras en línea realizadas por los usuarios.
   
   - **Usuario Estándar:** Puede comprar boletos en línea sin la intervención del administrador.
   
   - **Usuario VIP:** Puede comprar boletos en línea con descuentos aplicables para titulares de tarjetas VIP.
   
     
   
   ★ **API para Crear Usuario:** Permitir la creación de nuevos usuarios en el sistema, asignando roles y privilegios específicos (usuario estándar, usuario VIP o administrador).
   
   
   
   Este caso de uso puede ser aplicado a los siguientes usuarios: Administrador, Estandar o VIP 
   Los siguientes ejemplos toman de referencia a un usuario de diferente Rol, sin embargo si queremos hacerlo con otros diferentes al Final del Readme podremos encontrarlos
   
   EJEMPLO:
   
   Usuario VIP 2:
   
   user: "CarolinaM"
   pwd: "1087654321"
   
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   
   
   **crearUsuario(datosUsuarioEstandar):** Crea un nuevo usuario en el sistema.
   
   **Parámetros:** Un objeto con los siguientes datos: 
   
   - id: Identificador único del usuario 
   - nombre_completo: Nombre completo del usuario 
   - identificacion: Número de identificación del usuario 
   - nickname: Apodo o nombre de usuario 
   - celular: Número de celular 
   - email: Correo electrónico 
   - telefono: Número de teléfono fijo 
   - rol: Rol del usuario (por ejemplo, "VIP", "Estandar" o "Administrador")
   
   
   
   Cuando ejecutamos esto para crear un nuevo usuario:
   
   ```js
   let objUsuario = new Usuario();
   
   const datosUsuarioEstandar = {
       id: 20,
       nombre_completo: "Miguel Angel Castro",
       identificacion: "109785312",
       nickname: "MigueCastro",
       celular: "3131464905",
       email: "miguel.angel@email.com",
       telefono: "6019876543",
       rol: "VIP"
   };
   
   console.log(await objUsuario.crearUsuario(datosUsuarioEstandar));
   
   objUsuario.destructor();
   ```
   
   obtendremos desde consola el siguiente resultado
   
   ```js
   {
     mensaje: 'Usuario creado con éxito',
     usuario: {
       id: 20,
       nombre_completo: 'Miguel Angel Castro',
       identificacion: '109785312',
       nickname: 'MigueCastro',
       celular: '3131464905',
       email: 'miguel.angel@email.com',
       telefono: '6019876543',
       rol: 'VIP'
     }
   }
   ```
   
   Como vemos este usuario es creado con el VIP, por eso es importante que el administrador le genere su nueva Tarjeta VIP.
   
   **crearTarjetaVIP(datosTarjetaVip):** Crea una tarjeta VIP para un usuario.
   
   
   
   Este caso de uso puede ser aplicado solo al siguiente usuario: Administrador
   Los siguientes ejemplos toman de referencia a un usuario de diferente Rol, sin embargo si queremos hacerlo con otros diferentes al Final del Readme podremos encontrarlos, en este caso de uso solo el Administrador puede ser el encargado de activar la tarjeta del usuario
   
   EJEMPLO:
   
   
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   
   
   **Parámetros:** Un objeto con los siguientes datos:
   
   - identificacion: Número de identificación del usuario
   
   Tambien es posible crear la tarjeta VIP por medio del id, identificacion o nickname
   
   para realizar esto ejecutamos lo siguiente (identificacion):
   
   ```js
   let objUsuario = new Usuario();
   
   const datosTarjetaVip = {
       identificacion: "109785312"
   };
   
   console.log(await objUsuario.crearTarjetaVIP(datosTarjetaVip));
   
   objUsuario.destructor();
   ```
   
   y como respuesta en consola obtendremos una respuesta asi:
   
   ```js
   {
     id: 6,
     id_usuario: 20,
     numero: 'VIP5044',
     porcentaje_descuento: 15,
     fecha_expiracion: '28/07/2025',
     estado: 'activa',
     _id: new ObjectId('66a70d9b8b1791fd25fc42bd')
   }
   ```
   
   Esto indica que la tarjeta fue creada correctamente.
   
   Este codigo valida que no se pueda crear ningun otro usuario que tenga el mismo id, nombre completo, nickname, correo electronico, identificacion o celular, ya que de lo contrario votara un mensaje de advertencia.
   
   ```js
   let objUsuario = new Usuario();
   
   const datosUsuarioEstandar = {
       id: 25,
       nombre_completo: "Diana Carolina Moreno",
       identificacion: "1087654321",
       nickname: "CarolinaM",
       celular: "3131464905",
       email: "caro.moreno@email.com",
       telefono: "6019876543",
       rol: "VIP"
   };
   
   console.log(await objUsuario.crearUsuario(datosUsuarioEstandar));
   
   objUsuario.destructor();
   ```
   
   al ejecutar esto devuelve en consola esto:
   
   ```js
   {
     error: 'Error al crear el usuario: Ya existe un usuario con el mismo nickname.'
   }
   ```
   
   
   
   ★ **API para Obtener Detalles de Usuario:** Permitir la consulta de información detallada sobre un usuario, incluyendo su rol y estado de tarjeta VIP.
   
   
   
   Este caso de uso puede ser aplicado solo al siguiente usuario: Administrador
   Los siguientes ejemplos toman de referencia a un usuario de diferente Rol, sin embargo si queremos hacerlo con otros diferentes al Final del Readme podremos encontrarlos, en este solo es para el administrador, ya que es una informacion personal que solo el admin puede ver
   
   EJEMPLO:
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   
   
   **consultarUsuarioDetallado(datosConsulta):** Consulta información detallada sobre un usuario, incluyendo su rol y estado de tarjeta VIP.
   
   **Parámetros:** Un objeto con los siguientes datos:
   
   - identificacion: Número de identificación del usuario
   
   Tambien es posible buscar por medio del id, identificacion o nickname
   
   Al ejecutar esto:
   
   ```js
   let objUsuario = new Usuario();
   
   const datosConsulta = {
       identificacion: "1087654321"
   
   };
   
   console.log(await objUsuario.consultarUsuarioDetallado(datosConsulta));
   
   objUsuario.destructor();
   ```
   
   obtendremos desde consola una respuesta asi:
   
   ```js
   {
     id: 2,
     nombre_completo: 'Diana Carolina Moreno',
     identificacion: '1087654321',
     nickname: 'CarolinaM',
     celular: '3157654321',
     email: 'caro.moreno@email.com',
     telefono: '6028765432',
     rol: 'VIP',
     tarjetaVIP: {
       numero: 'VIP002',
       porcentaje_descuento: 15,
       fecha_expiracion: '28/11/2024',
       estado: 'activa'
     },
     mensajeTarjetaVIP: 'Felicidades, eres un usuario VIP con tarjeta activa. Sigue disfrutando de nuestros descuentos.'
   }
   ```
   
   Para buscar la informacion de un usuario estandar ejecutamos lo siguiente (aca buscamos por id): 
   
   ```js
   let objUsuario = new Usuario();
   
   const datosConsulta = {
       id: 7
   
   };
   
   console.log(await objUsuario.consultarUsuarioDetallado(datosConsulta));
   
   objUsuario.destructor();
   ```
   
   y obtendremos una respuesta asi:
   
   ```js
   {
     id: 7,
     nombre_completo: 'Henry Fabian Boada',
     identificacion: '1032109876',
     nickname: 'HenryFab',
     celular: '3112345678',
     email: 'henry.boada@email.com',
     telefono: '6074567890',
     rol: 'Estandar',
     tarjetaVIP: null,
     mensajeTarjetaVIP: 'Eres usuario estándar. No tienes una tarjeta VIP. Si deseas una, puedes adquirirla.'
   }
   ```
   
   
   
   ★ **API para Actualizar Rol de Usuario:** Permitir la actualización del rol de un usuario (por ejemplo, cambiar de usuario estándar a VIP, o viceversa).
   
   
   
   Este caso de uso puede ser aplicado solo al siguiente usuario: Administrador
   Los siguientes ejemplos toman de referencia a un usuario de diferente Rol, sin embargo si queremos hacerlo con otros diferentes al Final del Readme podremos encontrarlos, en este solo es para el administrador, ya que es el encargado de validar las tarjetas VIP
   
   EJEMPLO:
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   
   
   **actualizarRolUsuario(datosActualizacion):** Actualiza el rol de un usuario existente.
   
   **Parámetros:** Un objeto con los siguientes datos:
   
   - id: Identificador único del usuario
   - nuevoRol: Nuevo rol a asignar al usuario
   
   Cuando ejecutamos esto cuando queremos pasar un VIP a Estandar:
   
   ```js
   let objUsuario = new Usuario();
   
   const datosActualizacion1 = {
       id: 20,
       nuevoRol: 'Estandar'
   };
   console.log(await objUsuario.actualizarRolUsuario(datosActualizacion1));
   
   objUsuario.destructor();
   ```
   
   En consola obtenemos una respuesta como esta:
   
   ```js
   {
     mensaje: 'Tu rol ha sido actualizado a Estándar y tu tarjeta VIP ha sido cancelada.'
   }
   ```
   
   Cuando queremos pasar un Usuario Estandar a VIP ejecutamos lo siguiente:
   
   ```js
   let objUsuario = new Usuario();
   
   const datosActualizacion1 = {
       id: 9,
       nuevoRol: 'VIP'
   };
   console.log(await objUsuario.actualizarRolUsuario(datosActualizacion1));
   
   
   objUsuario.destructor();
   ```
   
   y obtendremos una respuesta como esta:
   
   ```js
   {
     mensaje: 'Ya eres un usuario Vip, Felicidades has obtenido acceso a la tarjeta premium. El siguiente paso es registrar tu tarjeta.'
   }
   ```
   
   Asi mismo le estamos indicando al usuario que debe realizar el paso que hicimos anteriormente para registrar su tarjeta.
   
   Tambien podemos cambiar a un usuario normal como administrador en caso de que empiece a trabajar para CineCampus
   
   ```js
   let objUsuario = new Usuario();
   
   const datosActualizacion1 = {
       id: 9,
       nuevoRol: 'Administrador'
   };
   console.log(await objUsuario.actualizarRolUsuario(datosActualizacion1));
   
   
   objUsuario.destructor();
   ```
   
   Entonces desde consola obtendremos una respuesta asi:
   
   ```js
   { mensaje: 'Rol actualizado exitosamente.' }
   ```
   
   
   
   ★ **API para Listar Usuarios:** Permitir la consulta de todos los usuarios del sistema, con la posibilidad de filtrar por rol (VIP, estándar o administrador).
   
   
   
   Este caso de uso puede ser aplicado solo al siguiente usuario: Administrador
   Los siguientes ejemplos toman de referencia a un usuario de diferente Rol, sin embargo si queremos hacerlo con otros diferentes al Final del Readme podremos encontrarlos, en este solo es para el administrador, ya que es una informacion personal que solo el admin puede ver
   
   EJEMPLO:
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   
   
   **consultarUsuarios(filtro):** Permite la consulta de todos los usuarios del sistema, con la posibilidad de filtrar por rol.
   
   **Parámetros:** Un objeto con los siguientes datos (opcional):
   
   - rol: Rol por el cual filtrar los usuarios
   
   Cuando ejecutamos esto para buscar los VIP:
   
   ```js
   let objUsuario = new Usuario();
   
   console.log(await objUsuario.consultarUsuarios({ rol: 'VIP' }));
   
   
   objUsuario.destructor();
   ```
   
   Obtendremos una respuesta asi:
   
   ```js
   {
     usuarios: [
       {
         id: 1,
         nombre_completo: 'Jhon Sebastian Gutierrez',
         identificacion: '1098765432',
         nickname: 'JhonSebas',
         email: 'jhon.gutierrez@email.com',
         rol: 'VIP'
       },
       {
         id: 2,
         nombre_completo: 'Diana Carolina Moreno',
         identificacion: '1087654321',
         nickname: 'CarolinaM',
         email: 'caro.moreno@email.com',
         rol: 'VIP'
       },
       {
         id: 3,
         nombre_completo: 'Mariana Traslavña Sarmiento',
         identificacion: '1076543210',
         nickname: 'MarianaTS',
         email: 'mariana.traslavina@email.com',
         rol: 'VIP'
       },
       {
         id: 4,
         nombre_completo: 'Samuel Enrique Suarez',
         identificacion: '1065432109',
         nickname: 'SamuelES',
         email: 'samuel.suarez@email.com',
         rol: 'VIP'
       },
       {
         id: 5,
         nombre_completo: 'Camilo Esteban Concha',
         identificacion: '1054321098',
         nickname: 'CamiloConcha',
         email: 'camilo.concha@email.com',
         rol: 'VIP'
       }
     ],
     mensaje: 'Se encontraron 5 usuario(s) con rol VIP.'
   }
   ```
   
   Cuando ejecutamos esto para buscar los Estandar:
   
   ```js
   let objUsuario = new Usuario();
   
   console.log(await objUsuario.consultarUsuarios({ rol: 'Estandar' }));
   
   
   objUsuario.destructor();
   ```
   
   Obtendremos una respuesta asi:
   
   ```js
   {
     usuarios: [
       {
         id: 6,
         nombre_completo: 'Danna Nikole Ardila',
         identificacion: '1043210987',
         nickname: 'DannaNik',
         email: 'danna.ardila@email.com',
         rol: 'Estandar'
       },
       {
         id: 7,
         nombre_completo: 'Henry Fabian Boada',
         identificacion: '1032109876',
         nickname: 'HenryFab',
         email: 'henry.boada@email.com',
         rol: 'Estandar'
       },
       {
         id: 8,
         nombre_completo: 'Karen Yiseth Pinto',
         identificacion: '1021098765',
         nickname: 'KarenYP',
         email: 'karen.pinto@email.com',
         rol: 'Estandar'
       },
       {
         id: 9,
         nombre_completo: 'David Steven Romero',
         identificacion: '1010987654',
         nickname: 'DavidSR',
         email: 'david.romero@email.com',
         rol: 'Estandar'
       },
       {
         id: 10,
         nombre_completo: 'Camilo Andres Franco',
         identificacion: '1000876543',
         nickname: 'CamiloAF',
         email: 'camilo.franco@email.com',
         rol: 'Estandar'
       },
       {
         id: 11,
         nombre_completo: 'Juan Carlos Almario',
         identificacion: '1097984654',
         nickname: 'JuanitoAl',
         email: 'juan.almario@email.com',
         rol: 'Estandar'
       },
       {
         id: 12,
         nombre_completo: 'Nikoll Zarai Mantilla',
         identificacion: '1095828793',
         nickname: 'NikollMan',
         email: 'niko.mantilla@email.com',
         rol: 'Estandar'
       },
       {
         id: 20,
         nombre_completo: 'Miguel Angel Castro',
         identificacion: '109785312',
         nickname: 'MigueCastro',
         email: 'miguel.angel@email.com',
         rol: 'Estandar'
       }
     ],
     mensaje: 'Se encontraron 8 usuario(s) con rol Estandar.'
   }
   ```
   
   Cuando ejecutamos esto para buscar los Administrador:
   
   ```js
   let objUsuario = new Usuario();
   
   console.log(await objUsuario.consultarUsuarios({ rol: 'Administrador' }));
   
   
   objUsuario.destructor();
   ```
   
   Obtendremos una respuesta asi:
   
   ```js
   {
     usuarios: [
       {
         id: 31,
         nombre_completo: 'Karen Lorena Celis',
         identificacion: '1098765433',
         nickname: 'KarenLCelis',
         email: 'karen.celis@email.com',
         rol: 'Administrador'
       },
       {
         id: 32,
         nombre_completo: 'Diego Tarazona Pinzon',
         identificacion: '1098765434',
         nickname: 'DiegoTP',
         email: 'diego.tarazona@email.com',
         rol: 'Administrador'
       },
       {
         id: 33,
         nombre_completo: 'Angie Gorett Suárez',
         identificacion: '1098765435',
         nickname: 'AngieSuarez',
         email: 'angie.suarez@email.com',
         rol: 'Administrador'
       },
       {
         id: 34,
         nombre_completo: 'Johlver Jose Pardo',
         identificacion: '1098765436',
         nickname: 'JohlverJP',
         email: 'johlver.pardo@email.com',
         rol: 'Administrador'
       },
       {
         id: 35,
         nombre_completo: 'Janeth Cardenas Bonilla',
         identificacion: '1098765437',
         nickname: 'JanethCB',
         email: 'janeth.cardenas@email.com',
         rol: 'Administrador'
       }
     ],
     mensaje: 'Se encontraron 5 usuario(s) con rol Administrador.'
   }
   ```
   
   En caso de ingresar un rol que no es entonces el codigo marcara una advertencia:
   
   ```js
   let objUsuario = new Usuario();
   
   console.log(await objUsuario.consultarUsuarios({ rol: 'Cine' }));
   
   
   objUsuario.destructor();
   ```
   
   en consola obtendremos:
   
   ```js
   {
     usuarios: [],
     mensaje: 'El rol "Cine" no es válido. Los roles válidos son: VIP, Estandar, Administrador.'
   }
   ```
   
   
   
   ☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆
   
   
   
6. #### **Compras en Línea:**
   
   ★ **API para Procesar Pagos:** Permitir el procesamiento de pagos en línea para la compra de boletos.
   
   
   
   Este caso de uso puede ser aplicado a los siguientes usuarios: Administrador, Estandar o VIP 
   Los siguientes ejemplos toman de referencia a un usuario de diferente Rol, sin embargo si queremos hacerlo con otros diferentes al Final del Readme podremos encontrarlos
   
   EJEMPLO:
   
   Usuario VIP 2:
   
   user: "CarolinaM"
   pwd: "1087654321"
   
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   
   
   ##### **pagosEnLinea(datosPagoLinea):**
   
   Realiza el pago en línea de boletos para una película.
   
   ##### **Parámetros:**
   
   Un objeto con los siguientes datos:
   
   - **id:** Identificador único del boleto
   - **id_pelicula:** Identificador de la película
   - **id_horario_proyeccion:** Identificador del horario de proyección
   - **id_usuario:** Identificador del usuario que realiza la compra
   - **asientos_comprados:** Array con los números de asientos a comprar
   - **modo_compra:** Modo de compra (por ejemplo, "virtual")
   - **metodo_pago:** Método de pago utilizado
   - **id_reserva:** Identificador de la reserva (si aplica), puede ser `null`
   
   Cuando ejecutamos este codigo:
   
   ```js
   let objBoleto = new boleto();
   
   const datosPagoLinea = {
       id: 28,
       id_pelicula: 7,
       id_horario_proyeccion: 20,
       id_usuario: 5,
       asientos_comprados: [107, 108], 
       modo_compra: "virtual",
       metodo_pago: "tarjeta_credito",
       id_reserva: null
   };
   
   console.log(await objBoleto.pagosEnLinea(datosPagoLinea));
   
   objBoleto.destructor();
   ```
   
   Obtenemos en consola la siguiente informacion:
   
   ```js
   {
     mensaje: 'Compra realizada con éxito.',
     mensajeDescuento: 'Querido usuario VIP tu tarjeta esta (activa) y por eso te hemos otorgado un descuento de: 15%',
     mensajeModoCompra: 'Su compra virtual se ha realizado satisfactoriamente.',
     detallesBoleto: {
       id: 28,
       id_pelicula: 7,
       id_horario_proyeccion: 20,
       id_usuario: 5,
       asientos_comprados: [ 107, 108 ],
       modo_compra: 'virtual',
       metodo_pago: 'tarjeta_credito',
       id_reserva: null,
       total: 28900,
       descuento_aplicado: 15,
       fecha_compra: '29/7/2024',
       estado_compra: 'completada',
       _id: new ObjectId('66a724f76280e16f7f9f1cda')
     }
   }
   ```
   
   Como vemos hay un mensaje que le avisa al usuario que : Su compra virtual se ha realizado satisfactoriamente
   
   
   
   ★ **API para Confirmación de Compra:** Enviar confirmación de la compra y los detalles del boleto al usuario.
   
   
   
   Este caso de uso puede ser aplicado a los siguientes usuarios: Administrador, Estandar o VIP 
   Los siguientes ejemplos toman de referencia a un usuario de diferente Rol, sin embargo si queremos hacerlo con otros diferentes al Final del Readme podremos encontrarlos
   
   EJEMPLO:
   
   Usuario VIP 2:
   
   user: "CarolinaM"
   pwd: "1087654321"
   
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   
   
   
   ##### **confirmacionCompra(detallesBoletoUser):**
   
   Confirma la compra y proporciona los detalles del boleto al usuario.
   
   ##### **Parámetros:**
   
   Un objeto con los siguientes datos:
   
   - **id:** Identificador único del boleto
   - **id_pelicula:** Identificador de la película
   - **id_horario_proyeccion:** Identificador del horario de proyección
   - **id_usuario:** Identificador del usuario que realiza la compra
   - **asientos_comprados:** Array con los números de asientos a comprar
   - **modo_compra:** Modo de compra (por ejemplo, "virtual")
   - **metodo_pago:** Método de pago utilizado
   - **id_reserva:** Identificador de la reserva (si aplica), puede ser `null`
   
   
   
   Cuando ejecutamos este codigo:
   
   ```js
   let objBoleto = new boleto();
   
   const detallesBoletoUser = {
       id: 30,
       id_pelicula: 1,
       id_horario_proyeccion: 1,
       id_usuario: 5,
       asientos_comprados: [31], 
       modo_compra: "virtual",
       metodo_pago: "tarjeta_credito",
       id_reserva: null
   };
   
   console.log(await objBoleto.confirmacionCompra(detallesBoletoUser));
   
   objBoleto.destructor();
   ```

​	Obtenemos en consola la siguiente informacion:

```js
{
  mensaje: 'Compra realizada con éxito.',
  mensajeConfirmacion: 'Su compra ha sido confirmada. Gracias por su preferencia.',
  mensajeDescuento: 'Querido usuario VIP tu tarjeta esta (activa) y por eso te hemos otorgado un descuento de: 15%',
  mensajeModoCompra: 'Su compra virtual se ha realizado satisfactoriamente.',
  detallesBoleto: {
    id: 30,
    id_pelicula: 1,
    id_horario_proyeccion: 1,
    id_usuario: 5,
    asientos_comprados: [ 31 ],
    modo_compra: 'virtual',
    metodo_pago: 'tarjeta_credito',
    id_reserva: null,
    total: 12750,
    descuento_aplicado: 15,
    fecha_compra: '29/7/2024',
    estado_compra: 'completada',
    _id: new ObjectId('66a72b5012cf3b48f1769ec9')
  }
}
```

Como vemos hay mensajes que le avisa al usuario que :  Compra realizada con éxito y Su compra ha sido confirmada. Gracias por su preferencia, y no solo eso si no que tambien brinda la informacion de la compra.



─────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀─────



#### Requisitos Técnicos

- **Base de Datos:** Utilizar MongoDB para el almacenamiento de datos relacionados con películas, boletos, asientos, usuarios y roles.
- **Autenticación:** Implementar autenticación segura para el acceso a las APIs, utilizando roles de usuario para determinar los permisos y accesos (por ejemplo, usuarios VIP y usuarios estándar).
- **Autorización de Roles:** Asegurar que las APIs y las operaciones disponibles estén adecuadamente restringidas según el rol del usuario (por ejemplo, aplicar descuentos solo a usuarios VIP).
- **Escalabilidad:** Las APIs deben estar diseñadas para manejar un gran volumen de solicitudes concurrentes y escalar según sea necesario.
- **Documentación:** Proveer una documentación clara y completa para cada API, describiendo los endpoints, parámetros, y respuestas esperadas.

#### Entregables

1. **Código Fuente:** Repositorio en GitHub con el código de las APIs desarrolladas.
2. **Documentación de API:** Documento con la descripción detallada de cada API, incluyendo ejemplos de uso y formato de datos.
3. **Esquema de Base de Datos:** Diseño del esquema de MongoDB utilizado para almacenar la información.

#### Evaluación

- **Funcionalidad:** Cumplimiento de los requisitos funcionales establecidos.
- **Eficiencia:** Desempeño y tiempo de respuesta de las APIs.
- **Seguridad:** Implementación adecuada de medidas de seguridad, autenticación y autorización de roles.
- **Documentación:** Claridad y exhaustividad de la documentación proporcionada.



─────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀─────

# Roles Utilizados 



# Roles CineCampus



#### Rol de administrador

```
db.createRole({
  role: "Administrador",
  privileges: [
    {
        resource: { db: "cineCampus", collection: "asiento" },
        actions: ["find", "remove", "update", "insert", "createCollection", "dropCollection"]
      },
      {
        resource: { db: "cineCampus", collection: "boleto" },
        actions: ["find", "remove", "update", "insert", "createCollection", "dropCollection"]
      },
      {
        resource: { db: "cineCampus", collection: "horario_proyeccion" },
        actions: ["find", "remove", "update", "insert", "createCollection", "dropCollection"]
      },
      {
        resource: { db: "cineCampus", collection: "pelicula" },
        actions: ["find", "remove", "update", "insert", "createCollection", "dropCollection"]
      },
      {
        resource: { db: "cineCampus", collection: "reserva" },
        actions: ["find", "remove", "update", "insert", "createCollection", "dropCollection"]
      },
      {
        resource: { db: "cineCampus", collection: "sala" },
        actions: ["find", "remove", "update", "insert", "createCollection", "dropCollection"]
      },
      {
        resource: { db: "cineCampus", collection: "tarjeta_vip" },
        actions: ["find", "remove", "update", "insert", "createCollection", "dropCollection"]
      },
      {
        resource: { db: "cineCampus", collection: "usuario" },
        actions: ["find", "remove", "update", "insert", "createCollection", "dropCollection"]
      }
  ],
  roles: []
})
```



#### Rol de Usuario Estandar

```
db.createRole(
	{
		role: "userEstandar",
        privileges: [
      {
            resource: {db: "cineCampus", collection: "pelicula"},
            actions: ["find"]
            },
            {
            resource: {db: "cineCampus", collection: "boleto"},
            actions: ["find", "insert"]
            },
            {
            resource: {db: "cineCampus", collection: "sala"},
            actions: ["find"]
            },
            {
            resource: {db: "cineCampus", collection: "reserva"},
            actions: ["find", "insert", "update"]
            },
            {
            resource: {db: "cineCampus", collection: "asiento"},
            actions: ["find", "insert", "update"]
            },
              {
            resource: { db: "cineCampus", collection: "", command: { aggregate: "pelicula" } },
            actions: ["find"]  
              },
            {
            resource: {db: "cineCampus", collection: "usuario"},
            actions: ["insert", "update"]
            }
    	],
            roles: []
	}
)
```



#### Rol de Usuario VIP

```
db.createRole(
	{
		role: "userVip",
        privileges: [
      {
            resource: {db: "cineCampus", collection: "pelicula"},
            actions: ["find"]
            },
            {
            resource: {db: "cineCampus", collection: "boleto"},
            actions: ["find", "insert"]
            },
            {
            resource: {db: "cineCampus", collection: "sala"},
            actions: ["find"]
            },
            {
            resource: {db: "cineCampus", collection: "reserva"},
            actions: ["find", "insert", "update"]
            },
            {
            resource: {db: "cineCampus", collection: "asiento"},
            actions: ["find", "insert", "update"]
            },
              {
            resource: { db: "cineCampus", collection: "", command: { aggregate: "pelicula" } },
            actions: ["find"]  
              },
            {
            resource: {db: "cineCampus", collection: "usuario"},
            actions: ["insert", "update"]
            }
    	],
            roles: []
	}
)
```





─────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀─────



# Usuarios Utilizados 



# Usuarios CineCampus

####  Usuarios administradores

##### Usuario 1 

```
db.createUser(
  {
    user: "KarenLCelis",
    pwd: "1098765433",
    roles: [ { role: "Administrador", db: "cineCampus" } ]
  }
)
```

##### Usuario 2

```
db.createUser(
  {
    user: "DiegoTP",
    pwd: "1098765434",
    roles: [ { role: "Administrador", db: "cineCampus" } ]
  }
)
```

##### Usuario 3

```
db.createUser(
  {
    user: "AngieSuarez",
    pwd: "1098765435",
    roles: [ { role: "Administrador", db: "cineCampus" } ]
  }
)
```

##### Usuario 4

```
db.createUser(
  {
    user: "JohlverJP",
    pwd: "1098765436",
    roles: [ { role: "Administrador", db: "cineCampus" } ]
  }
)
```

##### Usuario 5

```
db.createUser(
  {
    user: "JanethCB",
    pwd: "1098765437",
    roles: [ { role: "Administrador", db: "cineCampus" } ]
  }
)
```



#### Usuarios Estandar

##### Usuario 1 

```
db.createUser(
  {
    user: "DannaNik",
    pwd: "1043210987",
    roles: [ { role: "userEstandar", db: "cineCampus" } ]
  }
)
```

##### Usuario 2 

```
db.createUser(
  {
    user: "HenryFab",
    pwd: "1032109876",
    roles: [ { role: "userEstandar", db: "cineCampus" } ]
  }
)
```

##### Usuario 3 

```
db.createUser(
  {
    user: "KarenYP",
    pwd: "1021098765",
    roles: [ { role: "userEstandar", db: "cineCampus" } ]
  }
)
```

##### Usuario 4 

```
db.createUser(
  {
    user: "DavidSR",
    pwd: "1010987654",
    roles: [ { role: "userEstandar", db: "cineCampus" } ]
  }
)
```

##### Usuario 5 

```
db.createUser(
  {
    user: "CamiloAF",
    pwd: "1000876543",
    roles: [ { role: "userEstandar", db: "cineCampus" } ]
  }
)
```

##### Usuario 6 

```
db.createUser(
  {
    user: "JuanitoAl",
    pwd: "1097984654",
    roles: [ { role: "userEstandar", db: "cineCampus" } ]
  }
)
```

##### Usuario 7 

```
db.createUser(
  {
    user: "NikollMan",
    pwd: "1095828793",
    roles: [ { role: "userEstandar", db: "cineCampus" } ]
  }
)
```



#### Usuarios VIP

##### Usuario 1 

```
db.createUser(
  {
    user: "JhonSebas",
    pwd: "1098765432",
    roles: [ { role: "userVip", db: "cineCampus" } ]
  }
)
```

##### Usuario 2 

```
db.createUser(
  {
    user: "CarolinaM",
    pwd: "1087654321",
    roles: [ { role: "userVip", db: "cineCampus" } ]
  }
)
```

##### Usuario 3 

```
db.createUser(
  {
    user: "MarianaTS",
    pwd: "1076543210",
    roles: [ { role: "userVip", db: "cineCampus" } ]
  }
)
```

##### Usuario 4 

```
db.createUser(
  {
    user: "SamuelES",
    pwd: "1065432109",
    roles: [ { role: "userVip", db: "cineCampus" } ]
  }
)
```

##### Usuario 5 

```
db.createUser(
  {
    user: "CamiloConcha",
    pwd: "1054321098",
    roles: [ { role: "userVip", db: "cineCampus" } ]
  }
)
```

# 



─────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀─────

# Conexion Usuarios



#### Administrador:

Usuario Administrador 1:

user: "KarenLCelis"
pwd: "1098765433"

mongodb://KarenLCelis:1098765433@roundhouse.proxy.rlwy.net:58497/cineCampus

--------------------------------------------------

Usuario Administrador 2:

user: "DiegoTP"
pwd: "1098765434"

mongodb://DiegoTP:1098765434@roundhouse.proxy.rlwy.net:58497/cineCampus

---------------------------------------

 Usuario Administrador 3:

user: "AngieSuarez"
 pwd: "1098765435"

mongodb://AngieSuarez:1098765435@roundhouse.proxy.rlwy.net:58497/cineCampus

-------------------------------------------------------------------------------------------------------------------------------------------

Usuario Administrador 4:

user: "JohlverJP"
pwd: "1098765436"

mongodb://JohlverJP:1098765436@roundhouse.proxy.rlwy.net:58497/cineCampus

--------------------------------------------------------------------------------------------------------------------------

Usuario Administrador 5:

user: "JanethCB"
pwd: "1098765437"

mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus



─────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀─────



#### VIP:



Usuario VIP 1:

user: "JhonSebas"
pwd: "1098765432"

mongodb://JhonSebas:1098765432@roundhouse.proxy.rlwy.net:58497/cineCampus

-----------------------------

Usuario VIP 2:

user: "CarolinaM"
pwd: "1087654321"

mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus

---------------------

Usuario VIP 3:

user: "MarianaTS"
pwd: "1076543210"

mongodb://MarianaTS:1076543210@roundhouse.proxy.rlwy.net:58497/cineCampus

--------------------------

Usuario VIP 4:

user: "SamuelES"
pwd: "1065432109"

mongodb://SamuelES:1065432109@roundhouse.proxy.rlwy.net:58497/cineCampus

-------------------------

Usuario VIP 5:

user: "CamiloConcha"
pwd: "1054321098"

mongodb://CamiloConcha:1054321098@roundhouse.proxy.rlwy.net:58497/cineCampus



─────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀─────

#### Estandar:



Usuario Estandar 1:

user: "DannaNik"
pwd: "1043210987"

mongodb://DannaNik:1043210987@roundhouse.proxy.rlwy.net:58497/cineCampus

----------------------

Usuario Estandar 2:

user: "HenryFab"
pwd: "1032109876"

mongodb://HenryFab:1032109876@roundhouse.proxy.rlwy.net:58497/cineCampus

----------------------

Usuario Estandar 3:

user: "KarenYP"
pwd: "1021098765"

mongodb://KarenYP:1021098765@roundhouse.proxy.rlwy.net:58497/cineCampus

----------------------

Usuario Estandar 4:

user: "DavidSR"
pwd: "1010987654"

mongodb://DavidSR:1010987654@roundhouse.proxy.rlwy.net:58497/cineCampus

----------------------

Usuario Estandar 5:

user: "CamiloAF"
pwd: "1000876543"

mongodb://CamiloAF:1000876543@roundhouse.proxy.rlwy.net:58497/cineCampus

----------------------

Usuario Estandar 6:

user: "JuanitoAl"
pwd: "1097984654"

mongodb://JuanitoAl:1097984654@roundhouse.proxy.rlwy.net:58497/cineCampus

----------------------

Usuario Estandar 7:

user: "NikollMan"
pwd: "1095828793"

mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus