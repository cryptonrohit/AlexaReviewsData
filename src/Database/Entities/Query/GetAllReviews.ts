import { IGetUserReviewsModel } from "../../../Model/IGetUserReviewsModel";
import { IGetUserReviewsResponseModel } from "../../../Model/IGetUserReviewsResponseModel";
import { IInsertUserReviewsModel } from "../../../Model/IInsertUserReviewsModel";
import { Operation } from "../../../Model/Operation";
import db from "../../Configuration";
import { USER_REVIEWS_DATA } from "../../TableNames/TableNames";

class GetAllReviews {
    async get(dataToGet: IGetUserReviewsModel): Promise<IGetUserReviewsResponseModel> {
        try {
            const queryBuilder = db.DBInstance().dbConnector
            .select("*").from(USER_REVIEWS_DATA)
            .where((builder) => {
                if (dataToGet.storeType) {
                    builder.where(`${USER_REVIEWS_DATA}.review_source`, dataToGet.storeType);
                }
                if (dataToGet.rating) {
                    builder.where(`${USER_REVIEWS_DATA}.rating`, dataToGet.rating);
                }
                if (dataToGet.from) {
                    builder.where(`${USER_REVIEWS_DATA}.reviewed_date`, ">=", dataToGet.from);
                }
                if (dataToGet.to) {
                    builder.where(`${USER_REVIEWS_DATA}.reviewed_date`, "<=", dataToGet.to);
                }
            })
            const reviewsData: IInsertUserReviewsModel[] = await queryBuilder.then(res => res); 
            if (reviewsData.length <= 0) {
                console.error(`[DB] No reviews available.`);
                return { data: [], totalCount: reviewsData.length, status: Operation.NoDataFound };
            }
            return { data: reviewsData, totalCount: reviewsData.length, status: Operation.Success };
        } catch (error) {
            console.error("[DB] Error while fetching reviews data.", error);
            return { status: Operation.Error };
        } 
    }       
}
const getAllReviews = new GetAllReviews();
export default getAllReviews;
