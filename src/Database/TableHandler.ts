import { Knex } from "knex";

class DBTableHandler {
    public async handle(dbConnector: Knex) {
        try {
            
        } catch (error) {
            console.error(`[DB] Issue creating table. Error: ${error}`);
        }
    }
}
const dbTableHandler = new DBTableHandler();
export default dbTableHandler;
