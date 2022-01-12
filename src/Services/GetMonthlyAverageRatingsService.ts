import getMonthlyAverageRatings from "../Database/Entities/Query/GetMonthlyAverageRatings";
import { IHttpResponseModel } from "../Model/IHttpResponseModel";
import { getHttpStatusData } from "../Shared/GetHttpStatus";


class GetMonthlyAverageRatingsService {
    async execute(): Promise<IHttpResponseModel> {
        const response = await getMonthlyAverageRatings.get();
        const httpStatusData = getHttpStatusData(response.status);
        return {data: response.data, status: httpStatusData.statusCode};
    }
}
const getMonthlyAverageRatingsService = new GetMonthlyAverageRatingsService();
export default getMonthlyAverageRatingsService;
