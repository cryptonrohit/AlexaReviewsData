import { Operation } from "../../../Model/Operation";
import db from "../../Configuration";
import { USER_REVIEWS_DATA } from "../../TableNames/TableNames";

class GetMonthlyAverageRatings {
    async get() {
        try {
            const result = await db.DBInstance().dbConnector
                .raw(`select review_source, 
                    cast(Avg(rating) as decimal(10,2)), 
                    extract (month from reviewed_date) as mnth, 
                    extract(year from reviewed_date) as yr
                    from "${USER_REVIEWS_DATA}"
                    group by review_source, mnth, yr 
                    order by mnth, yr`);
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
