import { Knex } from "knex";
import { USER_REVIEWS_DATA } from "../TableNames/TableNames";

class UserReviewsTable {
    async create(dbConnector: Knex) {
        console.log(`[DB] Creating new table: ${USER_REVIEWS_DATA}`);
    }
}
const userReviewsTable = new UserReviewsTable();
export default userReviewsTable;
