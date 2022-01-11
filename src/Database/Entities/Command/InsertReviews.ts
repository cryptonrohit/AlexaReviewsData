import { IUserReviewsModel } from "../../../Model/IUserReviewsModel";
import { Operation } from "../../../Model/Operation";
import db from "../../Configuration";
import { USER_REVIEWS_DATA } from "../../TableNames/TableNames";

class InsertReviews {
    async insert(userReviewsData: IUserReviewsModel[]): Promise<Operation> {
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