import { NextFunction, Request, Response } from "express";
import { acceptedRatings, acceptedReviewSources } from "../Shared/Constants";

class GetReviewsDataMiddleware {
    validate(req: Request, res: Response, next: NextFunction) {
        const storeType = req.query.storeType as string;
        const rating = req.query.rating as unknown as number;
        const date = req.query.date as unknown as string;
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
        if (date && isNaN(Date.parse(date))) {
            res.status(400);
            res.send("Please enter a valid Date format");
            return;
        }

        next();
    }
}
const getReviewsDataMiddleware = new GetReviewsDataMiddleware();
export default getReviewsDataMiddleware;
