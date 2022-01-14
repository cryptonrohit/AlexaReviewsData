import { Knex } from "knex";
import { USER_REVIEWS_DATA } from "../TableNames/TableNames";

class UserReviewsTable {
    async create(dbConnector: Knex) {
        console.log(`[DB] Creating new table: ${USER_REVIEWS_DATA}`);
        return await dbConnector.schema.createTable(USER_REVIEWS_DATA , (table) => {
            table.text("review");
            table.string("author");
            table.string("review_source");
            table.integer("rating");
            table.string("title");
            table.string("product_name");
            table.timestamp("reviewed_date");
            table.index( ["review_source"], "UserReviewsData_review_source_Index");
            table.index( ["rating"], "UserReviewsData_rating_Index");
            table.index( ["reviewed_date"], "UserReviewsData_reviewed_date_Index");
        })
    }
}
const userReviewsTable = new UserReviewsTable();
export default userReviewsTable;
