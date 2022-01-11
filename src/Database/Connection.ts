import Knex from "knex";

// connection URL format = "postgres://user:password@host:port/database"
class DBConnection {
    connectionToDB() {
        const configData = {
            client: "pg",
            connection: process.env.DATABASE_URL
        }
        return Knex(configData);
    }
}
const dbConnection = new DBConnection();
export default dbConnection;
