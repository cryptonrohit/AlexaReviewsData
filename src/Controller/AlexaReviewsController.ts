import { Request, Response } from "express";
import alexaReviewsService from "../Services/AlexaReviewsService";

class AlexaReviewsController {
    async insertReviewsData(req: Request, res: Response) {
        const uploadedData = (req['files'].reviewsFile.data.toString());
        const result = await alexaReviewsService.execute(uploadedData);
        res.status(result.statusCode).send(result.outputData);
    }
}
const alexaReviewsController = new AlexaReviewsController();
export default alexaReviewsController;
