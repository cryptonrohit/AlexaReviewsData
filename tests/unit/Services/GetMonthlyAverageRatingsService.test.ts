import sinon, { SinonStub } from "sinon";
import { expect } from "chai";
import { Operation } from "../../../src/Model/Operation";
import getMonthlyAverageRatings from "../../../src/Database/Entities/Query/GetMonthlyAverageRatings";
import getMonthlyAverageRatingsService from "../../../src/Services/GetMonthlyAverageRatingsService";

describe("GetMonthlyAverageRatingsService tests", () => {
    let getMonthlyAverageRatingsStub: SinonStub;
    const monthlyAvgRatingsTestData = [
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

    beforeEach(() => {
        getMonthlyAverageRatingsStub = sinon.stub(getMonthlyAverageRatings, "get");
    })

    afterEach(() => {
        getMonthlyAverageRatingsStub.restore();
    });

    it("execute_WhenDataInDB_ShouldReturnStatusCode200", async () => {
        // Arrange
        getMonthlyAverageRatingsStub.returns({ data: monthlyAvgRatingsTestData, status: Operation.Success });
        const expectedResult = {data: monthlyAvgRatingsTestData, status: 200};

        // Act
        const actualResult = await getMonthlyAverageRatingsService.execute();
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("execute_WhenNoDataInDB_ShouldReturnStatusCode404", async () => {
        // Arrange
        getMonthlyAverageRatingsStub.returns({ data: [], status: Operation.NoDataFound });
        const expectedResult = {data: [], status: 404};

        // Act
        const actualResult = await getMonthlyAverageRatingsService.execute();
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("execute_WhenDBError_ShouldReturnStatusCode500", async () => {
        // Arrange
        getMonthlyAverageRatingsStub.returns({ status: Operation.Error });
        const expectedResult = {data: undefined, status: 500};

        // Act
        const actualResult = await getMonthlyAverageRatingsService.execute();
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });
})
