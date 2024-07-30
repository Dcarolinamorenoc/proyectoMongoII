// {
//     $jsonSchema: {
//       bsonType: 'object',
//       required: [
//         'id',
//         'titulo',
//         'sinopsis',
//         'fecha_estreno',
//         'genero',
//         'duracion',
//         'estado',
//         'pais_origen'
//       ],
//       properties: {
//         _id: {
//           bsonType: 'objectId'
//         },
//         id: {
//           bsonType: 'int',
//           description: 'Debe ser un número entero.'
//         },
//         titulo: {
//           bsonType: 'string',
//           description: 'Debe ser una cadena de caracteres.'
//         },
//         sinopsis: {
//           bsonType: 'string',
//           description: 'Debe ser una cadena de caracteres.'
//         },
//         fecha_estreno: {
//           bsonType: 'string',
//           pattern: '^\\d{2}/\\d{2}/\\d{4}$',
//           description: 'Debe estar en formato DD/MM/YYYY.'
//         },
//         genero: {
//           bsonType: 'string',
//           description: 'Debe ser una cadena de caracteres.'
//         },
//         duracion: {
//           bsonType: 'string',
//           description: 'Debe ser una cadena de caracteres.'
//         },
//         estado: {
//           'enum': [
//             'En cartelera',
//             'Próximo estreno',
//             'No disponible'
//           ],
//           description: 'Debe ser uno de los valores: \'En cartelera\', \'Próximo estreno\' o \'No disponible\'.'
//         },
//         pais_origen: {
//           bsonType: 'string',
//           description: 'Debe ser una cadena de caracteres.'
//         }
//       }
//     }
//   }