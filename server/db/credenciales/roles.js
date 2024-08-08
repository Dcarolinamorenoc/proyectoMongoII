
// Rol de Usuario administrador

({
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
  

//--------------------------------------------------------------------------------------------------------

// Rol de Usuario Estandar

(
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

//--------------------------------------------------------------------------------------------------------

// Rol de Usuario VIP

(
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