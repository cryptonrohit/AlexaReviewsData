import { NextFunction, Request, Response } from "express";

class GetReviewsDataMiddleware {
    validate(req: Request, res: Response, next: NextFunction) {

    }
}
const getReviewsDataMiddleware = new GetReviewsDataMiddleware();
export default getReviewsDataMiddleware;
