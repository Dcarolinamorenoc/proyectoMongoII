import { connect } from "../../helpers/db/connect.js";

export class pelicula extends connect {
    static instancePelicula;
    db;
    collection;

    constructor() {
        if (pelicula.instancePelicula) {
            return pelicula.instancePelicula;
        }
        super();
        this.db = this.conexion.db(this.getDbName);
        this.collection = this.db.collection('pelicula');
        pelicula.instancePelicula = this;
    }

    destructor() {
        pelicula.instancePelicula = undefined;
        connect.instanceConnect = undefined;
    }

    
//--------------------------------------------------------------------------------------------------------


    //  Listar Películas

    async listarPeliculas() {
        try {
            await this.conexion.connect();
            const peliculas = await this.collection.find({
                estado: { $in: ["En cartelera", "Próximo estreno"] }
            }, {
                projection: {
                    _id: 0,
                    id: 1,
                    titulo: 1,
                    genero: 1,
                    duracion: 1,
                    estado: 1
                }
            }).toArray();
            await this.conexion.close();
            return peliculas;
        } catch (error) {
            await this.conexion.close();
            return { error: `Error al listar las películas: ${error.message}` };
        }
    }


//--------------------------------------------------------------------------------------------------------


    // Obtener Detalles de Película
    async obtenerDetallesPelicula(idOTitulo) {
        try {
            await this.conexion.connect();
            const consulta = {
                $or: [
                    { id: parseInt(idOTitulo) },
                    { titulo: { $regex: new RegExp(idOTitulo, 'i') } }
                ]
            };
            const pelicula = await this.collection.findOne(consulta, {
                projection: {
                    _id: 0,
                    id: 1,
                    titulo: 1,
                    sinopsis: 1,
                    fecha_estreno: 1,
                    genero: 1,
                    duracion: 1,
                    estado: 1,
                    pais_origen: 1
                }
            });
            await this.conexion.close();
            if (!pelicula) {
                return { error: `No se encontró una película con el ID o título ${idOTitulo}` };
            }
            return pelicula;
        } catch (error) {
            await this.conexion.close();
            return { error: `Error al obtener los detalles de la película: ${error.message}` };
        }
    }
}