import { IInsertUserReviewsModel } from "../../../Model/IInsertUserReviewsModel";
import { Operation } from "../../../Model/Operation";
import db from "../../Configuration";
import { USER_REVIEWS_DATA } from "../../TableNames/TableNames";

/**
 * This file takes care of inserting the uploaded file to DB.
 */
class InsertReviews {
    /**
     * 
     * @param userReviewsData The data which is uploaded
     * @returns 
     * 1. Operation.Created => When uploaded data successfully inserted
     * 2. Operation.Error => When any DB issue occurs.
     */
    async insert(userReviewsData: IInsertUserReviewsModel[]): Promise<Operation> {
        try {
            await db.DBInstance().dbConnector
                .insert(userReviewsData)
                .into(USER_REVIEWS_DATA)
                .then(response => response);
            return Operation.Created;
        } catch (error) {
            console.error("[DB] Error inserting user Reviews Data. Error: ", error);
            return Operation.Error;
        }
    }
}
const insertReviews = new InsertReviews();
export default insertReviews;