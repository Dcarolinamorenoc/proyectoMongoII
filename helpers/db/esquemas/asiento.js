// {
//     $jsonSchema: {
//       bsonType: 'object',
//       required: [
//         'id',
//         'nombre_general',
//         'fila',
//         'numero',
//         'descripcion',
//         'tipo',
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
//         nombre_general: {
//           bsonType: 'string',
//           description: 'Debe ser una cadena de caracteres.'
//         },
//         fila: {
//           bsonType: 'string',
//           description: 'Debe ser una cadena de caracteres.'
//         },
//         numero: {
//           bsonType: 'int',
//           description: 'Debe ser un número entero.'
//         },
//         descripcion: {
//           bsonType: 'string',
//           description: 'Debe ser una cadena de caracteres.'
//         },
//         tipo: {
//           'enum': [
//             'estándar',
//             'premium',
//             'VIP',
//             'reclinable',
//             'discapacitados'
//           ],
//           description: 'Debe ser uno de los valores: \'estándar\', \'premium\' o \'VIP\'.'
//         },
//         estado: {
//           'enum': [
//             'disponible',
//             'reservado',
//             'ocupado'
//           ],
//           description: 'Debe ser uno de los valores: \'disponible\', \'reservado\' o \'ocupado\'.'
//         }
//       }
//     }
//   }