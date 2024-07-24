import { connect } from "../../helpers/db/connect.js"

import { ObjectId } from "mongodb";


export class test extends connect {
    static instanceTest;
    db;
    collection;

    constructor() {
        if (test.instanceTest) {
            return test.instanceTest;
        }
        super();
        this.db = this.conexion.db(this.getDbName);
        this.collection = this.db.collection('test');
        test.instanceTest = this;
    }
    destructor() {
        test.instanceTest = undefined;
        connect.instanceConnect = undefined;
    }


    // Esta parte de aquí es solo para probar la conexion, no va a devolver nada en la terminal

    async getAllTest() {
        await this.conexion.connect();
        const collection = this.db.collection('test');
        const data = await collection.find({}).toArray();
        await this.conexion.close();
        return data;
    }
}