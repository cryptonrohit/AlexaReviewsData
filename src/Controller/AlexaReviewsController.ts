import { Request, Response } from "express";
import getAlexaReviewsService from "../Services/GetAlexaReviewsService";
import insertAlexaReviewsService from "../Services/InsertAlexaReviewsService";

class AlexaReviewsController {
    async insertReviewsData(req: Request, res: Response) {
        const uploadedData = req['files'].reviewsFile.data.toString();
        const result = await insertAlexaReviewsService.execute(uploadedData);
        res.status(result.statusCode).send(result.outputData);
    }
    async getReviewsData(req: Request, res: Response) {
        const storeType = req.query.storeType as string;
        const rating = req.query.rating as unknown as number;
        const date = req.query.date as unknown as Date;
        const result = await getAlexaReviewsService.execute({ storeType, rating, date });
        res.status(result.status).send(result.data);
    }
}
const alexaReviewsController = new AlexaReviewsController();
export default alexaReviewsController;
