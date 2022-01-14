import { Knex } from "knex";
import { USER_REVIEWS_DATA } from "../TableNames/TableNames";

/**
 * This file creates the table with 7 columns :  
 * review, author, review_source, rating, title, product_name, reviewed_date
 */
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
        })
    }
}
const userReviewsTable = new UserReviewsTable();
export default userReviewsTable;
