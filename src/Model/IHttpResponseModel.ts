import { IInsertUserReviewsModel } from "./IInsertUserReviewsModel";

export interface IHttpResponseModel {
    data: string | IInsertUserReviewsModel[] | undefined;
    status: number;
}
