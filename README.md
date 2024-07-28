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
   
   en caso de no ser encontrada la pelicula por su nombre devolvera lo siguiente en consola:
   
   ```js
   let objPelicula = new pelicula();
   
   console.log(await objPelicula.obtenerDetallesPelicula("Tom y Jerry"));
   
   objPelicula.destructor();
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
   
   en caso de no ser encontrada la pelicula por su nombre devolvera lo siguiente en consola:
   
   ```js
   let objPelicula = new pelicula();
   
   console.log(await objPelicula.obtenerDetallesPelicula("56"));
   
   objPelicula.destructor();
   ```
   
   
   
   
   ☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆
   
   
   
2. ### **Compra de Boletos:**
   
   ★ **API para Comprar Boletos:** Permitir la compra de boletos para una película específica, incluyendo la selección de la fecha y la hora de la proyección.
   
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
   
   
   
   ★ **API para Verificar Disponibilidad de Asientos:** Permitir la consulta de la disponibilidad de asientos en una sala para una proyección específica.
   
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
   
   **reservarAsientos(datosReserva):** Realiza la reserva de asientos para una película. 
   
   **Parámetros:**Un objeto con los siguientes datos: 
   
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
   
   ```
   
   ```
   
   
   
   ★ **API para Verificar Tarjeta VIP:** Permitir la verificación de la validez de una tarjeta VIP durante el proceso de compra.
   
   ```
   
   ```
   
   
   
   
   ☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆
   
   
   
5. - Roles Definidos:
     - **Administrador:** Tiene permisos completos para gestionar el sistema, incluyendo la venta de boletos en el lugar físico. Los administradores no están involucrados en las compras en línea realizadas por los usuarios.
     
     - **Usuario Estándar:** Puede comprar boletos en línea sin la intervención del administrador.
     
     - **Usuario VIP:** Puede comprar boletos en línea con descuentos aplicables para titulares de tarjetas VIP.
     
       
     
     ★ **API para Crear Usuario:** Permitir la creación de nuevos usuarios en el sistema, asignando roles y privilegios específicos (usuario estándar, usuario VIP o administrador).
     
     ```
     
     ```
     
     
     
     ★ **API para Obtener Detalles de Usuario:** Permitir la consulta de información detallada sobre un usuario, incluyendo su rol y estado de tarjeta VIP.
     
     ```
     
     ```
     
     
     
     ★ **API para Actualizar Rol de Usuario:** Permitir la actualización del rol de un usuario (por ejemplo, cambiar de usuario estándar a VIP, o viceversa).
     
     ```
     
     ```
     
     
     
     ★ **API para Listar Usuarios:** Permitir la consulta de todos los usuarios del sistema, con la posibilidad de filtrar por rol (VIP, estándar o administrador).
     
     ```
     
     ```
   
   
   
   
   ☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆*ﾟ ゜ﾟ*☆
   
   
   
6. **Compras en Línea:**
   
   ★ **API para Procesar Pagos:** Permitir el procesamiento de pagos en línea para la compra de boletos.
   
   ```
   
   ```
   
   
   
   ★ **API para Confirmación de Compra:** Enviar confirmación de la compra y los detalles del boleto al usuario.
   
   ```
   
   ```



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



### Esquemas utilizados para cada coleccion





─────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀──────────❀◦❀◦❀─────



### Data utilizada para cada coleccion