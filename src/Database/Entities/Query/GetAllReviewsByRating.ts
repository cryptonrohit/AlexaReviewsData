import { IGetUserReviewsResponseModel } from "../../../Model/IGetUserReviewsResponseModel";
import { IInsertUserReviewsModel } from "../../../Model/IInsertUserReviewsModel";
import { Operation } from "../../../Model/Operation";
import db from "../../Configuration";
import { USER_REVIEWS_DATA } from "../../TableNames/TableNames";

class GetAllReviewsByRating {
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
