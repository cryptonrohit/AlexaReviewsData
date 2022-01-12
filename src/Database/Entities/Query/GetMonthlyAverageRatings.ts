import { IGetUserReviewsResponseModel } from "../../../Model/IGetUserReviewsResponseModel";
import { Operation } from "../../../Model/Operation";
import db from "../../Configuration";
import { USER_REVIEWS_DATA } from "../../TableNames/TableNames";

class GetMonthlyAverageRatings {
    async get(): Promise<IGetUserReviewsResponseModel> {
        try {
            const result = await db.DBInstance().dbConnector
                .raw(`select review_source, 
                    cast(Avg(rating) as decimal(10,2)) as averagerating, 
                    extract (month from reviewed_date) as month, 
                    extract(year from reviewed_date) as year
                    from "${USER_REVIEWS_DATA}"
                    group by review_source, month, year 
                    order by month, year`);
            if (result.rowCount <= 0) {
                console.error("[DB] No reviews available.");
                return { data: [], status: Operation.NoDataFound };
            }  
            return { data: result.rows, status: Operation.Success };
        } catch (error) {
            console.error("[DB] Error while fetching monthly average ratings data.", error);
            return { status: Operation.Error };
        }
    }
}
const getMonthlyAverageRatings = new GetMonthlyAverageRatings();
export default getMonthlyAverageRatings;
