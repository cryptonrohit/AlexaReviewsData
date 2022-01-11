import { NextFunction, Request, Response } from "express";

class InsertReviewsDataMiddleware {
    validate(req: Request, res: Response, next: NextFunction) {
        if (!req['files']) {
            return res.status(400).send("No file uploaded. Please upload a json file");
        }
        const uploadedFileKey: string[] = Object.keys(req['files']);
        const uploadedFileValue: string[] = Object.values(req['files']);
        if (uploadedFileKey[0] !== 'reviewsFile') {
            return res.status(400).send("Uploaded file's key name should be reviewsFile. Please reupload your json file with key: reviewsFile");
        }
        if (!uploadedFileValue[0]['name'].match(/\.json$/g)) {
            return res.status(400).send("Please upload a .json file");
        }

        next();
    }
}
const insertReviewsDataMiddleware = new InsertReviewsDataMiddleware();
export default insertReviewsDataMiddleware;
