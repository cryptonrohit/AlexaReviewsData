import { NextFunction, Request, Response } from "express";
import { acceptedRatings } from "../Shared/Constants";

class GetReviewsDataByRatingMiddleware {
    validate(req: Request, res: Response, next: NextFunction) {
        const rating = req.params.rating as unknown as number;
        if (!rating) {
            res.status(400);
            res.send("Rating entered is invalid. Please enter a valid rating.");
            return;
        }
        if (!acceptedRatings.includes(Number(rating))) {
            res.status(400);
            res.send("Please enter a rating between 1-5.");
            return;
        }
        next();
    }
}
const getReviewsDataByRatingMiddleware =  new GetReviewsDataByRatingMiddleware();
export default getReviewsDataByRatingMiddleware;
