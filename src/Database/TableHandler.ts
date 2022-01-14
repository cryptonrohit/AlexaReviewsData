import { Knex } from "knex";
import userReviewsTable from "./TableCreation/UserReviewsTable";
import { USER_REVIEWS_DATA } from "./TableNames/TableNames";

/**
 * This file is responsible for handling the DB Table creation.
 * If in DB a table exists with name: UserReviewsData then No Table is created 
 * or else it creates a table with name: UserReviewsData
 */
class DBTableHandler {
    public async handle(dbConnector: Knex) {
        try {
            const userReviewsTableExists = await dbConnector.schema.hasTable(USER_REVIEWS_DATA);
            !userReviewsTableExists ? userReviewsTable.create(dbConnector) : this.existingTableLog();
        } catch (error) {
            console.error(`[DB] Issue creating table. Error: ${error}`);
        }
    }
    private existingTableLog() {
        console.log("[DB] Table already existing");
    }
}
const dbTableHandler = new DBTableHandler();
export default dbTableHandler;
