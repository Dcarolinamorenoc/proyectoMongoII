// {
//     $jsonSchema: {
//       bsonType: 'object',
//       required: [
//         'id',
//         'id_pelicula',
//         'id_horario_proyeccion',
//         'id_usuario',
//         'asientos_comprados',
//         'modo_compra',
//         'fecha_compra',
//         'total',
//         'metodo_pago',
//         'estado_compra'
//       ],
//       properties: {
//         _id: {
//           bsonType: 'objectId',
//           description: 'Identificador único generado automáticamente.'
//         },
//         id: {
//           bsonType: 'int',
//           description: 'Identificador único de la compra. Debe ser un número entero.'
//         },
//         id_pelicula: {
//           bsonType: 'int',
//           description: 'Identificador de la película para la cual se realizó la compra. Debe ser un número entero.'
//         },
//         id_horario_proyeccion: {
//           bsonType: 'int',
//           description: 'Identificador del horario de proyección de la película. Debe ser un número entero.'
//         },
//         id_usuario: {
//           bsonType: 'int',
//           description: 'Identificador del usuario que realiza la compra. Debe ser un número entero.'
//         },
//         asientos_comprados: {
//           bsonType: 'array',
//           items: {
//             bsonType: 'int',
//             description: 'Identificador de un asiento comprado. Debe ser un número entero.'
//           },
//           description: 'Lista de identificadores de los asientos comprados, donde cada identificador debe ser un número entero.'
//         },
//         modo_compra: {
//           'enum': [
//             'presencial',
//             'virtual'
//           ],
//           description: 'Modo en que se realizó la compra. Puede ser \'presencial\' o \'virtual\'.'
//         },
//         fecha_compra: {
//           bsonType: 'string',
//           description: 'Fecha en la que se realizó la compra, en formato \'dd/mm/yyyy\'. Debe ser una cadena de caracteres.'
//         },
//         total: {
//           bsonType: 'int',
//           description: 'Total a pagar por la compra. Debe ser un número entero.'
//         },
//         metodo_pago: {
//           bsonType: 'string',
//           description: 'Método de pago utilizado para realizar la compra. Ejemplos: \'tarjeta de crédito\', \'PayPal\', \'efectivo\'. Debe ser una cadena de caracteres.'
//         },
//         id_reserva: {
//           bsonType: [
//             'int',
//             'null'
//           ],
//           description: 'Identificador único de la reserva. Puede ser un número entero o null. Este campo es opcional.'
//         },
//         estado_compra: {
//           'enum': [
//             'completada',
//             'cancelada'
//           ],
//           description: 'Estado actual de la compra. Puede ser \'completada\' o \'cancelada\'.'
//         }
//       }
//     }
//   }