import { IInsertUserReviewsModel } from "./IInsertUserReviewsModel";
import { Operation } from "./Operation";

export interface IGetUserReviewsResponseModel {
    data: IInsertUserReviewsModel[] | [];
    status: Operation
}
