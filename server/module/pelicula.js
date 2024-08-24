// archivo: module/pelicula.js
const connect = require("../helpers/connect.js");

module.exports = class Pelicula extends connect {

    static instancePelicula;
    db;
    collection;

    constructor() {
        if (Pelicula.instancePelicula) {
            return Pelicula.instancePelicula;
        }
        super();
        this.db = this.conexion.db(process.env.MONGO_DB);
        this.collection = this.db.collection('pelicula');
        Pelicula.instancePelicula = this;
    }

    destructor() {
        Pelicula.instancePelicula = undefined;
        connect.instanceConnect = undefined;
    }

/**
 * Lista todas las películas que están en cartelera o que son próximos estrenos.
 * 
 * @async
 * @function listarPeliculas
 * @returns {Promise<Array<Object>|Object>} - Una lista de películas con sus respectivos horarios o un objeto de error.
 * 
 * @example
 * const peliculas = await listarPeliculas();
 */



    async listarPeliculas() {
        try {
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

            return peliculasConHorarios;
        } catch (error) {
            return { error: `Error al listar las películas: ${error.message}` };
        }
    }

/**
 * Obtiene los detalles de una película específica, ya sea por su ID o por su título.
 * 
 * @async
 * @function obtenerDetallesPelicula
 * @param {number|string} idOTitulo - ID o título de la película.
 * @returns {Promise<Object>} - Un objeto con los detalles de la película o un objeto de error.
 * 
 * @example
 * const detalles = await obtenerDetallesPelicula('12345');
 */


    async obtenerDetallesPelicula(idOTitulo) {
        try {
            let consulta;

            if (!isNaN(idOTitulo)) {
                consulta = { id: parseInt(idOTitulo) };
            } else {
                consulta = { titulo: { $regex: new RegExp(idOTitulo, 'i') } };
            }

            const pelicula = await this.collection.findOne(consulta);

            if (!pelicula) {
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
                imagen_banner: pelicula.imagen_banner,
                horarios_proyeccion: horarios
            };
        } catch (error) {
            return { error: `Error al obtener los detalles de la película: ${error.message}` };
        }
    }


/**
 * Obtiene una lista de películas según su estado (e.g., "En cartelera", "Próximo estreno").
 * 
 * @async
 * @function obtenerPeliculasPorEstado
 * @param {Object} params - Parámetros de búsqueda.
 * @param {string} params.estado - Estado de las películas a buscar.
 * @returns {Promise<Array<Object>|Object>} - Una lista de películas con sus horarios o un objeto de error.
 * 
 * @example
 * const peliculas = await obtenerPeliculasPorEstado({ estado: 'En cartelera' });
 */


    async obtenerPeliculasPorEstado({ estado }) {
        try {
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
                        imagen_banner: 1,
                        reparto: 1,
                        trailer: 1
                    }
                }
            ).toArray();
    
            if (peliculas.length === 0) {
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
                            imagen_banner:1,
                            precio_pelicula: 1
                        }
                    }
                ).toArray();
    
                return { ...pelicula, horarios_proyeccion: horarios };
            }));
    
            return peliculasConHorarios;
        } catch (error) {
            console.error(`Error al obtener las películas por estado: ${error.message}`);
            return { error: `Error al obtener las películas por estado: ${error.message}` };
        }
    }

/**
 * Busca películas en la base de datos basándose en un término de búsqueda.
 * 
 * @async
 * @function buscarPeliculas
 * @param {string} query - Término de búsqueda.
 * @returns {Promise<Array<Object>|Object>} - Una lista de películas que coinciden con el término de búsqueda o un objeto de error.
 * 
 * @example
 * const resultados = await buscarPeliculas('acción');
 */


    async buscarPeliculas(query) {
        try {
            if (!query) {
                return { error: "Se requiere un término de búsqueda" };
            }
    
            const cleanQuery = query.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            const regexQuery = new RegExp(cleanQuery, 'i');
    
            const peliculas = await this.collection.find({
                $or: [
                    { titulo: { $regex: regexQuery } },
                    { genero: regexQuery },
                    { pais_origen: regexQuery },
                    { estado: regexQuery },
                    { "reparto.nombre_real": regexQuery },
                    { "reparto.nombre_personaje": regexQuery }
                ]
            }).toArray();
    
            if (peliculas.length === 0) {
                return { message: "No se encontraron películas que coincidan con la búsqueda" };
            }
    
            return peliculas;
        } catch (error) {
            return { error: `Error al buscar películas: ${error.message}` };
        }
    }
};
