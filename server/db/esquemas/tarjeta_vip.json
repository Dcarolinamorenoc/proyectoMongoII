// {
//     $jsonSchema: {
//       bsonType: 'object',
//       required: [
//         'id',
//         'id_usuario',
//         'numero',
//         'porcentaje_descuento',
//         'fecha_expiracion',
//         'estado'
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
//           description: 'Debe ser un número entero que representa el ID del usuario al que se asigna el cupón.'
//         },
//         numero: {
//           bsonType: 'string',
//           description: 'Debe ser una cadena de caracteres que representa el número único del cupón.'
//         },
//         porcentaje_descuento: {
//           bsonType: 'int',
//           minimum: 0,
//           maximum: 100,
//           description: 'Debe ser un número entero entre 0 y 100, que representa el porcentaje de descuento del cupón.'
//         },
//         fecha_expiracion: {
//           bsonType: 'string',
//           pattern: '^\\d{2}/\\d{2}/\\d{4}$',
//           description: 'Debe estar en formato DD/MM/YYYY, que indica la fecha de expiración del cupón.'
//         },
//         estado: {
//           'enum': [
//             'activa',
//             'expirada',
//             'cancelada'
//           ],
//           description: 'Debe ser uno de los valores: \'activa\', \'expirada\' o \'cancelada\'.'
//         }
//       }
//     }
//   }