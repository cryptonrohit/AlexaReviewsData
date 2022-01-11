import { Request, Response } from "express";
import getAlexaReviewsService from "../Services/GetAlexaReviewsService";
import getAlexaReviewsServiceByRating from "../Services/GetAlexaReviewsServiceByRating";
import insertAlexaReviewsService from "../Services/InsertAlexaReviewsService";

class AlexaReviewsController {
    async insertReviewsData(req: Request, res: Response) {
        const uploadedData = req['files'].reviewsFile.data.toString();
        const result = await insertAlexaReviewsService.execute(uploadedData);
        res.status(result.status).send(result.data);
    }
    async getReviewsData(req: Request, res: Response) {
        const storeType = req.query.storeType as string;
        const rating = req.query.rating as unknown as number;
        const date = req.query.date as unknown as Date;
        const result = await getAlexaReviewsService.execute({ storeType, rating, date });
        res.status(result.status).send(result.data);
    }
    async getReviewsDataByRating(req: Request, res: Response) {
        const rating = req.params.rating as unknown as number;
        const result = await getAlexaReviewsServiceByRating.execute(rating);
        res.status(result.status).send({totalCount: result.totalCount, data: result.data});
    }
}
const alexaReviewsController = new AlexaReviewsController();
export default alexaReviewsController;
