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

    // Listar Películas
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


}