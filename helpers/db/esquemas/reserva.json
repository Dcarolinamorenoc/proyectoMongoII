// {
//     $jsonSchema: {
//       bsonType: 'object',
//       required: [
//         'id',
//         'id_usuario',
//         'fecha_reserva',
//         'estado',
//         'fecha_expiracion',
//         'asientos_reservados',
//         'id_pelicula',
//         'id_horario_proyeccion'
//       ],
//       properties: {
//         _id: {
//           bsonType: 'objectId'
//         },
//         id: {
//           bsonType: 'int',
//           description: 'Debe ser un número entero.'
//         },
//         id_usuario: {
//           bsonType: 'int',
//           description: 'Debe ser un número entero que representa el ID del usuario.'
//         },
//         fecha_reserva: {
//           bsonType: 'string',
//           pattern: '^\\d{2}/\\d{2}/\\d{4}$',
//           description: 'Debe estar en formato DD/MM/YYYY.'
//         },
//         estado: {
//           'enum': [
//             'activa',
//             'expirada',
//             'cancelada'
//           ],
//           description: 'Debe ser uno de los valores: \'activa\', \'expirada\' o \'cancelada\'.'
//         },
//         fecha_expiracion: {
//           bsonType: 'string',
//           pattern: '^\\d{2}/\\d{2}/\\d{4}$',
//           description: 'Debe estar en formato DD/MM/YYYY.'
//         },
//         asientos_reservados: {
//           bsonType: 'array',
//           items: {
//             bsonType: 'int'
//           },
//           description: 'Debe ser un arreglo de números enteros que representan los asientos reservados.'
//         },
//         id_pelicula: {
//           bsonType: 'int',
//           description: 'Debe ser un número entero que representa el ID de la película.'
//         },
//         id_horario_proyeccion: {
//           bsonType: 'int',
//           description: 'Debe ser un número entero que representa el ID del horario de proyección.'
//         }
//       }
//     }
//   }