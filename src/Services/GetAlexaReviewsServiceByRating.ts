import getAllReviewsByRating from "../Database/Entities/Query/GetAllReviewsByRating";
import { IHttpResponseModel } from "../Model/IHttpResponseModel";
import { getHttpStatusData } from "../Shared/GetHttpStatus";

/**
 * The service file which takes data from controller to DB and vice-versa.
 * This file helps to get the statusCode on the basis of DB operation received.
 */
class GetAlexaReviewsServiceByRating {
    async execute(ratingData: number): Promise<IHttpResponseModel> {
        const response = await getAllReviewsByRating.get(ratingData);
        const httpStatusData = getHttpStatusData(response.status);
        return {data: response.data, totalCount: response.totalCount, status: httpStatusData.statusCode};
    }
}
const getAlexaReviewsServiceByRating = new GetAlexaReviewsServiceByRating();
export default getAlexaReviewsServiceByRating;
