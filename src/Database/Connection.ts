import Knex from "knex";

class DBConnection {
    connectionToDB() {
        const configData = {
            client: "pg",
            connection: {
                host: "localhost",
                user: "postgres",
                password: "crypton10",
                database: "postgres",
                port: 5432
            }
        }
        return Knex(configData);
    }
}
const dbConnection = new DBConnection();
export default dbConnection;
