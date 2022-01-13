import { expect } from "chai";
import sinon, { SinonStub } from "sinon";
import db from "../../../../../src/Database/Configuration";
import getMonthlyAverageRatings from "../../../../../src/Database/Entities/Query/GetMonthlyAverageRatings";
import { Operation } from "../../../../../src/Model/Operation";

describe("GetMonthlyAverageRatings tests", () => {
    let rawStub: SinonStub;
    let dbInstanceStub: SinonStub;
    let consoleStub: SinonStub;
    const testStoreType = "iTunes";
    const monthlyAvgRatingsTestData = {
        rowCount: 2,
        rows: [
            {
                "review_source": "GooglePlayStore",
                "averagerating": "2.94",
                "month": 1,
                "year": 2018
            },
            {
                "review_source": "iTunes",
                "averagerating": "1.76",
                "month": 1,
                "year": 2018
            }
        ]
    }

    const monthlyAvgRatingsiTunesTestData = {
        rowCount: 2,
        rows: [
            {
                "review_source": "iTunes",
                "averagerating": "1.76",
                "month": 1,
                "year": 2018
            },
            {
                "review_source": "iTunes",
                "averagerating": "1.71",
                "month": 12,
                "year": 2017
            }
        ]
    }

    beforeEach(() => {
        dbInstanceStub = sinon.stub(db, "DBInstance");
        rawStub = sinon.stub();
        dbInstanceStub.returns({
            dbConnector: {
                raw: rawStub
            }
        });
        consoleStub = sinon.stub(console, "error");
    })

    afterEach(() => {
        dbInstanceStub.restore();
        rawStub.reset();
        consoleStub.restore();
    });

    it("get_WhenReviewDataInDBAndStoreTypeAbsent_ShouldReturnSuccessAndAllData", async () => {
        // Arrange
        rawStub.returns(monthlyAvgRatingsTestData);
        const expectedResult = { data: monthlyAvgRatingsTestData.rows, status: Operation.Success };

        // Act
        const actualResult = await getMonthlyAverageRatings.get("");
        
        // Assert
        expect(actualResult).to.eql(expectedResult);

    });

    it("get_WhenReviewDataInDBAndStoreTypePresent_ShouldReturnSuccessAndParticularStoreTypeData", async () => {
        // Arrange
        rawStub.returns(monthlyAvgRatingsiTunesTestData);
        const expectedResult = { data: monthlyAvgRatingsiTunesTestData.rows, status: Operation.Success };

        // Act
        const actualResult = await getMonthlyAverageRatings.get(testStoreType);
        
        // Assert
        expect(actualResult).to.eql(expectedResult);

    });

    it("get_WhenNoReviewDataInDBAndStoreTypeAbsent_ShouldReturnNoDataFound", async () => {
        // Arrange
        rawStub.returns({rowCount: 0, rows: []});
        const expectedResult = { data: [], status: Operation.NoDataFound };

        // Act
        const actualResult = await getMonthlyAverageRatings.get("");
        
        // Assert
        expect(actualResult).to.eql(expectedResult);
        sinon.assert.calledWith(consoleStub, "[DB] No reviews available.");
    });

    it("get_WhenNoReviewDataInDBAndStoreTypePresent_ShouldReturnNoDataFound", async () => {
        // Arrange
        rawStub.returns({rowCount: 0, rows: []});
        const expectedResult = { data: [], status: Operation.NoDataFound };

        // Act
        const actualResult = await getMonthlyAverageRatings.get(testStoreType);
        
        // Assert
        expect(actualResult).to.eql(expectedResult);
        sinon.assert.calledWith(consoleStub, "[DB] No reviews available.");
    });

    it("get_DBErrorAndStoreTypeAbsent_ShouldReturnError", async () => {
        // Arrange
        rawStub.throws("test DB error.");
        const expectedResult = { status: Operation.Error };

        // Act
        const actualResult = await getMonthlyAverageRatings.get("");
        
        // Assert
        expect(actualResult).to.eql(expectedResult);
        sinon.assert.calledWith(consoleStub, "[DB] Error while fetching monthly average ratings data.");
    });

    it("get_DBErrorAndStoreTypePresent_ShouldReturnError", async () => {
        // Arrange
        rawStub.throws("test DB error.");
        const expectedResult = { status: Operation.Error };

        // Act
        const actualResult = await getMonthlyAverageRatings.get(testStoreType);
        
        // Assert
        expect(actualResult).to.eql(expectedResult);
        sinon.assert.calledWith(consoleStub, "[DB] Error while fetching monthly average ratings data.");
    });
})
