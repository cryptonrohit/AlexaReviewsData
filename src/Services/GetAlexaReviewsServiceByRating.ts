import getAllReviewsByRating from "../Database/Entities/Query/GetAllReviewsByRating";
import { IHttpResponseModel } from "../Model/IHttpResponseModel";
import { getHttpStatusData } from "../Shared/GetHttpStatus";

class GetAlexaReviewsServiceByRating {
    async execute(ratingData: number): Promise<IHttpResponseModel> {
        const response = await getAllReviewsByRating.get(ratingData);
        const httpStatusData = getHttpStatusData(response.status);
        return {data: response.data, totalCount: response.totalCount, status: httpStatusData.statusCode};
    }
}
const getAlexaReviewsServiceByRating = new GetAlexaReviewsServiceByRating();
export default getAlexaReviewsServiceByRating;
