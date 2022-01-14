import getMonthlyAverageRatings from "../Database/Entities/Query/GetMonthlyAverageRatings";
import { IHttpResponseModel } from "../Model/IHttpResponseModel";
import { getHttpStatusData } from "../Shared/GetHttpStatus";

/**
 * The service file which takes data from controller to DB and vice-versa.
 * This file helps to get the statusCode on the basis of DB operation received.
 */

class GetMonthlyAverageRatingsService {
    async execute(storeType: string): Promise<IHttpResponseModel> {
        const response = await getMonthlyAverageRatings.get(storeType);
        const httpStatusData = getHttpStatusData(response.status);
        return {data: response.data, status: httpStatusData.statusCode};
    }
}
const getMonthlyAverageRatingsService = new GetMonthlyAverageRatingsService();
export default getMonthlyAverageRatingsService;
