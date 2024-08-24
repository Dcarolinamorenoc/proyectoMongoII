## Estudiante:

```js
Diana Carolina Moreno Cárdenas
```



### Instalaciones Necesarias

- Necesario para conectar y interactuar con la base de datos MongoDB.

```js
npm i mongodb
```

- Framework web esencial para crear y gestionar el servidor de la aplicación.

```js
npm i express
```

- Permite cargar variables de entorno desde un archivo .env, crucial para la configuración segura de la aplicación.

```js
npm i dotenv
```

- Utilizado para validar y sanear los datos de entrada en las rutas de la API.

```js
npm i express-validator
```

- Para iniciar la aplicación en modo de desarrollo, utiliza el siguiente comando:

```js
npm run dev
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

   ```js
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"

   ```js
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   ```js
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```
   
   
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
   
   ```js
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   ```js
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"

   ```js
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```
   
   
   
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
   
   ```js
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   ```js
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   ```js
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```

   
   
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
   
   ```js
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   ```js
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   ```js
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```
   
   
   
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
   
   ```js
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   ```js
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   ```js
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```
   
   
   
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
   
   ```js
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   ```js
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   ```js
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```
   
   
   
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
   
   ```js
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   ```js
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   ```js
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```
   
   
   
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
   
   ```js
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   ```js
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   ```js
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```
   
   
   
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
   
   ```js
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   ```js
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   ```js
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```

   
   
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
   
   ```js
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```

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
   
   ```js
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   
   
   **consultarUsuarioDetallado(datosConsulta):** Consulta información detallada sobre un usuario, incluyendo su rol y estado de tarjeta VIP.
   
   **Parámetros:** Un objeto con los siguientes datos:
   
   - identificacion: Número de identificación del usuario
   
   Tambien es posible buscar por medio del id, identificacion o nickname
   
   Al ejecutar esto:
   
   ```js
   let objUsuario = new Usuario();
   
   console.log(await objUsuario.consultarUsuarioDetallado({
       admin_nickname: 'soni',
       admin_identificacion: '109634453',
       id: 2
   }));
   
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
   
   console.log(await objUsuario.consultarUsuarioDetallado({
       admin_nickname: 'soni',
       admin_identificacion: '109634453',
       id: 7
   }));
   
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
   
   ```js
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```

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
   
   ```js
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   
   
   **consultarUsuarios(filtro):** Permite la consulta de todos los usuarios del sistema, con la posibilidad de filtrar por rol.
   
   **Parámetros:** Un objeto con los siguientes datos (opcional):
   
   - rol: Rol por el cual filtrar los usuarios
   
   Cuando ejecutamos esto para buscar los VIP:
   
   ```js
   let objUsuario = new Usuario();
   
   console.log(await objUsuario.consultarUsuarios({ 
       nickname: 'Cata', 
       identificacion: '109783432', 
       rol: 'VIP' 
   }));
   
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
   
   console.log(await objUsuario.consultarUsuarios({ 
       nickname: 'Cata', 
       identificacion: '109783432', 
       rol: 'Estandar' 
   }));
   
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
   
   console.log(await objUsuario.consultarUsuarios({ 
       nickname: 'Cata', 
       identificacion: '109783432', 
       rol: 'Administrador' 
   }));
   
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
   
   console.log(await objUsuario.consultarUsuarios({ 
       nickname: 'Cata', 
       identificacion: '109783432', 
       rol: 'Cine' 
   }));
   
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
   
   ```js
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   ```js
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   ```js
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```
   
   
   
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
   
   ```js
   mongodb://CarolinaM:1087654321@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   Usuario Administrador 5:
   
   user: "JanethCB"
   pwd: "1098765437"
   
   ```js
   mongodb://JanethCB:1098765437@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   user: "NikollMan"
   pwd: "1095828793"
   
   ```js
   mongodb://NikollMan:1095828793@roundhouse.proxy.rlwy.net:58497/cineCampus
   ```
   
   
   
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



# APIS



# Documentación de la API de Películas

## Endpoints

### 1. Listar Películas

- **URL**: `/peliculas`
- **Método**: GET
- **Descripción**: Obtiene una lista de todas las películas en cartelera o próximos estrenos.
- **Respuesta exitosa**:
  - Código: 200
  - Contenido: Array de objetos de película
- Ejemplo: http://localhost:5001/api/peliculas

```
[
  {
    "id": 7,
    "titulo": "Lugar Tranquilo",
    "sinopsis": "En un mundo invadido y arrasado por unos letales extraterrestres que se guían por el sonido, Evelyn y Lee Abbott sobreviven con sus hijos en una granja aislada en el bosque, sumidos en el más profundo silencio. Mientras no hagan ruido, estarán a salvo.",
    "fecha_estreno": "09/02/2024",
    "genero": "Drama musical",
    "duracion": "135 minutos",
    "estado": "Próximo estreno",
    "pais_origen": "Estados Unidos",
    "imagen_pelicula": "https://i.pinimg.com/736x/fd/2a/82/fd2a82b3e9f7cc89793f7d773bd2744a.jpg",
    "reparto": [
      {
        "nombre_real": "Shameik Moore",
        "nombre_personaje": "Curtis 'Grandmaster Flash' Brown",
        "imagen_actor": "https://i.pinimg.com/564x/2b/b4/74/2bb474f66bdadcd4895c1a43f87b5839.jpg"
      },
      {
        "nombre_real": "Lakeith Stanfield",
        "nombre_personaje": "DJ Kool Herc",
        "imagen_actor": "https://i.pinimg.com/564x/62/3e/c8/623ec848c6bb05db78bb96e6fef156b0.jpg"
      },
      {
        "nombre_real": "Zoe Saldana",
        "nombre_personaje": "Gloria Brown",
        "imagen_actor": "https://i.pinimg.com/564x/e5/b0/5f/e5b05f9d64d912169b62e470a1ddcfc9.jpg"
      },
      {
        "nombre_real": "Mahershala Ali",
        "nombre_personaje": "DJ Disco Wiz",
        "imagen_actor": "https://i.pinimg.com/564x/48/b8/a8/48b8a8964f80e1f8f0f768f9a4c32b00.jpg"
      },
      {
        "nombre_real": "Jharrel Jerome",
        "nombre_personaje": "DJ Hollywood",
        "imagen_actor": "https://i.pinimg.com/564x/84/83/b2/8483b29cb4c42818a4de33f85eb515f0.jpg"
      },
      {
        "nombre_real": "Tessa Thompson",
        "nombre_personaje": "Cindy Campbell",
        "imagen_actor": "https://i.pinimg.com/564x/23/e9/ee/23e9ee8b5edd0e25bd2e552e1244be08.jpg"
      }
    ],
    "trailer": "https://www.youtube.com/watch?v=G6x44coQzRo",
    "horarios_proyeccion": [
      
    ]
  },
  {
    "id": 8,
    "titulo": "Coraline",
    "sinopsis": "Remake live-action del clásico de animación sobre una niña que descubre una realidad alternativa siniestra.Una joven atraviesa una puerta secreta en su nuevo hogar y descubre una versión alterna de su vida. En la superficie, esta realidad paralela es sorprendentemente similar a su vida real,pero mucho mejor.",
    "fecha_estreno": "25/10/2024",
    "genero": "Fantasia",
    "duracion": "100 minutos",
    "estado": "En cartelera",
    "pais_origen": "Estados Unidos",
    "imagen_pelicula": "https://i.pinimg.com/564x/33/f8/70/33f870f74805b8c09a187310cea4f68a.jpg",
    "reparto": [
      {
        "nombre_real": "Millie Bobby Brown",
        "nombre_personaje": "Coraline Jones",
        "imagen_actor": "https://i.pinimg.com/736x/b2/62/5e/b2625e56e7f5d8d27c74c880f05a7abf.jpg"
      },
      {
        "nombre_real": "Tilda Swinton",
        "nombre_personaje": "La Otra Madre",
        "imagen_actor": "https://i.pinimg.com/564x/1f/2e/96/1f2e96076a514905ecb2c80b4f286a7d.jpg"
      },
      {
        "nombre_real": "Timothée Chalamet",
        "nombre_personaje": "Wybie Lovat",
        "imagen_actor": "https://i.pinimg.com/736x/7a/1d/b7/7a1db7fd9297c92458e35dbd11c31146.jpg"
      },
      {
        "nombre_real": "Helena Bonham Carter",
        "nombre_personaje": "La Madre",
        "imagen_actor": "https://i.pinimg.com/564x/6f/3a/27/6f3a2732df70d3f877ac67768c599829.jpg"
      },
      {
        "nombre_real": "Idris Elba",
        "nombre_personaje": "El Sr. Bobinsky",
        "imagen_actor": "https://i.pinimg.com/564x/08/46/fc/0846fc2b7188d37748a40e9e22b20704.jpg"
      },
      {
        "nombre_real": "Anya Taylor-Joy",
        "nombre_personaje": "La Otra Coraline",
        "imagen_actor": "https://i.pinimg.com/564x/c3/53/f8/c353f853acdfccba89c88e3aec2fd334.jpg"
      }
    ],
    "trailer": "https://www.youtube.com/watch?v=T6iQnnHNF50",
    "horarios_proyeccion": [
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 1,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 2,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 3,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 4,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 5,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 6,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 7,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 8,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 9,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 10,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 11,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 12,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 13,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 14,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 15,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 16,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "31/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 17,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "31/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 18,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "31/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 19,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "31/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 20,
        "precio_pelicula": 15000
      }
    ]
  },
  {
    "id": 9,
    "titulo": "Masacre en el tren",
    "sinopsis": "Cuando el comando de las fuerzas especiales Amrit descubre que su verdadero amor, Tulika, está comprometida en contra de su voluntad, aborda un tren con destino a Nueva Delhi en una audaz misión para detener el matrimonio arreglado.",
    "fecha_estreno": "13/09/2024",
    "genero": "Terror",
    "duracion": "95 minutos",
    "estado": "Próximo estreno",
    "pais_origen": "Reino Unido",
    "imagen_pelicula": "https://i.pinimg.com/736x/27/11/96/271196800ac651f1f1d396256fc86ec3.jpg",
    "reparto": [
      {
        "nombre_real": "Daniel Kaluuya",
        "nombre_personaje": "John Carter",
        "imagen_actor": "https://i.pinimg.com/564x/bf/b9/7e/bfb97e6eb3848ca6394634077a30553c.jpg"
      },
      {
        "nombre_real": "Florence Pugh",
        "nombre_personaje": "Emily Harper",
        "imagen_actor": "https://i.pinimg.com/736x/24/08/d6/2408d6c1d6f2d6ade2c5441887573356.jpg"
      },
      {
        "nombre_real": "Richard Madden",
        "nombre_personaje": "Detective Harris",
        "imagen_actor": "https://i.pinimg.com/564x/d8/1f/cf/d81fcf88297bd9ec3d1a1c6f47145b4f.jpg"
      },
      {
        "nombre_real": "Jodie Comer",
        "nombre_personaje": "Claire Daniels",
        "imagen_actor": "https://i.pinimg.com/564x/11/e2/bb/11e2bb71ad0fcc717c638e46d5773c40.jpg"
      },
      {
        "nombre_real": "Tom Hiddleston",
        "nombre_personaje": "Asesino",
        "imagen_actor": "https://i.pinimg.com/736x/35/6e/f9/356ef9c588f19f8420092b60443516dc.jpg"
      },
      {
        "nombre_real": "Saoirse Ronan",
        "nombre_personaje": "Anna Thompson",
        "imagen_actor": "https://i.pinimg.com/736x/08/68/f3/0868f3c48a663bddfe07ed545cc0aa0a.jpg"
      }
    ],
    "trailer": "https://www.youtube.com/watch?v=YuTSYppl3t8",
    "horarios_proyeccion": [
      
    ]
  },
  {
    "id": 10,
    "titulo": "Herencia Siniestra",
    "sinopsis": "Edward y su novia Riley se embarcan en un viaje al norte de Portugal para encontrarse con la familia perdida de Edward. Al llegar a la magnífica villa, Edward está encantado de conocer a su madre y a su hermano gemelo ansioso por conectarse con sus orígenes. Pronto Edward descubrirá el terrible secreto que lo une a ellos.",
    "fecha_estreno": "01/11/2024",
    "genero": "Terror",
    "duracion": "112 minutos",
    "estado": "Próximo estreno",
    "pais_origen": "Estados Unidos",
    "imagen_pelicula": "https://i.pinimg.com/736x/38/58/59/3858598f9085d072287439a27e0d0593.jpg",
    "reparto": [
      {
        "nombre_real": "James McAvoy",
        "nombre_personaje": "Henry Collins",
        "imagen_actor": "https://i.pinimg.com/564x/56/44/f2/5644f262b29865987aee6d38471e224c.jpg"
      },
      {
        "nombre_real": "Jessica Chastain",
        "nombre_personaje": "Sarah Collins",
        "imagen_actor": "https://i.pinimg.com/564x/82/14/5a/82145acab0148a21c1d58f13db680374.jpg"
      },
      {
        "nombre_real": "Tom Hiddleston",
        "nombre_personaje": "Victor Blackwood",
        "imagen_actor": "https://i.pinimg.com/564x/5a/03/9c/5a039c8726915e79144760e78c49e58d.jpg"
      },
      {
        "nombre_real": "Anya Taylor-Joy",
        "nombre_personaje": "Emma Collins",
        "imagen_actor": "https://i.pinimg.com/736x/d0/b6/bf/d0b6bfaa7d95815a2f3023a6db53ccce.jpg"
      },
      {
        "nombre_real": "Toni Collette",
        "nombre_personaje": "Eleanor Blackwood",
        "imagen_actor": "https://i.pinimg.com/564x/f1/79/a1/f179a1ed87507446e703bbdf99386f8c.jpg"
      },
      {
        "nombre_real": "Bill Skarsgård",
        "nombre_personaje": "Charles Blackwood",
        "imagen_actor": "https://i.pinimg.com/736x/d4/71/c5/d471c5322646969269cf97946d8a76b1.jpg"
      }
    ],
    "trailer": "https://www.youtube.com/watch?v=9lBlqLm7cwY",
    "horarios_proyeccion": [
      
    ]
  },
  {
    "id": 15,
    "titulo": "Alien: Romulus",
    "sinopsis": "En un futuro lejano, un grupo de jóvenes colonos se encuentra atrapado en un planeta hostil, enfrentándose a la amenaza de una criatura alienígena letal que pone en peligro su supervivencia. La batalla por la supervivencia se convierte en una lucha por la esperanza mientras descubren secretos oscuros sobre el planeta y su propia humanidad.",
    "fecha_estreno": "15/08/2024",
    "genero": "Ciencia ficción",
    "duracion": "115 minutos",
    "estado": "En cartelera",
    "pais_origen": "Estados Unidos",
    "imagen_pelicula": "https://i.pinimg.com/736x/5e/b9/99/5eb999a7262d61432a13924865899215.jpg",
    "reparto": [
      {
        "nombre_real": "Felicity Jones",
        "nombre_personaje": "Dr. Emily Carter",
        "imagen_actor": "https://i.pinimg.com/564x/d1/58/92/d15892f382d8ba11262630859f668f07.jpg"
      },
      {
        "nombre_real": "Tom Hardy",
        "nombre_personaje": "Jack Hunter",
        "imagen_actor": "https://i.pinimg.com/564x/1a/53/65/1a536583c78a17794238e220b2868e8b.jpg"
      },
      {
        "nombre_real": "Daniel Kaluuya",
        "nombre_personaje": "Marcus Lee",
        "imagen_actor": "https://i.pinimg.com/564x/8d/34/f3/8d34f3215f46199c846922d1346f9924.jpg"
      },
      {
        "nombre_real": "Jessica Chastain",
        "nombre_personaje": "Lt. Sarah Cole",
        "imagen_actor": "https://i.pinimg.com/564x/3f/04/8d/3f048d47d60a4a7af7aa1216e38153da.jpg"
      },
      {
        "nombre_real": "Idris Elba",
        "nombre_personaje": "Commander Harris",
        "imagen_actor": "https://i.pinimg.com/736x/8c/68/b0/8c68b09afbfd004b3bb995b8ef2362f9.jpg"
      },
      {
        "nombre_real": "Riley Keough",
        "nombre_personaje": "Sophie Adams",
        "imagen_actor": "https://i.pinimg.com/564x/07/f8/10/07f8109caae4cf46c731e243ba48e06a.jpg"
      }
    ],
    "trailer": "https://www.youtube.com/watch?v=5nWH2Pd-x-c",
    "horarios_proyeccion": [
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 21,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 22,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 23,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 24,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 25,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 26,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 27,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 28,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 29,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 30,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 31,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 32,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 33,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 34,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 35,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 36,
        "precio_pelicula": 12000
      }
    ]
  },
  {
    "id": 17,
    "titulo": "Viuda Clicquot",
    "sinopsis": "La película narra la vida de Barbe-Nicole Clicquot, una mujer que, tras quedar viuda, se convierte en una figura pionera en la industria del champán. Enfrentando desafíos personales y profesionales, Barbe-Nicole transforma la pequeña casa de champán heredada de su esposo en una marca icónica, luchando contra adversidades y cambiando el curso de la historia del vino espumoso.",
    "fecha_estreno": "15/08/2024",
    "genero": "Histórico",
    "duracion": "108 minutos",
    "estado": "En cartelera",
    "pais_origen": "Francia",
    "imagen_pelicula": "https://i.pinimg.com/564x/b0/83/71/b08371f6aed0797b5952816c005f92ae.jpg",
    "reparto": [
      {
        "nombre_real": "Charlize Theron",
        "nombre_personaje": "Barbe-Nicole Clicquot",
        "imagen_actor": "https://i.pinimg.com/564x/23/1c/f1/231cf1214ef6f1d98aa4e5d649a699f2.jpg"
      },
      {
        "nombre_real": "Javier Bardem",
        "nombre_personaje": "Philippe Clicquot",
        "imagen_actor": "https://i.pinimg.com/564x/dc/92/99/dc92995a02337bf0674ec451acb85fdb.jpg"
      },
      {
        "nombre_real": "Catherine Deneuve",
        "nombre_personaje": "Madame Fleury",
        "imagen_actor": "https://i.pinimg.com/564x/7c/68/6f/7c686f67f36a3b0e3627b536e75d0e95.jpg"
      },
      {
        "nombre_real": "Omar Sy",
        "nombre_personaje": "Jean-Baptiste",
        "imagen_actor": "https://i.pinimg.com/564x/b3/f4/b8/b3f4b869ce190e158bc7a1d789c7d87b.jpg"
      },
      {
        "nombre_real": "Emily Blunt",
        "nombre_personaje": "Alice",
        "imagen_actor": "https://i.pinimg.com/564x/24/60/b9/2460b9032ea20596e8e7c4a31d12ff0f.jpg"
      },
      {
        "nombre_real": "Ralph Fiennes",
        "nombre_personaje": "Louis",
        "imagen_actor": "https://i.pinimg.com/564x/0b/26/3b/0b263b794e1451dad7d8dee42d94c0db.jpg"
      }
    ],
    "trailer": "https://www.youtube.com/watch?v=ax53qVmtCKg",
    "horarios_proyeccion": [
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 37,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 38,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 39,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 40,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 41,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 42,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 43,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 44,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 45,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 46,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 47,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 48,
        "precio_pelicula": 12000
      }
    ]
  },
  {
    "id": 18,
    "titulo": "Borderlands",
    "sinopsis": "Basada en el popular videojuego, 'Borderlands' sigue a una banda de mercenarios en busca de un misterioso artefacto en un planeta desolado. Confrontando criaturas salvajes y enemigos despiadados, el grupo debe superar traiciones y desafíos épicos para desentrañar los secretos del artefacto y salvar el planeta de una amenaza inminente.",
    "fecha_estreno": "08/08/2024",
    "genero": "Aventura",
    "duracion": "130 minutos",
    "estado": "En cartelera",
    "pais_origen": "Estados Unidos",
    "imagen_pelicula": "https://i.pinimg.com/564x/fe/40/ee/fe40ee003c72d01fe6eb214dce6734ec.jpg",
    "reparto": [
      {
        "nombre_real": "Cate Blanchett",
        "nombre_personaje": "Lilith",
        "imagen_actor": "https://i.pinimg.com/564x/82/25/71/8225713692c5ce2a860e9c26a42a365c.jpg"
      },
      {
        "nombre_real": "Kevin Hart",
        "nombre_personaje": "Roland",
        "imagen_actor": "https://i.pinimg.com/564x/7b/f4/80/7bf480e26a64d54a3933ddeb84f925f0.jpg"
      },
      {
        "nombre_real": "Jamie Lee Curtis",
        "nombre_personaje": "Tannis",
        "imagen_actor": "https://i.pinimg.com/564x/96/9f/40/969f40293c6a3f45affffbf98dd4c561.jpg"
      },
      {
        "nombre_real": "Jack Black",
        "nombre_personaje": "Claptrap",
        "imagen_actor": "https://i.pinimg.com/564x/b3/46/59/b346591df6538403991ecf1b97cc284e.jpg"
      },
      {
        "nombre_real": "Eiza González",
        "nombre_personaje": "Moxxi",
        "imagen_actor": "https://i.pinimg.com/564x/59/29/a5/5929a55998cd75e770220abdf1e3fed1.jpg"
      },
      {
        "nombre_real": "Edgar Ramirez",
        "nombre_personaje": "Handsome Jack",
        "imagen_actor": "https://i.pinimg.com/564x/05/f8/fa/05f8fa6dfec1c9d97d9bda7bfd8b7735.jpg"
      }
    ],
    "trailer": "https://www.youtube.com/watch?v=hdZnvMQRyCo",
    "horarios_proyeccion": [
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 49,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 50,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 51,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 52,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 53,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 54,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 55,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 56,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 57,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 58,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 59,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 60,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 61,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 62,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 63,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 64,
        "precio_pelicula": 12000
      }
    ]
  },
  {
    "id": 19,
    "titulo": "Cacería Sangrante",
    "sinopsis": "En una remota región montañosa, un grupo de amigos se embarca en una excursión de caza que se convierte en una pesadilla cuando descubren que son el objetivo de un despiadado asesino en serie. Mientras luchan por sobrevivir, deberán enfrentarse a sus propios miedos y traiciones mientras intentan desentrañar el oscuro motivo detrás de la cacería mortal.",
    "fecha_estreno": "19/09/2024",
    "genero": "Suspenso",
    "duracion": "105 minutos",
    "estado": "Próximo estreno",
    "pais_origen": "España",
    "imagen_pelicula": "https://i.pinimg.com/736x/7c/02/68/7c0268eea86fd2dfe4f74c6b4549c389.jpg",
    "reparto": [
      {
        "nombre_real": "Mario Casas",
        "nombre_personaje": "David",
        "imagen_actor": "https://i.pinimg.com/564x/c9/f4/79/c9f47942b431ab1d83368c9b3caad658.jpg"
      },
      {
        "nombre_real": "Aura Garrido",
        "nombre_personaje": "Laura",
        "imagen_actor": "https://i.pinimg.com/564x/75/93/df/7593dfd6b4df2b9983799ae6d60ce6b7.jpg"
      },
      {
        "nombre_real": "Javier Rey",
        "nombre_personaje": "Sergio",
        "imagen_actor": "https://i.pinimg.com/564x/c8/b6/4c/c8b64c8bba1e858f27bb70fbfd4290fe.jpg"
      },
      {
        "nombre_real": "Blanca Suárez",
        "nombre_personaje": "Ana",
        "imagen_actor": "https://i.pinimg.com/564x/53/9f/78/539f780f5362e23b3ad03ed1306f5f24.jpg"
      },
      {
        "nombre_real": "José Coronado",
        "nombre_personaje": "Inspector Ruiz",
        "imagen_actor": "https://i.pinimg.com/736x/14/dd/67/14dd67f55da6abaf8cf96325768c38b9.jpg"
      },
      {
        "nombre_real": "Luis Tosar",
        "nombre_personaje": "El Cazador",
        "imagen_actor": "https://i.pinimg.com/564x/8e/68/1c/8e681cae8214d03b93bd57c220fcc8b9.jpg"
      }
    ],
    "trailer": "https://www.youtube.com/watch?v=nkXcokdlZa4",
    "horarios_proyeccion": [
      
    ]
  },
  {
    "id": 20,
    "titulo": "Guasón 2",
    "sinopsis": "En esta esperada secuela, seguimos al infame Joker mientras navega por las consecuencias de sus actos y la creciente notoriedad que ha ganado en Gotham. La película explora su turbulenta relación con la sociedad y su impacto en el caos que envuelve a la ciudad. A medida que nuevos y antiguos enemigos surgen, el Guasón enfrenta desafíos aún más oscuros y complejos, con un viaje psicológico que desafía la moralidad y la cordura.",
    "fecha_estreno": "04/10/2024",
    "genero": "Thriller",
    "duracion": "122 minutos",
    "estado": "Próximo estreno",
    "pais_origen": "Estados Unidos",
    "imagen_pelicula": "https://i.pinimg.com/736x/ae/67/e3/ae67e3ddfe4ff6ded37149847a67c875.jpg",
    "reparto": [
      {
        "nombre_real": "Joaquin Phoenix",
        "nombre_personaje": "Arthur Fleck / Guasón",
        "imagen_actor": "https://i.pinimg.com/564x/31/75/11/317511069390af6d816474a868022fcf.jpg"
      },
      {
        "nombre_real": "Lady Gaga",
        "nombre_personaje": "Harley Quinn",
        "imagen_actor": "https://i.pinimg.com/564x/eb/da/14/ebda14fdbd752d241bdaa609eee37797.jpg"
      },
      {
        "nombre_real": "Robert De Niro",
        "nombre_personaje": "Murray Franklin",
        "imagen_actor": "https://i.pinimg.com/736x/5a/56/36/5a5636746628aa4e1d476b21b804dbe4.jpg"
      },
      {
        "nombre_real": "Zazie Beetz",
        "nombre_personaje": "Sophie Dumond",
        "imagen_actor": "https://i.pinimg.com/564x/bd/5e/50/bd5e502daf1a94b344790fd90b0543b6.jpg"
      },
      {
        "nombre_real": "Bryan Tyree Henry",
        "nombre_personaje": "Detective",
        "imagen_actor": "https://i.pinimg.com/564x/db/9c/ed/db9cedc9831e2d998117c3d9d29c1c3c.jpg"
      },
      {
        "nombre_real": "Shea Whigham",
        "nombre_personaje": "Detective Burke",
        "imagen_actor": "https://i.pinimg.com/564x/71/ed/c4/71edc4d51181b33e7952cb64ff784c8a.jpg"
      }
    ],
    "trailer": "https://www.youtube.com/watch?v=ANNyx8tNTS4",
    "horarios_proyeccion": [
      
    ]
  },
  {
    "id": 21,
    "titulo": "Robot Salvaje",
    "sinopsis": "En un futuro cercano, un ingeniero de robótica desarrolla un avanzado robot de combate que se vuelve descontrolado y comienza a causar caos en la ciudad. Con la amenaza de un colapso total, un equipo de élite debe enfrentarse al robot salvaje y desentrañar el misterio detrás de su programación para evitar una catástrofe global.",
    "fecha_estreno": "03/10/2024",
    "genero": "Ciencia ficcion",
    "duracion": "140 minutos",
    "estado": "Próximo estreno",
    "pais_origen": "Estados Unidos",
    "imagen_pelicula": "https://i.pinimg.com/736x/f2/83/7b/f2837b8c138760e9eda426f539b2caac.jpg",
    "reparto": [
      {
        "nombre_real": "Chris Hemsworth",
        "nombre_personaje": "Ethan Parker",
        "imagen_actor": "https://i.pinimg.com/736x/9b/da/6a/9bda6ac11f31732985c2d6af3338ab3b.jpg"
      },
      {
        "nombre_real": "Tessa Thompson",
        "nombre_personaje": "Dr. Laura Adams",
        "imagen_actor": "https://i.pinimg.com/564x/13/19/5b/13195b77b53da12cdbf1d5984c077f75.jpg"
      },
      {
        "nombre_real": "Idris Elba",
        "nombre_personaje": "General Carter",
        "imagen_actor": "https://i.pinimg.com/564x/9d/d6/bc/9dd6bc25789b220ed0367ba0b2606799.jpg"
      },
      {
        "nombre_real": "Zendaya",
        "nombre_personaje": "Sam",
        "imagen_actor": "https://i.pinimg.com/564x/c7/4e/41/c74e41a3cc33f2b05693676b9f9a1320.jpg"
      },
      {
        "nombre_real": "Rami Malek",
        "nombre_personaje": "Victor Ryker",
        "imagen_actor": "https://i.pinimg.com/736x/e3/ef/21/e3ef2131b89e86ed61f15bc3d34ee3e4.jpg"
      },
      {
        "nombre_real": "Emma Watson",
        "nombre_personaje": "Eliza",
        "imagen_actor": "https://i.pinimg.com/564x/dd/86/b6/dd86b635382fd8047919b6c32188b096.jpg"
      }
    ],
    "trailer": "https://www.youtube.com/watch?v=sEXyPinA4lE",
    "horarios_proyeccion": [
      
    ]
  },
  {
    "id": 22,
    "titulo": "Wicked",
    "sinopsis": "Basada en el exitoso musical, 'Wicked' explora la historia no contada de las brujas de Oz. La película sigue a Elphaba, la bruja malvada del Oeste, y Glinda, la bruja buena del Norte, revelando los eventos que llevaron a su aparente conflicto. La trama profundiza en sus orígenes, sus sueños, y la amistad que las une, mostrando un mundo de magia, traición y redención.",
    "fecha_estreno": "24/12/2024",
    "genero": "Fantasia",
    "duracion": "135 minutos",
    "estado": "Próximo estreno",
    "pais_origen": "Estados Unidos",
    "imagen_pelicula": "https://i.pinimg.com/736x/e5/7a/ca/e57acaf9257bc107394be2fe8d5c2215.jpg",
    "reparto": [
      {
        "nombre_real": "Ariana Grande",
        "nombre_personaje": "Glinda",
        "imagen_actor": "https://i.pinimg.com/736x/2f/48/38/2f48388777bf2118cf1a5fd116e97c73.jpg"
      },
      {
        "nombre_real": "Cynthia Erivo",
        "nombre_personaje": "Elphaba",
        "imagen_actor": "https://i.pinimg.com/564x/12/9d/1c/129d1c1d86b774a20e5ac5e695b67715.jpg"
      },
      {
        "nombre_real": "Jeff Goldblum",
        "nombre_personaje": "El Mago de Oz",
        "imagen_actor": "https://i.pinimg.com/564x/55/b8/f5/55b8f5faac3fb1afbb7bb19276955098.jpg"
      },
      {
        "nombre_real": "Michelle Yeoh",
        "nombre_personaje": "Madame Morrible",
        "imagen_actor": "https://i.pinimg.com/564x/39/cb/ea/39cbea77ee500fc9fb6a2fde1e777e45.jpg"
      },
      {
        "nombre_real": "Josh Gad",
        "nombre_personaje": "Boq",
        "imagen_actor": "https://i.pinimg.com/736x/8c/94/bb/8c94bbbd1e7f6a37224f852c27d4305c.jpg"
      },
      {
        "nombre_real": "Jonathan Groff",
        "nombre_personaje": "Fiyero",
        "imagen_actor": "https://i.pinimg.com/736x/20/44/d9/2044d9eb4bcc5cef4326b79ac4be3a1c.jpg"
      }
    ],
    "trailer": "https://www.youtube.com/watch?v=kaWXHtZcCQQ",
    "horarios_proyeccion": [
      
    ]
  },
  {
    "id": 23,
    "titulo": "Romper el Círculo",
    "sinopsis": "Lily Bloom se enamora de un neurocirujano tras mudarse a Boston con el objetivo de abrir su propio negocio. Sin embargo, el primer amor de su vida retoma el contacto con ella, y Lily ahora no sabe qué hacer.",
    "fecha_estreno": "15/08/2024",
    "genero": "Romance",
    "duracion": "130 minutos",
    "estado": "Próximo estreno",
    "pais_origen": "Estados Unidos",
    "imagen_pelicula": "https://i.pinimg.com/736x/dd/ac/3f/ddac3f5afffd61c1a75a358e1eee5cc7.jpg",
    "reparto": [
      {
        "nombre_real": "Blake Lively",
        "nombre_personaje": "Lily Bloom",
        "imagen_actor": "https://i.pinimg.com/564x/53/19/09/5319097fe03b2ab32fa7a11c5f49caa6.jpg"
      },
      {
        "nombre_real": "Justin Baldoni",
        "nombre_personaje": "Ryle Kincaid",
        "imagen_actor": "https://i.pinimg.com/564x/4f/0f/fe/4f0ffe374077a211ac48f25497f9be5b.jpg"
      },
      {
        "nombre_real": "Brandon Sklenar",
        "nombre_personaje": "Atlas Corrigan",
        "imagen_actor": "https://i.pinimg.com/736x/42/ca/2e/42ca2e8a9ca0c17e3b3ccb2526097ae6.jpg"
      },
      {
        "nombre_real": "Jennifer Garner",
        "nombre_personaje": "Ellie Bloom",
        "imagen_actor": "https://i.pinimg.com/564x/dc/a5/68/dca5685edb95ee347d2cb5f5260625f2.jpg"
      },
      {
        "nombre_real": "Chris Pine",
        "nombre_personaje": "Jack Sullivan",
        "imagen_actor": "https://i.pinimg.com/564x/4d/1c/79/4d1c7989603f7a09bb675f9d719267f9.jpg"
      },
      {
        "nombre_real": "Octavia Spencer",
        "nombre_personaje": "Dr. Marcia Jones",
        "imagen_actor": "https://i.pinimg.com/564x/6b/5d/bc/6b5dbcc563f9ef855be807d30b4229e4.jpg"
      }
    ],
    "trailer": "https://www.youtube.com/watch?v=aT_IzP2eJaU",
    "horarios_proyeccion": [
      
    ]
  },
  {
    "id": 24,
    "titulo": "Mascotas en Apuros",
    "sinopsis": "Un grupo de adorables mascotas se embarca en una emocionante aventura para salvar a su dueño, quien ha sido secuestrado por una misteriosa organización. Con habilidades especiales y mucho coraje, estos valientes animales deben superar desafíos y resolver acertijos para rescatar a su humano y devolver la paz a su hogar.",
    "fecha_estreno": "22/09/2024",
    "genero": "Animacion",
    "duracion": "95 minutos",
    "estado": "Próximo estreno",
    "pais_origen": "Estados Unidos",
    "imagen_pelicula": "https://i.pinimg.com/736x/93/01/53/930153f57e421386cd9b6c2e44baf6a3.jpg",
    "reparto": [
      {
        "nombre_real": "Kevin Hart",
        "nombre_personaje": "Max (el perro)",
        "imagen_actor": "https://i.pinimg.com/564x/49/1d/be/491dbecb772d2685903cd8daa66922c4.jpg"
      },
      {
        "nombre_real": "Tiffany Haddish",
        "nombre_personaje": "Roxy (la gata)",
        "imagen_actor": "https://i.pinimg.com/564x/1c/fd/64/1cfd6434c391819f600ce581d5dca675.jpg"
      },
      {
        "nombre_real": "John Cena",
        "nombre_personaje": "Rex (el bulldog)",
        "imagen_actor": "https://i.pinimg.com/564x/b3/e6/ac/b3e6ac0ffedd75940ce66a5aaaec0412.jpg"
      },
      {
        "nombre_real": "Lupita Nyong'o",
        "nombre_personaje": "Bella (la conejita)",
        "imagen_actor": "https://i.pinimg.com/564x/11/53/64/115364a77990dcd7949bd2bb40f8edcc.jpg"
      },
      {
        "nombre_real": "Milo Ventimiglia",
        "nombre_personaje": "Spike (el loro)",
        "imagen_actor": "https://i.pinimg.com/564x/45/d5/68/45d5682c352577d5527e6d8980edc9cf.jpg"
      },
      {
        "nombre_real": "Awkwafina",
        "nombre_personaje": "Zuzu (la cobaya)",
        "imagen_actor": "https://i.pinimg.com/564x/1c/fe/18/1cfe18c69c59746df354590cae7687e1.jpg"
      }
    ],
    "trailer": "https://www.youtube.com/watch?v=9OetykV5pMg",
    "horarios_proyeccion": [
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 65,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 66,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 67,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 68,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 69,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 70,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 71,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 72,
        "precio_pelicula": 12000
      }
    ]
  }
]
```



### 2. Obtener Detalles de una Película

- **URL**: `/peliculas/:idOTitulo`
- **Método**: GET
- **Parámetros de URL**:
  - `idOTitulo`: ID o título de la película
- **Descripción**: Obtiene los detalles de una película específica por su ID o título.
- **Respuesta exitosa**:
  - Código: 200
  - Contenido: Objeto con los detalles de la película
- Ejemplo: http://localhost:5001/api/peliculas/1

```
{
  "id": 1,
  "titulo": "Intensamente 2",
  "sinopsis": "Ahora que es adolescente, Riley experimenta nuevos sentimientos como Ansiedad y Envidia, que se imponen a los viejos mientras ella duda sobre si abandonar a sus antiguas amigas por otras de la escuela secundaria.",
  "fecha_estreno": "14/06/2024",
  "genero": "Animacion",
  "duracion": "107 minutos",
  "estado": "No disponible",
  "pais_origen": "Estados Unidos",
  "imagen_pelicula": "https://i.pinimg.com/564x/3b/d5/89/3bd589bab0753149306adc1b888c40a3.jpg",
  "reparto": [
    {
      "nombre_real": "Amy Poehler",
      "nombre_personaje": "Alegría",
      "imagen_actor": "https://i.pinimg.com/564x/51/8b/ef/518bef98d3bde3d6375efb2d8d3dd342.jpg"
    },
    {
      "nombre_real": "Phyllis Smith",
      "nombre_personaje": "Tristeza",
      "imagen_actor": "https://i.pinimg.com/564x/37/52/6b/37526bc89eceb9897e7d499631e4d72c.jpg"
    },
    {
      "nombre_real": "Bill Hader",
      "nombre_personaje": "Miedo",
      "imagen_actor": "https://i.pinimg.com/564x/76/7d/37/767d371db0569340c13216aed542bce1.jpg"
    },
    {
      "nombre_real": "Lewis Black",
      "nombre_personaje": "Furia",
      "imagen_actor": "https://i.pinimg.com/564x/b4/4e/d6/b44ed6fe7f945f7b1c53915169b62072.jpg"
    },
    {
      "nombre_real": "Mindy Kaling",
      "nombre_personaje": "Desagrado",
      "imagen_actor": "https://i.pinimg.com/564x/0e/a6/99/0ea699f452caff2688bfcc0db68792b7.jpg"
    },
    {
      "nombre_real": "Kaitlyn Dias",
      "nombre_personaje": "Riley",
      "imagen_actor": "https://i.pinimg.com/736x/9c/2e/7a/9c2e7a3b6ec24bdb610ad59bd2da6587.jpg"
    }
  ],
  "trailer": "https://www.youtube.com/watch?v=9bol4Yyx9Gs",
  "imagen_banner": "https://i.pinimg.com/564x/b2/42/4a/b2424a5dcf405c21a86beace9e22a5f4.jpg",
  "horarios_proyeccion": [
    {
      "fecha_proyeccion": "27/08/2024",
      "horario_proyeccion": "15:00",
      "hora_finalizacion": "16:40",
      "id_sala": 73,
      "precio_pelicula": 14000
    },
    {
      "fecha_proyeccion": "27/08/2024",
      "horario_proyeccion": "17:00",
      "hora_finalizacion": "18:40",
      "id_sala": 74,
      "precio_pelicula": 14000
    },
    {
      "fecha_proyeccion": "27/08/2024",
      "horario_proyeccion": "18:30",
      "hora_finalizacion": "20:10",
      "id_sala": 75,
      "precio_pelicula": 14000
    },
    {
      "fecha_proyeccion": "27/08/2024",
      "horario_proyeccion": "20:00",
      "hora_finalizacion": "21:40",
      "id_sala": 76,
      "precio_pelicula": 14000
    },
    {
      "fecha_proyeccion": "28/08/2024",
      "horario_proyeccion": "15:00",
      "hora_finalizacion": "16:40",
      "id_sala": 77,
      "precio_pelicula": 14000
    },
    {
      "fecha_proyeccion": "28/08/2024",
      "horario_proyeccion": "17:00",
      "hora_finalizacion": "18:40",
      "id_sala": 78,
      "precio_pelicula": 14000
    },
    {
      "fecha_proyeccion": "28/08/2024",
      "horario_proyeccion": "18:30",
      "hora_finalizacion": "20:10",
      "id_sala": 79,
      "precio_pelicula": 14000
    },
    {
      "fecha_proyeccion": "28/08/2024",
      "horario_proyeccion": "20:00",
      "hora_finalizacion": "21:40",
      "id_sala": 80,
      "precio_pelicula": 14000
    },
    {
      "fecha_proyeccion": "29/08/2024",
      "horario_proyeccion": "15:00",
      "hora_finalizacion": "16:40",
      "id_sala": 81,
      "precio_pelicula": 14000
    },
    {
      "fecha_proyeccion": "29/08/2024",
      "horario_proyeccion": "17:00",
      "hora_finalizacion": "18:40",
      "id_sala": 82,
      "precio_pelicula": 14000
    },
    {
      "fecha_proyeccion": "29/08/2024",
      "horario_proyeccion": "18:30",
      "hora_finalizacion": "20:10",
      "id_sala": 83,
      "precio_pelicula": 14000
    },
    {
      "fecha_proyeccion": "29/08/2024",
      "horario_proyeccion": "20:00",
      "hora_finalizacion": "21:40",
      "id_sala": 84,
      "precio_pelicula": 14000
    }
  ]
}
```



### 3. Obtener Películas por Estado

- **URL**: `/peliculas/estado/:estado`
- **Método**: GET
- **Parámetros de URL**:
  - `estado`: Estado de las películas (e.g., "En cartelera", "Próximo estreno")
- **Descripción**: Obtiene una lista de películas según su estado.
- **Respuesta exitosa**:
  - Código: 200
  - Contenido: Array de objetos de película
- Ejemplo: http://localhost:5001/api/peliculas/estado/En%20cartelera

```
[
  {
    "id": 8,
    "titulo": "Coraline",
    "sinopsis": "Remake live-action del clásico de animación sobre una niña que descubre una realidad alternativa siniestra.Una joven atraviesa una puerta secreta en su nuevo hogar y descubre una versión alterna de su vida. En la superficie, esta realidad paralela es sorprendentemente similar a su vida real,pero mucho mejor.",
    "fecha_estreno": "25/10/2024",
    "genero": "Fantasia",
    "duracion": "100 minutos",
    "estado": "En cartelera",
    "pais_origen": "Estados Unidos",
    "imagen_pelicula": "https://i.pinimg.com/564x/33/f8/70/33f870f74805b8c09a187310cea4f68a.jpg",
    "imagen_banner": "https://i.pinimg.com/564x/9f/ff/93/9fff931bf20f2338546532111e0ce261.jpg",
    "reparto": [
      {
        "nombre_real": "Millie Bobby Brown",
        "nombre_personaje": "Coraline Jones",
        "imagen_actor": "https://i.pinimg.com/736x/b2/62/5e/b2625e56e7f5d8d27c74c880f05a7abf.jpg"
      },
      {
        "nombre_real": "Tilda Swinton",
        "nombre_personaje": "La Otra Madre",
        "imagen_actor": "https://i.pinimg.com/564x/1f/2e/96/1f2e96076a514905ecb2c80b4f286a7d.jpg"
      },
      {
        "nombre_real": "Timothée Chalamet",
        "nombre_personaje": "Wybie Lovat",
        "imagen_actor": "https://i.pinimg.com/736x/7a/1d/b7/7a1db7fd9297c92458e35dbd11c31146.jpg"
      },
      {
        "nombre_real": "Helena Bonham Carter",
        "nombre_personaje": "La Madre",
        "imagen_actor": "https://i.pinimg.com/564x/6f/3a/27/6f3a2732df70d3f877ac67768c599829.jpg"
      },
      {
        "nombre_real": "Idris Elba",
        "nombre_personaje": "El Sr. Bobinsky",
        "imagen_actor": "https://i.pinimg.com/564x/08/46/fc/0846fc2b7188d37748a40e9e22b20704.jpg"
      },
      {
        "nombre_real": "Anya Taylor-Joy",
        "nombre_personaje": "La Otra Coraline",
        "imagen_actor": "https://i.pinimg.com/564x/c3/53/f8/c353f853acdfccba89c88e3aec2fd334.jpg"
      }
    ],
    "trailer": "https://www.youtube.com/watch?v=T6iQnnHNF50",
    "horarios_proyeccion": [
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 1,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 2,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 3,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 4,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 5,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 6,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 7,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 8,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 9,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 10,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 11,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 12,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 13,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 14,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 15,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 16,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "31/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 17,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "31/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 18,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "31/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 19,
        "precio_pelicula": 15000
      },
      {
        "fecha_proyeccion": "31/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 20,
        "precio_pelicula": 15000
      }
    ]
  },
  {
    "id": 15,
    "titulo": "Alien: Romulus",
    "sinopsis": "En un futuro lejano, un grupo de jóvenes colonos se encuentra atrapado en un planeta hostil, enfrentándose a la amenaza de una criatura alienígena letal que pone en peligro su supervivencia. La batalla por la supervivencia se convierte en una lucha por la esperanza mientras descubren secretos oscuros sobre el planeta y su propia humanidad.",
    "fecha_estreno": "15/08/2024",
    "genero": "Ciencia ficción",
    "duracion": "115 minutos",
    "estado": "En cartelera",
    "pais_origen": "Estados Unidos",
    "imagen_pelicula": "https://i.pinimg.com/736x/5e/b9/99/5eb999a7262d61432a13924865899215.jpg",
    "imagen_banner": "https://i.pinimg.com/564x/2e/c1/f0/2ec1f0a0e7f26228e814c22467ffac8d.jpg",
    "reparto": [
      {
        "nombre_real": "Felicity Jones",
        "nombre_personaje": "Dr. Emily Carter",
        "imagen_actor": "https://i.pinimg.com/564x/d1/58/92/d15892f382d8ba11262630859f668f07.jpg"
      },
      {
        "nombre_real": "Tom Hardy",
        "nombre_personaje": "Jack Hunter",
        "imagen_actor": "https://i.pinimg.com/564x/1a/53/65/1a536583c78a17794238e220b2868e8b.jpg"
      },
      {
        "nombre_real": "Daniel Kaluuya",
        "nombre_personaje": "Marcus Lee",
        "imagen_actor": "https://i.pinimg.com/564x/8d/34/f3/8d34f3215f46199c846922d1346f9924.jpg"
      },
      {
        "nombre_real": "Jessica Chastain",
        "nombre_personaje": "Lt. Sarah Cole",
        "imagen_actor": "https://i.pinimg.com/564x/3f/04/8d/3f048d47d60a4a7af7aa1216e38153da.jpg"
      },
      {
        "nombre_real": "Idris Elba",
        "nombre_personaje": "Commander Harris",
        "imagen_actor": "https://i.pinimg.com/736x/8c/68/b0/8c68b09afbfd004b3bb995b8ef2362f9.jpg"
      },
      {
        "nombre_real": "Riley Keough",
        "nombre_personaje": "Sophie Adams",
        "imagen_actor": "https://i.pinimg.com/564x/07/f8/10/07f8109caae4cf46c731e243ba48e06a.jpg"
      }
    ],
    "trailer": "https://www.youtube.com/watch?v=5nWH2Pd-x-c",
    "horarios_proyeccion": [
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 21,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 22,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 23,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 24,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 25,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 26,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 27,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 28,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 29,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 30,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 31,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 32,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 33,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 34,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 35,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 36,
        "precio_pelicula": 12000
      }
    ]
  },
  {
    "id": 17,
    "titulo": "Viuda Clicquot",
    "sinopsis": "La película narra la vida de Barbe-Nicole Clicquot, una mujer que, tras quedar viuda, se convierte en una figura pionera en la industria del champán. Enfrentando desafíos personales y profesionales, Barbe-Nicole transforma la pequeña casa de champán heredada de su esposo en una marca icónica, luchando contra adversidades y cambiando el curso de la historia del vino espumoso.",
    "fecha_estreno": "15/08/2024",
    "genero": "Histórico",
    "duracion": "108 minutos",
    "estado": "En cartelera",
    "pais_origen": "Francia",
    "imagen_pelicula": "https://i.pinimg.com/564x/b0/83/71/b08371f6aed0797b5952816c005f92ae.jpg",
    "imagen_banner": "https://i.pinimg.com/564x/4e/10/c1/4e10c1b4085e08b822cf646e44b138e0.jpg",
    "reparto": [
      {
        "nombre_real": "Charlize Theron",
        "nombre_personaje": "Barbe-Nicole Clicquot",
        "imagen_actor": "https://i.pinimg.com/564x/23/1c/f1/231cf1214ef6f1d98aa4e5d649a699f2.jpg"
      },
      {
        "nombre_real": "Javier Bardem",
        "nombre_personaje": "Philippe Clicquot",
        "imagen_actor": "https://i.pinimg.com/564x/dc/92/99/dc92995a02337bf0674ec451acb85fdb.jpg"
      },
      {
        "nombre_real": "Catherine Deneuve",
        "nombre_personaje": "Madame Fleury",
        "imagen_actor": "https://i.pinimg.com/564x/7c/68/6f/7c686f67f36a3b0e3627b536e75d0e95.jpg"
      },
      {
        "nombre_real": "Omar Sy",
        "nombre_personaje": "Jean-Baptiste",
        "imagen_actor": "https://i.pinimg.com/564x/b3/f4/b8/b3f4b869ce190e158bc7a1d789c7d87b.jpg"
      },
      {
        "nombre_real": "Emily Blunt",
        "nombre_personaje": "Alice",
        "imagen_actor": "https://i.pinimg.com/564x/24/60/b9/2460b9032ea20596e8e7c4a31d12ff0f.jpg"
      },
      {
        "nombre_real": "Ralph Fiennes",
        "nombre_personaje": "Louis",
        "imagen_actor": "https://i.pinimg.com/564x/0b/26/3b/0b263b794e1451dad7d8dee42d94c0db.jpg"
      }
    ],
    "trailer": "https://www.youtube.com/watch?v=ax53qVmtCKg",
    "horarios_proyeccion": [
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 37,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 38,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 39,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 40,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 41,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 42,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 43,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 44,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 45,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 46,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 47,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 48,
        "precio_pelicula": 12000
      }
    ]
  },
  {
    "id": 18,
    "titulo": "Borderlands",
    "sinopsis": "Basada en el popular videojuego, 'Borderlands' sigue a una banda de mercenarios en busca de un misterioso artefacto en un planeta desolado. Confrontando criaturas salvajes y enemigos despiadados, el grupo debe superar traiciones y desafíos épicos para desentrañar los secretos del artefacto y salvar el planeta de una amenaza inminente.",
    "fecha_estreno": "08/08/2024",
    "genero": "Aventura",
    "duracion": "130 minutos",
    "estado": "En cartelera",
    "pais_origen": "Estados Unidos",
    "imagen_pelicula": "https://i.pinimg.com/564x/fe/40/ee/fe40ee003c72d01fe6eb214dce6734ec.jpg",
    "imagen_banner": "https://i.pinimg.com/736x/fb/a9/78/fba978973f59209464a6de704e007564.jpg",
    "reparto": [
      {
        "nombre_real": "Cate Blanchett",
        "nombre_personaje": "Lilith",
        "imagen_actor": "https://i.pinimg.com/564x/82/25/71/8225713692c5ce2a860e9c26a42a365c.jpg"
      },
      {
        "nombre_real": "Kevin Hart",
        "nombre_personaje": "Roland",
        "imagen_actor": "https://i.pinimg.com/564x/7b/f4/80/7bf480e26a64d54a3933ddeb84f925f0.jpg"
      },
      {
        "nombre_real": "Jamie Lee Curtis",
        "nombre_personaje": "Tannis",
        "imagen_actor": "https://i.pinimg.com/564x/96/9f/40/969f40293c6a3f45affffbf98dd4c561.jpg"
      },
      {
        "nombre_real": "Jack Black",
        "nombre_personaje": "Claptrap",
        "imagen_actor": "https://i.pinimg.com/564x/b3/46/59/b346591df6538403991ecf1b97cc284e.jpg"
      },
      {
        "nombre_real": "Eiza González",
        "nombre_personaje": "Moxxi",
        "imagen_actor": "https://i.pinimg.com/564x/59/29/a5/5929a55998cd75e770220abdf1e3fed1.jpg"
      },
      {
        "nombre_real": "Edgar Ramirez",
        "nombre_personaje": "Handsome Jack",
        "imagen_actor": "https://i.pinimg.com/564x/05/f8/fa/05f8fa6dfec1c9d97d9bda7bfd8b7735.jpg"
      }
    ],
    "trailer": "https://www.youtube.com/watch?v=hdZnvMQRyCo",
    "horarios_proyeccion": [
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 49,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 50,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 51,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "27/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 52,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 53,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 54,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 55,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "28/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 56,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 57,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 58,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 59,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "29/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 60,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "15:00",
        "hora_finalizacion": "16:40",
        "id_sala": 61,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "17:00",
        "hora_finalizacion": "18:40",
        "id_sala": 62,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "18:30",
        "hora_finalizacion": "20:10",
        "id_sala": 63,
        "precio_pelicula": 12000
      },
      {
        "fecha_proyeccion": "30/08/2024",
        "horario_proyeccion": "20:00",
        "hora_finalizacion": "21:40",
        "id_sala": 64,
        "precio_pelicula": 12000
      }
    ]
  }
]
```



### 4. Buscar Películas

- **URL**: `/peliculas/buscar`
- **Método**: GET
- **Parámetros de consulta**:
  - `query`: Término de búsqueda
- **Descripción**: Busca películas basándose en un término de búsqueda.
- **Respuesta exitosa**:
  - Código: 200
  - Contenido: Array de objetos de película que coinciden con la búsqueda
- Ejemplo:
  http://localhost:5001/api/peliculas/coraline

```
{
  "id": 8,
  "titulo": "Coraline",
  "sinopsis": "Remake live-action del clásico de animación sobre una niña que descubre una realidad alternativa siniestra.Una joven atraviesa una puerta secreta en su nuevo hogar y descubre una versión alterna de su vida. En la superficie, esta realidad paralela es sorprendentemente similar a su vida real,pero mucho mejor.",
  "fecha_estreno": "25/10/2024",
  "genero": "Fantasia",
  "duracion": "100 minutos",
  "estado": "En cartelera",
  "pais_origen": "Estados Unidos",
  "imagen_pelicula": "https://i.pinimg.com/564x/33/f8/70/33f870f74805b8c09a187310cea4f68a.jpg",
  "reparto": [
    {
      "nombre_real": "Millie Bobby Brown",
      "nombre_personaje": "Coraline Jones",
      "imagen_actor": "https://i.pinimg.com/736x/b2/62/5e/b2625e56e7f5d8d27c74c880f05a7abf.jpg"
    },
    {
      "nombre_real": "Tilda Swinton",
      "nombre_personaje": "La Otra Madre",
      "imagen_actor": "https://i.pinimg.com/564x/1f/2e/96/1f2e96076a514905ecb2c80b4f286a7d.jpg"
    },
    {
      "nombre_real": "Timothée Chalamet",
      "nombre_personaje": "Wybie Lovat",
      "imagen_actor": "https://i.pinimg.com/736x/7a/1d/b7/7a1db7fd9297c92458e35dbd11c31146.jpg"
    },
    {
      "nombre_real": "Helena Bonham Carter",
      "nombre_personaje": "La Madre",
      "imagen_actor": "https://i.pinimg.com/564x/6f/3a/27/6f3a2732df70d3f877ac67768c599829.jpg"
    },
    {
      "nombre_real": "Idris Elba",
      "nombre_personaje": "El Sr. Bobinsky",
      "imagen_actor": "https://i.pinimg.com/564x/08/46/fc/0846fc2b7188d37748a40e9e22b20704.jpg"
    },
    {
      "nombre_real": "Anya Taylor-Joy",
      "nombre_personaje": "La Otra Coraline",
      "imagen_actor": "https://i.pinimg.com/564x/c3/53/f8/c353f853acdfccba89c88e3aec2fd334.jpg"
    }
  ],
  "trailer": "https://www.youtube.com/watch?v=T6iQnnHNF50",
  "imagen_banner": "https://i.pinimg.com/564x/9f/ff/93/9fff931bf20f2338546532111e0ce261.jpg",
  "horarios_proyeccion": [
    {
      "fecha_proyeccion": "27/08/2024",
      "horario_proyeccion": "15:00",
      "hora_finalizacion": "16:40",
      "id_sala": 1,
      "precio_pelicula": 15000
    },
    {
      "fecha_proyeccion": "27/08/2024",
      "horario_proyeccion": "17:00",
      "hora_finalizacion": "18:40",
      "id_sala": 2,
      "precio_pelicula": 15000
    },
    {
      "fecha_proyeccion": "27/08/2024",
      "horario_proyeccion": "18:30",
      "hora_finalizacion": "20:10",
      "id_sala": 3,
      "precio_pelicula": 15000
    },
    {
      "fecha_proyeccion": "27/08/2024",
      "horario_proyeccion": "20:00",
      "hora_finalizacion": "21:40",
      "id_sala": 4,
      "precio_pelicula": 15000
    },
    {
      "fecha_proyeccion": "28/08/2024",
      "horario_proyeccion": "15:00",
      "hora_finalizacion": "16:40",
      "id_sala": 5,
      "precio_pelicula": 15000
    },
    {
      "fecha_proyeccion": "28/08/2024",
      "horario_proyeccion": "17:00",
      "hora_finalizacion": "18:40",
      "id_sala": 6,
      "precio_pelicula": 15000
    },
    {
      "fecha_proyeccion": "28/08/2024",
      "horario_proyeccion": "18:30",
      "hora_finalizacion": "20:10",
      "id_sala": 7,
      "precio_pelicula": 15000
    },
    {
      "fecha_proyeccion": "28/08/2024",
      "horario_proyeccion": "20:00",
      "hora_finalizacion": "21:40",
      "id_sala": 8,
      "precio_pelicula": 15000
    },
    {
      "fecha_proyeccion": "29/08/2024",
      "horario_proyeccion": "15:00",
      "hora_finalizacion": "16:40",
      "id_sala": 9,
      "precio_pelicula": 15000
    },
    {
      "fecha_proyeccion": "29/08/2024",
      "horario_proyeccion": "17:00",
      "hora_finalizacion": "18:40",
      "id_sala": 10,
      "precio_pelicula": 15000
    },
    {
      "fecha_proyeccion": "29/08/2024",
      "horario_proyeccion": "18:30",
      "hora_finalizacion": "20:10",
      "id_sala": 11,
      "precio_pelicula": 15000
    },
    {
      "fecha_proyeccion": "29/08/2024",
      "horario_proyeccion": "20:00",
      "hora_finalizacion": "21:40",
      "id_sala": 12,
      "precio_pelicula": 15000
    },
    {
      "fecha_proyeccion": "30/08/2024",
      "horario_proyeccion": "15:00",
      "hora_finalizacion": "16:40",
      "id_sala": 13,
      "precio_pelicula": 15000
    },
    {
      "fecha_proyeccion": "30/08/2024",
      "horario_proyeccion": "17:00",
      "hora_finalizacion": "18:40",
      "id_sala": 14,
      "precio_pelicula": 15000
    },
    {
      "fecha_proyeccion": "30/08/2024",
      "horario_proyeccion": "18:30",
      "hora_finalizacion": "20:10",
      "id_sala": 15,
      "precio_pelicula": 15000
    },
    {
      "fecha_proyeccion": "30/08/2024",
      "horario_proyeccion": "20:00",
      "hora_finalizacion": "21:40",
      "id_sala": 16,
      "precio_pelicula": 15000
    },
    {
      "fecha_proyeccion": "31/08/2024",
      "horario_proyeccion": "15:00",
      "hora_finalizacion": "16:40",
      "id_sala": 17,
      "precio_pelicula": 15000
    },
    {
      "fecha_proyeccion": "31/08/2024",
      "horario_proyeccion": "17:00",
      "hora_finalizacion": "18:40",
      "id_sala": 18,
      "precio_pelicula": 15000
    },
    {
      "fecha_proyeccion": "31/08/2024",
      "horario_proyeccion": "18:30",
      "hora_finalizacion": "20:10",
      "id_sala": 19,
      "precio_pelicula": 15000
    },
    {
      "fecha_proyeccion": "31/08/2024",
      "horario_proyeccion": "20:00",
      "hora_finalizacion": "21:40",
      "id_sala": 20,
      "precio_pelicula": 15000
    }
  ]
}
```



## Estructura de Datos

### Objeto Película

```javascript
{
  id: Number,
  titulo: String,
  sinopsis: String,
  fecha_estreno: Date,
  genero: String,
  duracion: Number,
  estado: String,
  pais_origen: String,
  imagen_pelicula: String,
  reparto: [
    {
      nombre_real: String,
      nombre_personaje: String
    }
  ],
  trailer: String,
  horarios_proyeccion: [
    {
      fecha_proyeccion: Date,
      horario_proyeccion: String,
      hora_finalizacion: String,
      id_sala: Number,
      precio_pelicula: Number
    }
  ]
}
```

## Notas Adicionales

- Todos los endpoints devuelven los datos en formato JSON.
- En caso de error, los endpoints devolverán un objeto con una propiedad `error` que contiene un mensaje descriptivo del error.
- La función `destructor()` se llama después de cada operación para limpiar las instancias.



# Documentación de la API de Boletos

## Endpoints

### 1. Listar Boletos

- **URL**: `/boletos`
- **Método**: GET
- **Descripción**: Obtiene una lista de todos los boletos.
- Respuesta exitosa:
  - Código: 200
  - Contenido: Array de objetos de boleto

### 2. Obtener Detalle de un Boleto

- **URL**: `/boletos/:id`

- **Método**: GET

- Parámetros de URL

  :

  - `id`: ID del boleto

- **Descripción**: Obtiene los detalles de un boleto específico por su ID.

- Respuesta exitosa

  :

  - Código: 200
  - Contenido: Objeto con los detalles del boleto

### 3. Comprar Boletos

- **URL**: `/boletos/comprar`
- **Método**: POST
- **Datos del cuerpo**: Objeto con los detalles del boleto a comprar
- **Descripción**: Realiza la compra de boletos.
- Respuesta exitosa:
  - Código: 200
  - Contenido: Objeto con el resultado de la operación de compra

### 4. Consultar Disponibilidad de Asientos

- **URL**: `/boletos/disponibilidad/:idHorarioProyeccion`
- **Método**: GET
- Parámetros de URL:
  - `idHorarioProyeccion`: ID del horario de proyección
- **Descripción**: Consulta la disponibilidad de asientos para un horario de proyección específico.
- Respuesta exitosa:
  - Código: 200
  - Contenido: Objeto con la información de disponibilidad de asientos

### 5. Pagos en Línea

- **URL**: `/boletos/pago-en-linea`
- **Método**: POST
- **Datos del cuerpo**: Objeto con los detalles del pago en línea
- **Descripción**: Procesa un pago en línea para la compra de boletos.
- Respuesta exitosa:
  - Código: 200
  - Contenido: Objeto con el resultado de la operación de pago

### 6. Confirmación de Compra

- **URL**: `/boletos/confirmacion-compra`
- **Método**: POST
- **Datos del cuerpo**: Objeto con los detalles del boleto a confirmar
- **Descripción**: Confirma la compra de boletos.
- Respuesta exitosa:
  - Código: 200
  - Contenido: Objeto con el resultado de la confirmación de compra

### 7. Obtener Información Completa de Película

- **URL**: `/peliculas/:idPelicula/info-completa`
- **Método**: GET
- Parámetros de URL:
  - `idPelicula`: ID de la película
- **Descripción**: Obtiene información completa de una película, incluyendo horarios y asientos disponibles.
- Respuesta exitosa:
  - Código: 200
  - Contenido: Objeto con la información completa de la película

### 8. Obtener Boletos de Usuario

- **URL**: `/boletos/usuario/:idUsuario`
- **Método**: GET
- Parámetros de URL:
  - `idUsuario`: ID del usuario
- **Descripción**: Obtiene todos los boletos comprados por un usuario específico.
- Respuesta exitosa:
  - Código: 200
  - Contenido: Array de objetos de boleto del usuario

## Notas Adicionales

- Todos los endpoints devuelven los datos en formato JSON.
- En caso de error, los endpoints devolverán un objeto con una propiedad `error` que contiene un mensaje descriptivo del error.
- La función `destructor()` se llama después de cada operación para limpiar las instancias.
- Los controladores utilizan una instancia de la clase `Boleto` para realizar las operaciones.



# Documentación de la API de Reservas

## Endpoints

### 1. Reservar Asientos

- **URL**: `/reservas`

- **Método**: POST

- **Descripción**: Realiza una reserva de asientos para una película en un horario específico.

- Datos del cuerpo

  : Objeto con los detalles de la reserva

  - `id`: ID único de la reserva
  - `id_pelicula`: ID de la película
  - `id_horario_proyeccion`: ID del horario de proyección
  - `id_usuario`: ID del usuario que realiza la reserva
  - `asientos_reservados`: Lista de IDs de asientos a reservar
  - `fecha_reserva` (opcional): Fecha de la reserva
  - `estado` (opcional): Estado de la reserva
  - `fecha_expiracion` (opcional): Fecha de expiración de la reserva

- Respuesta exitosa:

  - Código: 201
  - Contenido: Objeto con el mensaje de éxito y los detalles de la reserva

- Respuesta de error:

  - Código: 400 o 500
  - Contenido: Objeto con el mensaje de error

### 2. Cancelar o Modificar Reserva

- **URL**: `/reservas/cancelar`
- **Método**: PUT
- **Descripción**: Cancela o actualiza una reserva existente.
- Datos del cuerpo: Objeto con los detalles de la reserva a cancelar o actualizar
  - `id`: ID de la reserva
  - `id_usuario`: ID del usuario que solicita la cancelación/actualización
  - `asientos_reservados`: Nueva lista de IDs de asientos reservados (vacía para cancelación total)
- Respuesta exitosa:
  - Código: 200
  - Contenido: Objeto con el mensaje de éxito y los detalles actualizados de la reserva
- Respuesta de error:
  - Código: 400 o 500
  - Contenido: Objeto con el mensaje de error

## Notas Adicionales

- Todos los endpoints devuelven los datos en formato JSON.
- En caso de error, los endpoints devolverán un objeto con una propiedad `error` que contiene un mensaje descriptivo del error.
- La función `destructor()` se llama después de cada operación para limpiar las instancias.
- Los controladores utilizan una instancia de la clase `reserva` para realizar las operaciones.
- La reserva de asientos verifica la disponibilidad de la película, el horario de proyección, la validez de los asientos y la existencia del usuario antes de procesar la reserva.
- La cancelación o modificación de una reserva permite liberar asientos o actualizar la lista de asientos reservados.



# Documentación de la API de Usuarios

## Endpoints

### 1. Crear Usuario

* **URL**: `/usuarios`
* **Método**: POST
* **Descripción**: Crea un nuevo usuario en el sistema.
* **Datos del cuerpo**: Objeto con los detalles del usuario a crear
  * `id`: ID único del usuario (número)
  * `nombre_completo`: Nombre completo del usuario
  * `nickname`: Apodo único del usuario
  * `email`: Correo electrónico único del usuario
  * `celular`: Número de celular único del usuario
  * `identificacion`: Número de identificación único del usuario
  * `telefono` (opcional): Número de teléfono del usuario
  * `rol`: Rol del usuario ('VIP', 'Estandar', 'Administrador')
  * `imagen_user`: URL de la imagen del usuario
  * `metodo_pago`: Array con los métodos de pago del usuario
* **Respuesta exitosa**:
  * Código: 200
  * Contenido: Objeto con el mensaje de éxito y los detalles del usuario creado
* **Respuesta de error**:
  * Código: 500
  * Contenido: Objeto con el mensaje de error

### 2. Crear Tarjeta VIP

* **URL**: `/usuarios/tarjeta-vip`
* **Método**: POST
* **Descripción**: Crea una nueva tarjeta VIP para un usuario existente.
* **Datos del cuerpo**: Objeto con los datos para crear la tarjeta VIP
  * `id_usuario` o `nickname` o `identificacion`: Identificador del usuario
* **Respuesta exitosa**:
  * Código: 200
  * Contenido: Objeto con los detalles de la tarjeta VIP creada
* **Respuesta de error**:
  * Código: 400 o 500
  * Contenido: Objeto con el mensaje de error

### 3. Consultar Usuario Detallado

* **URL**: `/usuarios/detalle`
* **Método**: GET
* **Descripción**: Consulta información detallada de un usuario, incluyendo su rol y estado de tarjeta VIP.
* **Datos del cuerpo**: Objeto con los datos para realizar la consulta
  * `admin_nickname`: Nickname del administrador que realiza la consulta
  * `admin_identificacion`: Identificación del administrador
  * `id` o `identificacion` o `nickname` o `nombre_completo`: Identificador del usuario a consultar
* **Respuesta exitosa**:
  * Código: 200
  * Contenido: Objeto con la información detallada del usuario
* **Respuesta de error**:
  * Código: 200 (con propiedad 'error')
  * Contenido: Objeto con el mensaje de error

### 4. Actualizar Rol de Usuario

* **URL**: `/usuarios/rol`
* **Método**: PUT
* **Descripción**: Actualiza el rol de un usuario y gestiona su tarjeta VIP si es necesario.
* **Datos del cuerpo**: Objeto con los datos para realizar la actualización
  * `id`: ID del usuario
  * `nuevoRol`: Nuevo rol a asignar al usuario ("VIP" o "Estandar")
* **Respuesta exitosa**:
  * Código: 200
  * Contenido: Objeto con un mensaje indicando el resultado de la operación
* **Respuesta de error**:
  * Código: 200 (con propiedad 'error')
  * Contenido: Objeto con el mensaje de error

### 5. Consultar Todos los Usuarios

* **URL**: `/consultar-todos`
* **Método**: GET
* **Descripción**: Consulta todos los usuarios del sistema con opción de filtrar por rol.
* **Parámetros de consulta**:
  * `nickname`: Nickname del administrador (requerido)
  * `identificacion`: Identificación del administrador (requerido)
  * `rol` (opcional): Rol para filtrar los usuarios ('VIP', 'Estandar', 'Administrador')
  * `nombre` (opcional): Nombre para filtrar los usuarios
* **Respuesta exitosa**:
  * Código: 200
  * Contenido: Objeto con la lista de usuarios y mensaje de estado
* **Respuesta de error**:
  * Código: 400
  * Contenido: Array con los errores de validación

## Notas Adicionales

* Todos los endpoints devuelven los datos en formato JSON.
* La autenticación y autorización se manejan a nivel de base de datos y roles de usuario.
* Los controladores utilizan una instancia de la clase `Usuario` para realizar las operaciones.
* Se debe cerrar la conexión a la base de datos después de cada operación usando el método `destructor()`.
* La creación de usuarios incluye la asignación de roles y la creación de tarjetas VIP para usuarios con rol 'VIP'.
* La consulta de usuarios está restringida a administradores y permite filtrar por rol y nombre.