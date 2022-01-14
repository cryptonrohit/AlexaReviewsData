import { NextFunction, Request, Response } from "express";
import { acceptedRatings, acceptedReviewSources } from "../Shared/Constants";

/**
 * Middleware class to check the validation of Request params.
 */
class GetReviewsDataMiddleware {
    /**
     * It checks if the storeType is either iTunes or GooglePlayStore.
     * It checks whether the rating passed should be between 1-5. 
     * It checks whether from and to are in valid date format.
     * It checks whether from is lesser than to
     * @param req Request
     * @param res Response
     * @param next The next operation
     * @returns statusCode = 400 and with message if the request do not meet the condition.
     */
    validate(req: Request, res: Response, next: NextFunction) {
        const storeType = req.query.storeType as string;
        const rating = req.query.rating as unknown as number;
        const from = req.query.from as unknown as string;
        const to = req.query.to as unknown as string;
        if (storeType && !acceptedReviewSources.includes(storeType)) {
            res.status(400);
            res.send("Please enter a valid store Type i.e either iTunes or GooglePlayStore. Please follow case sensitive.");
            return;
        }
        if (rating && !acceptedRatings.includes(Number(rating))) {
            res.status(400);
            res.send("Please enter a rating between 1-5.");
            return;
        }
        if (from && isNaN(Date.parse(from))) {
            res.status(400);
            res.send("Please enter a valid Date format");
            return;
        }
        if (to && isNaN(Date.parse(to))) {
            res.status(400);
            res.send("Please enter a valid Date format");
            return;
        }
        if (from && to && new Date(from).getTime() - new Date(to).getTime() > 0) {
            res.status(400);
            res.send("to parameter should be greater or equal than from parameter");
            return;
        }

        next();
    }
}
const getReviewsDataMiddleware = new GetReviewsDataMiddleware();
export default getReviewsDataMiddleware;
