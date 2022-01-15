import { IGetUserReviewsModel } from "../../../Model/IGetUserReviewsModel";
import { IGetUserReviewsResponseModel } from "../../../Model/IGetUserReviewsResponseModel";
import { IInsertUserReviewsModel } from "../../../Model/IInsertUserReviewsModel";
import { Operation } from "../../../Model/Operation";
import db from "../../Configuration";
import { USER_REVIEWS_DATA } from "../../TableNames/TableNames";

/**
 * This file gets all the reviews(if no filters passed), or else get reviews on basis of filters.
 */
class GetAllReviews {
    /**
     * 
     * @param dataToGet The filters which will be considered to fetch the data. Filters are : 
     * storeType: The type of store i.e, either iTunes or GooglePlayStore
     * rating: The rating of the app. It should be between 1-5.
     * from: The date from which the data should be filtered
     * to: The date till which the data should be filtered
     * @returns 
     * data: [], totalCount: 0, status: Operation.NoDataFound => When no data in DB
     * data: data from DB, totalCount: no. of data from DB, status: Operation.Success => When data in DB
     * status: Operation.Error => When any DB error occurs.
     */
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
