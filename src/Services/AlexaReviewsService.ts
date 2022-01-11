import insertReviews from "../Database/Entities/Command/InsertReviews";
import { Operation } from "../Model/Operation";
import { getHttpStatusData } from "../Shared/GetHttpStatus";

class AlexaReviewsService {
    async execute(uploadedData: string) {
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
            return getHttpStatusData(response);
        } catch (error) {
            console.log("Some issue occured while parsing with error: ", error);
            return getHttpStatusData(Operation.BadRequest);
        }        
    }
}
const alexaReviewsService = new AlexaReviewsService();
export default alexaReviewsService;
