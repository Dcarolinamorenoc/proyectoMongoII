import {connect} from "../helpers/connect.js";

export class pelicula extends connect {

    static instancePelicula;
    db;
    collection;

    constructor() {
        if (pelicula.instancePelicula) {
            return pelicula.instancePelicula;
        }
        super();
        this.db = this.conexion.db(process.env.MONGO_DB);
        this.collection = this.db.collection('pelicula');
        pelicula.instancePelicula = this;
    }

    destructor() {
        pelicula.instancePelicula = undefined;
        connect.instanceConnect = undefined;
    }

    
//--------------------------------------------------------------------------------------------------------

    /**
     * Lista todas las películas en cartelera o de próximo estreno con sus horarios de proyección.
     *
     * @async
     * @returns {Promise<Array<Object>|Object>} - Un array de objetos con la información de las películas y sus horarios, o un objeto con un mensaje de error.
     * @property {number} id - ID único de la película.
     * @property {string} titulo - Título de la película.
     * @property {string} sinopsis - Resumen breve de la trama de la película.
     * @property {Date} fecha_estreno - Fecha de estreno de la película.
     * @property {string} genero - Género de la película.
     * @property {number} duracion - Duración de la película en minutos.
     * @property {string} estado - Estado actual de la película ("En cartelera" o "Próximo estreno").
     * @property {string} pais_origen - País de origen de la película.
     * @property {Array<Object>} horarios_proyeccion - Lista de horarios de proyección para la película.
     * @property {Date} horarios_proyeccion.fecha_proyeccion - Fecha de la proyección.
     * @property {string} horarios_proyeccion.horario_proyeccion - Hora de inicio de la proyección.
     * @property {string} horarios_proyeccion.hora_finalizacion - Hora de finalización de la proyección.
     * @property {number} horarios_proyeccion.id_sala - ID de la sala de proyección.
     * @property {number} horarios_proyeccion.precio_pelicula - Precio de la entrada para esta proyección.
     */


    //  Listar Películas

    async listarPeliculas() {
        try {
            await this.conexion.connect();
            
            const peliculas = await this.collection.find({
                estado: { $in: ["En cartelera", "Próximo estreno"] }
            }).toArray();
    
            const peliculasConHorarios = await Promise.all(peliculas.map(async (pelicula) => {
                const horarios = await this.db.collection('horario_proyeccion').find(
                    { id_pelicula: pelicula.id },
                    {
                        projection: {
                            _id: 0,
                            fecha_proyeccion: 1,
                            horario_proyeccion: 1,
                            hora_finalizacion: 1,
                            id_sala: 1,
                            precio_pelicula: 1
                        }
                    }
                ).toArray();
    
                return {
                    id: pelicula.id,
                    titulo: pelicula.titulo,
                    sinopsis: pelicula.sinopsis,
                    fecha_estreno: pelicula.fecha_estreno,
                    genero: pelicula.genero,
                    duracion: pelicula.duracion,
                    estado: pelicula.estado,
                    pais_origen: pelicula.pais_origen,
                    imagen_pelicula: pelicula.imagen_pelicula,
                    reparto: pelicula.reparto,
                    trailer: pelicula.trailer,
                    horarios_proyeccion: horarios
                };
            }));
    
            await this.conexion.close();
            return peliculasConHorarios;
        } catch (error) {
            await this.conexion.close();
            return { error: `Error al listar las películas: ${error.message}` };
        }
    }

//--------------------------------------------------------------------------------------------------------

    /**
     * Obtiene los detalles de una película específica por su ID o título, incluyendo sus horarios de proyección.
     *
     * @async
     * @param {number|string} idOTitulo - El ID numérico o el título de la película a buscar.
     * @returns {Promise<Object>} - Un objeto con los detalles de la película y sus horarios de proyección, o un objeto con un mensaje de error.
     * @property {number} id - ID único de la película.
     * @property {string} titulo - Título de la película.
     * @property {string} sinopsis - Resumen breve de la trama de la película.
     * @property {Date} fecha_estreno - Fecha de estreno de la película.
     * @property {string} genero - Género de la película.
     * @property {number} duracion - Duración de la película en minutos.
     * @property {string} estado - Estado actual de la película.
     * @property {string} pais_origen - País de origen de la película.
     * @property {Array<Object>} horarios_proyeccion - Lista de horarios de proyección para la película.
     * @property {Date} horarios_proyeccion.fecha_proyeccion - Fecha de la proyección.
     * @property {string} horarios_proyeccion.horario_proyeccion - Hora de inicio de la proyección.
     * @property {string} horarios_proyeccion.hora_finalizacion - Hora de finalización de la proyección.
     * @property {number} horarios_proyeccion.id_sala - ID de la sala de proyección.
     * @property {number} horarios_proyeccion.precio_pelicula - Precio de la entrada para esta proyección.
     */
    

