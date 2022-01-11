import insertReviews from "../Database/Entities/Command/InsertReviews";
import { IHttpResponseModel } from "../Model/IHttpResponseModel";
import { Operation } from "../Model/Operation";
import { getHttpStatusData } from "../Shared/GetHttpStatus";

class InsertAlexaReviewsService {
    async execute(uploadedData: string): Promise<IHttpResponseModel> {
        try {
            if (uploadedData.includes("\n")) {
                uploadedData = uploadedData.replace(/\n/g, '');
            }
            if (uploadedData.includes("}{")) {
                uploadedData = uploadedData.replace(/}{/g, '},{');
            }
            if (!uploadedData.startsWith("[") && !uploadedData.endsWith("]")) {
                uploadedData = `[${uploadedData}]`
            }
            const dataToInsert = JSON.parse(uploadedData);
            const response = await insertReviews.insert(dataToInsert);
            const httpStatusData =  getHttpStatusData(response);
            return {data: httpStatusData.outputData, status: httpStatusData.statusCode};
        } catch (error) {
            console.log("Some issue occured while parsing with error: ", error);
            const httpStatusData = getHttpStatusData(Operation.BadRequest);
            return {data: httpStatusData.outputData, status: httpStatusData.statusCode};
        }        
    }
}
const insertAlexaReviewsService = new InsertAlexaReviewsService()
export default insertAlexaReviewsService;
