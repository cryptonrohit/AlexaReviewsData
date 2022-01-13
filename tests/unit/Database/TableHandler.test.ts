import { Knex } from "knex";
import dbTableHandler from "../../../src/Database/TableHandler";
import sinon, { SinonStub } from "sinon";
import userReviewsTable from "../../../src/Database/TableCreation/UserReviewsTable";

describe("TableHandler tests", () => {
    let userReviewsTableStub: SinonStub;
    let consoleStub: SinonStub;
    let consoleErrorStub: SinonStub;

    beforeEach(() => {
        userReviewsTableStub = sinon.stub(userReviewsTable, "create");
        consoleStub = sinon.stub(console, "log");
        consoleErrorStub = sinon.stub(console, "error");
    })

    afterEach(() => {
        userReviewsTableStub.restore();
        consoleStub.restore();
        consoleErrorStub.restore();
    })

    it("handle_WhenTableExists_ShouldNotCallUserReviewsTableStub", async () => {
        // Arrange
        const dbConnector = {
            schema: {
                hasTable: () => true 
            }
        }

        // Act
        await dbTableHandler.handle(dbConnector as unknown as Knex);
    
        // Assert
        sinon.assert.notCalled(userReviewsTableStub);
        sinon.assert.calledWith(consoleStub, "[DB] Table already existing");
    });

    it("handle_WhenTableDoesNotExists_ShouldCallUserReviewsTableStub", async () => {
        // Arrange
        const dbConnector = {
            schema: {
                hasTable: () => false 
            }
        }

        // Act
        await dbTableHandler.handle(dbConnector as unknown as Knex);
    
        // Assert
        sinon.assert.called(userReviewsTableStub);
    });

    it("handle_WhenAnyException_ShouldLogError", async () => {
        // Arrange
        const dbConnector = {
            schema: {
                hasTable: () => { throw new Error("test Error") } 
            }
        }

        // Act
        await dbTableHandler.handle(dbConnector as unknown as Knex);
    
        // Assert
        sinon.assert.calledWith(consoleErrorStub, "[DB] Issue creating table. Error: Error: test Error");
    });
})