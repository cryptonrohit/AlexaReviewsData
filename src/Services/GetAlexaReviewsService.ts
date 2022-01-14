import getAllReviews from "../Database/Entities/Query/GetAllReviews";
import { IGetUserReviewsModel } from "../Model/IGetUserReviewsModel";
import { IHttpResponseModel } from "../Model/IHttpResponseModel";
import { getHttpStatusData } from "../Shared/GetHttpStatus";

/**
 * The service file which takes data from controller to DB and vice-versa.
 * This file helps to get the statusCode on the basis of DB operation received.
 */
class GetAlexaReviewsService {
    async execute(data: IGetUserReviewsModel): Promise<IHttpResponseModel> {
        const response = await getAllReviews.get(data);
        const httpStatusData = getHttpStatusData(response.status);
        return {data: response.data, totalCount: response.totalCount, status: httpStatusData.statusCode};
    }
}
const getAlexaReviewsService = new GetAlexaReviewsService();
export default getAlexaReviewsService;
