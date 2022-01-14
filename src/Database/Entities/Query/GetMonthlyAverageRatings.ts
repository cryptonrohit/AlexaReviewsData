import { IGetUserReviewsResponseModel } from "../../../Model/IGetUserReviewsResponseModel";
import { Operation } from "../../../Model/Operation";
import db from "../../Configuration";
import { USER_REVIEWS_DATA } from "../../TableNames/TableNames";

/**
 * This file gets the monthly average rating of the store i.e, either iTunes or GooglePlayStore
 */
class GetMonthlyAverageRatings {
    /**
     * The raw query explanation:
     * cast(Avg(rating) as decimal(10,2))        : First it calculates the avg of the ratings
     *                                             and then cast the value to 2 decimal places.
     * extract (month from reviewed_date)        : Extract the month out of the timestamp in DB.
     * extract(year from reviewed_date)          : Extract the year out of the timestamp in DB.
     * where review_source like '%${storeType}%' : Match the type of store passed in storeType.
     * @param storeType The type of store i.e, either iTunes or GooglePlayStore
     * @returns 
     * data: [], status: Operation.NoDataFound => When no data in DB
     * data: data from DB, status: Operation.Success => When data in DB
     * status: Operation.Error => When any DB error occurs.
     */
    async get(storeType: string): Promise<IGetUserReviewsResponseModel> {
        storeType = storeType ? storeType : "";
        try {
            const result = await db.DBInstance().dbConnector
                .raw(`select review_source, 
                    cast(Avg(rating) as decimal(10,2)) as averagerating, 
                    extract (month from reviewed_date) as month, 
                    extract(year from reviewed_date) as year
                    from "${USER_REVIEWS_DATA}"
                    where review_source like '%${storeType}%'
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
