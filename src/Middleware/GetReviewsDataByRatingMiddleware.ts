import { NextFunction, Request, Response } from "express";
import { acceptedRatings } from "../Shared/Constants";

/**
 * Middleware class to check the validation of Request param.
 */
class GetReviewsDataByRatingMiddleware {
    /**
     * It checks whether rating is undefined or not and,
     * It checks whether the rating passed should be between 1-5.
     * @param req Request
     * @param res Response
     * @param next The next operation
     * @returns statusCode = 400 and with message if the request do not meet the condition.
     */
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
