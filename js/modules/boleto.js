import { connect } from "../../helpers/db/connect.js";

export class boleto extends connect {
  static instanceBoleto;
  db;
  collection;

  constructor() {
    if (boleto.instanceBoleto) {
      return boleto.instanceBoleto;
    }
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('boleto');
    boleto.instanceBoleto = this;
  }

  destructor() {
    boleto.instanceBoleto = undefined;
    connect.instanceConnect = undefined;
  }


//--------------------------------------------------------------------------------------------------------

    // Compra de boletos para una película específica

    async comprarBoletos(datosBoleto) {
        
        try {
        await this.conexion.connect();

        
        const boletoExistente = await this.collection.findOne({ id: datosBoleto.id });
        if (boletoExistente) {
            throw new Error('El ID del boleto ya existe.');
        }

        
        const pelicula = await this.db.collection('pelicula').findOne({ id: datosBoleto.id_pelicula, estado: { $in: ["En cartelera", "Próximo estreno"] } });
        if (!pelicula) {
            throw new Error('La película no existe o no está disponible para compra de boletos.');
        }

        
        const horarioProyeccion = await this.db.collection('horario_proyeccion').findOne({ id: datosBoleto.id_horario_proyeccion, id_pelicula: datosBoleto.id_pelicula });
        if (!horarioProyeccion) {
            throw new Error('El horario de proyección no es válido para esta película.');
        }

        
        const usuario = await this.db.collection('usuario').findOne({ id: datosBoleto.id_usuario });
        if (!usuario) {
            throw new Error('El usuario especificado no existe.');
        }

        
        const sala = await this.db.collection('sala').findOne({ id: horarioProyeccion.id_sala });
        if (!sala) {
            throw new Error('No se encontró la sala asociada a este horario de proyección.');
        }

        const asientosValidos = datosBoleto.asientos_comprados.every(asientoId => sala.asientos.includes(asientoId));
        if (!asientosValidos) {
            throw new Error('Uno o más asientos seleccionados no pertenecen a la sala de esta proyección.');
        }

        const asientosDisponibles = await this.db.collection('asiento').countDocuments({ id: { $in: datosBoleto.asientos_comprados }, estado: 'disponible' });
        if (asientosDisponibles !== datosBoleto.asientos_comprados.length) {
            throw new Error('Uno o más asientos seleccionados no están disponibles.');
        }

        
        if (datosBoleto.id_reserva !== null) {
            const reserva = await this.db.collection('reserva').findOne({ id: datosBoleto.id_reserva });
            if (!reserva) {
            throw new Error('La reserva especificada no existe.');
            }
        }

        
        const total = horarioProyeccion.precio_pelicula * datosBoleto.asientos_comprados.length;

        
        const nuevoBoleto = {
            ...datosBoleto,
            total: total,
            fecha_compra: new Date().toLocaleDateString('es-ES'),
            estado_compra: 'completada'
        };

        
        await this.collection.insertOne(nuevoBoleto);

        
        await this.db.collection('asiento').updateMany(
            { id: { $in: datosBoleto.asientos_comprados } },
            { $set: { estado: 'ocupado' } }
        );

        await this.conexion.close();
        return { mensaje: 'Compra realizada con éxito', detallesBoleto: nuevoBoleto };
        } catch (error) {
        await this.conexion.close();
        return { error: `Error al realizar la compra: ${error.message}` };
        }
    }



//--------------------------------------------------------------------------------------------------------



}