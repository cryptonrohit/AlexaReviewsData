import { Knex } from "knex";
/**
 * Using singleton pattern so that we can have only one instance of db and we don't need to create instance again and again.
 */
class DBConfiguration {
    public dbConnector: Knex;
    private static dbInstance: DBConfiguration;
    private constructor() {

    }
    public static DBInstance(): DBConfiguration {
        if (!DBConfiguration.dbInstance) {
            return new DBConfiguration;
        }
        return DBConfiguration.dbInstance;
    }

    async init(){
        // creating tables
    }
}
export default DBConfiguration;
