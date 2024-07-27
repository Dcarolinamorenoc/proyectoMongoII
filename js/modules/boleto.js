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


    /**
     * Realiza la compra de boletos para una película.
     *
     * @async
     * @param {Object} datosBoleto - Datos del boleto a comprar.
     * @param {number} datosBoleto.id - ID único del boleto.
     * @param {number} datosBoleto.id_pelicula - ID de la película.
     * @param {number} datosBoleto.id_horario_proyeccion - ID del horario de proyección.
     * @param {number} datosBoleto.id_usuario - ID del usuario que realiza la compra.
     * @param {Array<number>} datosBoleto.asientos_comprados - Array de IDs de los asientos comprados.
     * @param {string} datosBoleto.modo_compra - Modo de compra (ej. "virtual", "presencial").
     * @param {string} datosBoleto.metodo_pago - Método de pago utilizado.
     * @param {number|null} datosBoleto.id_reserva - ID de la reserva (si aplica), puede ser null.
     * @returns {Promise<Object>} Objeto con el resultado de la operación.
     * @property {string} [mensaje] - Mensaje de éxito si la compra se realiza correctamente.
     * @property {Object} [detallesBoleto] - Detalles del boleto comprado si la operación es exitosa.
     * @property {number} detallesBoleto.id - ID del boleto.
     * @property {number} detallesBoleto.id_pelicula - ID de la película.
     * @property {number} detallesBoleto.id_horario_proyeccion - ID del horario de proyección.
     * @property {number} detallesBoleto.id_usuario - ID del usuario.
     * @property {Array<number>} detallesBoleto.asientos_comprados - IDs de los asientos comprados.
     * @property {string} detallesBoleto.modo_compra - Modo de compra.
     * @property {string} detallesBoleto.metodo_pago - Método de pago.
     * @property {number} detallesBoleto.total - Monto total de la compra.
     * @property {string} detallesBoleto.fecha_compra - Fecha de la compra.
     * @property {string} detallesBoleto.estado_compra - Estado de la compra.
     * @property {number} [detallesBoleto.id_reserva] - ID de la reserva (si aplica).
     * @property {string} [error] - Mensaje de error si la compra falla.
     * @throws {Error} Si ocurre algún error durante el proceso de compra.
     */


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



    // Consultar disponibilidad de asientos en una sala específica

    async consultarDisponibilidadAsientos(idHorarioProyeccion) {

        try {
        await this.conexion.connect();
    
        
        const horarioProyeccion = await this.db.collection('horario_proyeccion').findOne({ id: idHorarioProyeccion });
        if (!horarioProyeccion) {
            throw new Error('Horario de proyección no encontrado.');
        }
    
        
        const sala = await this.db.collection('sala').findOne({ id: horarioProyeccion.id_sala });
        if (!sala) {
            throw new Error('Sala no encontrada.');
        }
    
        
        const boletosVendidos = await this.collection.find({ id_horario_proyeccion: idHorarioProyeccion }).toArray();
        const asientosOcupados = boletosVendidos.flatMap(boleto => boleto.asientos_comprados);
    
        
        const asientosDisponibles = await this.db.collection('asiento').find(
            { 
            id: { $in: sala.asientos, $nin: asientosOcupados },
            estado: 'disponible'
            }
        ).toArray();
    
        
        const asientosDisponibilidad = asientosDisponibles.map(asiento => ({
            id: asiento.id,
            nombre: asiento.nombre_general,
            fila: asiento.fila,
            numero: asiento.numero,
            tipo: asiento.tipo,
            estado: asiento.estado
        }));
    
        await this.conexion.close();

        return {
            idHorarioProyeccion: horarioProyeccion.id,
            fechaProyeccion: horarioProyeccion.fecha_proyeccion,
            horarioProyeccion: horarioProyeccion.horario_proyeccion,
            idSala: sala.id,
            nombreSala: sala.nombre,
            capacidadTotal: sala.capacidad,
            asientosDisponibles: asientosDisponibilidad.length,
            asientos: asientosDisponibilidad
        };

        } catch (error) {
        await this.conexion.close();
        return { error: `Error al consultar disponibilidad de asientos: ${error.message}` };
        }
    }
}