import Knex from "knex";

// connection URL format = "postgres://user:password@host:port/database"
class DBConnection {
    connectionToDB() {
        const configData = {
            client: "pg",
            connection: {
                host: "ec2-174-129-37-144.compute-1.amazonaws.com",
                user: "fozhrhaekupvez",
                password: "db88d2b110e6f9dc4a40da5f522e0c054a05d27885a2ce5e1d76cf60eb50d837",
                database: "d10ntjiount1qd",
                port: 5432,
                ssl: { 
                    rejectUnauthorized: false 
                }
            }
        }
        return Knex(configData);
    }
}
const dbConnection = new DBConnection();
export default dbConnection;
