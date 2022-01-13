import { Knex } from "knex";
import sinon, { SinonStub } from "sinon";
import userReviewsTable from "../../../../src/Database/TableCreation/UserReviewsTable";
import { USER_REVIEWS_DATA } from "../../../../src/Database/TableNames/TableNames";

describe("UserReviewsTable tests", () => {
    let consoleStub: SinonStub;
    let createTableStub: SinonStub;

    beforeEach(() => {
        consoleStub = sinon.stub(console, "log");
        createTableStub = sinon.stub();
    })

    afterEach(() => {
        consoleStub.restore();
    })

    it("create_WhenTableCreated_ShouldCallCreateTableWithArgumentUSER_REVIEWS_DATA", async () => {
        // Arrange
        const dbConnector = {
            schema: {
                createTable: createTableStub
            }
        }

        // Act
        await userReviewsTable.create(dbConnector as unknown as Knex);
    
        // Assert
        sinon.assert.alwaysCalledWith(createTableStub, USER_REVIEWS_DATA);
        sinon.assert.calledWith(consoleStub, `[DB] Creating new table: ${USER_REVIEWS_DATA}`);
    });
})