import { IInsertUserReviewsModel } from "./IInsertUserReviewsModel";
import { Operation } from "./Operation";

export interface IGetUserReviewsResponseModel {
    data?: IInsertUserReviewsModel[];
    totalCount?: number;
    status: Operation
}
