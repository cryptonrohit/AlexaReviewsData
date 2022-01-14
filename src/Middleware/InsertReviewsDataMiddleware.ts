import { NextFunction, Request, Response } from "express";

/**
 * Middleware class to check the validation of Request params.
 */
class InsertReviewsDataMiddleware {
    /**
     * It checks whether the file is uploaded or not.
     * It checks whether the uploaded file's key name is reviewsFile.
     * It checks whether the extension of the file uploaded is .json or not.
     * @param req Request
     * @param res Response
     * @param next The next operation
     * @returns statusCode = 400 and with message if the request do not meet the condition.
     */
    validate(req: Request, res: Response, next: NextFunction) {
        if (!req['files']) {
            res.status(400);
            res.send("No file uploaded. Please upload a json file");
            return;
        }
        const uploadedFileKey: string[] = Object.keys(req['files']);
        const uploadedFileValue: string[] = Object.values(req['files']);
        if (uploadedFileKey[0] !== 'reviewsFile') {
            res.status(400);
            res.send("Uploaded file's key name should be reviewsFile. Please reupload your json file with key: reviewsFile");
            return;
        }
        if (!uploadedFileValue[0]['name'].match(/\.json$/g)) {
            res.status(400);
            res.send("Please upload a .json file");
            return;
        }

        next();
    }
}
const insertReviewsDataMiddleware = new InsertReviewsDataMiddleware();
export default insertReviewsDataMiddleware;
