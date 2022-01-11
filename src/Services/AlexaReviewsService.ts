import insertReviews from "../Database/Entities/Command/InsertReviews";

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
            await insertReviews.insert(dataToInsert);
            return {statusCode: 200, data: "Created"};
        } catch (error) {
            console.log("Some issue occured while parsing.");
            return {statusCode: 400, data: "Invalid JSON format"};
        }        
    }
}
const alexaReviewsService = new AlexaReviewsService();
export default alexaReviewsService;