    // Obtener Detalles de Película

    async obtenerDetallesPelicula(idOTitulo) {
        try {
            await this.conexion.connect();
            let consulta;
            
            if (!isNaN(idOTitulo)) {
                consulta = { id: parseInt(idOTitulo) };
            } else {
                consulta = { titulo: { $regex: new RegExp(idOTitulo, 'i') } };
            }
    
            const pelicula = await this.collection.findOne(consulta);
    
            if (!pelicula) {
                await this.conexion.close();
                return { error: `No se encontró una película con el ID o título ${idOTitulo}` };
            }
    
            const horarios = await this.db.collection('horario_proyeccion').find(
                { id_pelicula: pelicula.id },
                {
                    projection: {
                        _id: 0,
                        fecha_proyeccion: 1,
                        horario_proyeccion: 1,
                        hora_finalizacion: 1,
                        id_sala: 1,
                        precio_pelicula: 1
                    }
                }
            ).toArray();
    
            await this.conexion.close();
    
            return {
                id: pelicula.id,
                titulo: pelicula.titulo,
                sinopsis: pelicula.sinopsis,
                fecha_estreno: pelicula.fecha_estreno,
                genero: pelicula.genero,
                duracion: pelicula.duracion,
                estado: pelicula.estado,
                pais_origen: pelicula.pais_origen,
                imagen_pelicula: pelicula.imagen_pelicula,
                reparto: pelicula.reparto,
                trailer: pelicula.trailer,
                horarios_proyeccion: horarios
            };
        } catch (error) {
            await this.conexion.close();
            return { error: `Error al obtener los detalles de la película: ${error.message}` };
        }
    }


    /**
 * Obtiene las películas según el estado especificado.
 *
 * @async
 * @param {Object} filtro - Objeto con los criterios de filtrado.
 * @param {string} filtro.estado - Estado de las películas a buscar (ej. "En cartelera").
 * @returns {Promise<Array<Object>>} - Un array con los detalles de las películas filtradas, o un objeto con un mensaje de error.
 * @property {number} id - ID único de la película.
 * @property {string} titulo - Título de la película.
 * @property {string} sinopsis - Resumen breve de la trama de la película.
 * @property {Date} fecha_estreno - Fecha de estreno de la película.
 * @property {string} genero - Género de la película.
 * @property {number} duracion - Duración de la película en minutos.
 * @property {string} estado - Estado actual de la película.
 * @property {string} pais_origen - País de origen de la película.
 * @property {Array<Object>} horarios_proyeccion - Lista de horarios de proyección para la película.
 * @property {Date} horarios_proyeccion.fecha_proyeccion - Fecha de la proyección.
 * @property {string} horarios_proyeccion.horario_proyeccion - Hora de inicio de la proyección.
 * @property {string} horarios_proyeccion.hora_finalizacion - Hora de finalización de la proyección.
 * @property {number} horarios_proyeccion.id_sala - ID de la sala de proyección.
 * @property {number} horarios_proyeccion.precio_pelicula - Precio de la entrada para esta proyección.
 */
async obtenerPeliculasPorEstado({ estado }) {
    try {
        await this.conexion.connect();

        const peliculas = await this.collection.find(
            { estado: estado },
            {
                projection: {
                    _id: 0,
                    id: 1,
                    titulo: 1,
                    sinopsis: 1,
                    fecha_estreno: 1,
                    genero: 1,
                    duracion: 1,
                    estado: 1,
                    pais_origen: 1,
                    imagen_pelicula: 1,
                    reparto: 1,
                    trailer: 1
                }
            }
        ).toArray();

        if (peliculas.length === 0) {
            await this.conexion.close();
            return { error: `No se encontraron películas con el estado: ${estado}` };
        }

        const peliculasConHorarios = await Promise.all(peliculas.map(async (pelicula) => {
            const horarios = await this.db.collection('horario_proyeccion').find(
                { id_pelicula: pelicula.id },
                {
                    projection: {
                        _id: 0,
                        fecha_proyeccion: 1,
                        horario_proyeccion: 1,
                        hora_finalizacion: 1,
                        id_sala: 1,
                        precio_pelicula: 1
                    }
                }
            ).toArray();

            return { ...pelicula, horarios_proyeccion: horarios };
        }));

        await this.conexion.close();
        return peliculasConHorarios;
    } catch (error) {
        await this.conexion.close();
        return { error: `Error al obtener las películas: ${error.message}` };
    }
}
}