import Knex from "knex";
/**
 * This file is responsible for making connection to DB.
 */

class DBConnection {
    connectionToDB() {
        const configData = {
            client: "pg",
            connection: {
                connectionString: process.env.DATABASE_URL,
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
