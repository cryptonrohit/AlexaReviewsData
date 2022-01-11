import { IInsertUserReviewsModel } from "./IInsertUserReviewsModel";

export interface IHttpResponseModel {
    data: string | IInsertUserReviewsModel[] | undefined;
    totalCount?: number;
    status: number;
}
