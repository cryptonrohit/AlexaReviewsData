import { NextFunction, Request, Response } from "express";
import { acceptedRatings } from "../Shared/Constants";

class GetReviewsDataByRatingMiddleware {
    validate(req: Request, res: Response, next: NextFunction) {
        const rating = req.params.rating as unknown as number;
        if (!rating) {
            return res.status(400).send("Rating entered is invalid. Please enter a valid rating.");
        }
        if (!acceptedRatings.includes(Number(rating))) {
            return res.status(400).send("Please enter a rating between 1-5.");
        }
        next();
    }
}
const getReviewsDataByRatingMiddleware =  new GetReviewsDataByRatingMiddleware();
export default getReviewsDataByRatingMiddleware;
