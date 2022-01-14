import { NextFunction, Request, Response } from "express";
import { acceptedReviewSources } from "../Shared/Constants";

/**
 * Middleware class to check the validation of Request param.
 */
class GetMonthlyAvgRatingsMiddleware {
    /**
     * It checks if the storeType is either iTunes or GooglePlayStore.
     * @param req Request
     * @param res Response 
     * @param next The next operation
     * @returns statusCode = 400 and a string message if the storeType do not meet the condition.
     */
    validate(req: Request, res: Response, next: NextFunction) {
        const storeType = req.query.storeType as string;
        if (storeType && !acceptedReviewSources.includes(storeType)) {
            res.status(400);
            res.send("Please enter a valid store Type i.e either iTunes or GooglePlayStore. Please follow case sensitive.");
            return;
        }
        next();
    }
}
const getMonthlyAvgRatingsMiddleware = new GetMonthlyAvgRatingsMiddleware();
export default getMonthlyAvgRatingsMiddleware;
