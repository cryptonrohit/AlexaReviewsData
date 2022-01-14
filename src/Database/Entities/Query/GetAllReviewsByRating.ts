import { IGetUserReviewsResponseModel } from "../../../Model/IGetUserReviewsResponseModel";
import { IInsertUserReviewsModel } from "../../../Model/IInsertUserReviewsModel";
import { Operation } from "../../../Model/Operation";
import db from "../../Configuration";
import { USER_REVIEWS_DATA } from "../../TableNames/TableNames";

/**
 * This file gets the review data on the basis of rating passed.
 */
class GetAllReviewsByRating {
    /**
     * 
     * @param rating The rating of the app. It should be between 1-5.
     * @returns 
     * data: [], totalCount: 0, status: Operation.NoDataFound => When no data in DB
     * data: data from DB, totalCount: no. of data from DB, status: Operation.Success => When data in DB
     * status: Operation.Error => When any DB error occurs.
     */
    async get(rating: number): Promise<IGetUserReviewsResponseModel> {
        try {
            const queryBuilder = db.DBInstance().dbConnector
                .select("*").from(USER_REVIEWS_DATA)
                .where({rating})
            const reviewsDataByRating: IInsertUserReviewsModel[] = await queryBuilder.then(res => res); 
            if (reviewsDataByRating.length <= 0) {
                console.error(`[DB] No reviews available with rating: ${rating}`);
                return { data: [], totalCount: reviewsDataByRating.length, status: Operation.NoDataFound };
            }
            return { data: reviewsDataByRating, totalCount: reviewsDataByRating.length, status: Operation.Success };
        } catch (error) {
            console.error("[DB] Error while fetching reviews data.", error);
            return { status: Operation.Error };
        } 
    }       
}
const getAllReviewsByRating = new GetAllReviewsByRating();
export default getAllReviewsByRating;
