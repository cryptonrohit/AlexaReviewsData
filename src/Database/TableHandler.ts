import { Knex } from "knex";
import userReviewsTable from "./TableCreation/UserReviewsTable";
import { USER_REVIEWS_DATA } from "./TableNames/TableNames";

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
