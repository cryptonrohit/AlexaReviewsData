import { NextFunction, Request, Response } from "express";
import { acceptedReviewSources } from "../Shared/Constants";

class GetMonthlyAvgRatingsMiddleware {
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
