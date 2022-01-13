import sinon, { SinonStub } from "sinon";
import { expect } from "chai";
import { Operation } from "../../../src/Model/Operation";
import getMonthlyAverageRatings from "../../../src/Database/Entities/Query/GetMonthlyAverageRatings";
import getMonthlyAverageRatingsService from "../../../src/Services/GetMonthlyAverageRatingsService";

describe("GetMonthlyAverageRatingsService tests", () => {
    let getMonthlyAverageRatingsStub: SinonStub;
    const testStoreType = "iTunes";
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

    const monthlyAvgRatingsiTunesTestData = [
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

    beforeEach(() => {
        getMonthlyAverageRatingsStub = sinon.stub(getMonthlyAverageRatings, "get");
    })

    afterEach(() => {
        getMonthlyAverageRatingsStub.restore();
    });

    it("execute_WhenDataInDBAndStoreTypeAbsent_ShouldReturnStatusCode200AndAllData", async () => {
        // Arrange
        getMonthlyAverageRatingsStub.returns({ data: monthlyAvgRatingsTestData, status: Operation.Success });
        const expectedResult = {data: monthlyAvgRatingsTestData, status: 200};

        // Act
        const actualResult = await getMonthlyAverageRatingsService.execute("");
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("execute_WhenDataInDBAndStoreTypePresent_ShouldReturnStatusCode200AndParticularStoreTypeData", async () => {
        // Arrange
        getMonthlyAverageRatingsStub.returns({ data: monthlyAvgRatingsiTunesTestData, status: Operation.Success });
        const expectedResult = {data: monthlyAvgRatingsiTunesTestData, status: 200};

        // Act
        const actualResult = await getMonthlyAverageRatingsService.execute(testStoreType);
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("execute_WhenNoDataInDBAndStoreTypeAbsent_ShouldReturnStatusCode404", async () => {
        // Arrange
        getMonthlyAverageRatingsStub.returns({ data: [], status: Operation.NoDataFound });
        const expectedResult = {data: [], status: 404};

        // Act
        const actualResult = await getMonthlyAverageRatingsService.execute("");
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("execute_WhenNoDataInDBAndStoreTypePresent_ShouldReturnStatusCode404", async () => {
        // Arrange
        getMonthlyAverageRatingsStub.returns({ data: [], status: Operation.NoDataFound });
        const expectedResult = {data: [], status: 404};

        // Act
        const actualResult = await getMonthlyAverageRatingsService.execute(testStoreType);
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("execute_WhenDBErrorAndStoreTypeAbsent_ShouldReturnStatusCode500", async () => {
        // Arrange
        getMonthlyAverageRatingsStub.returns({ status: Operation.Error });
        const expectedResult = {data: undefined, status: 500};

        // Act
        const actualResult = await getMonthlyAverageRatingsService.execute("");
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("execute_WhenDBErrorAndStoreTypePresent_ShouldReturnStatusCode500", async () => {
        // Arrange
        getMonthlyAverageRatingsStub.returns({ status: Operation.Error });
        const expectedResult = {data: undefined, status: 500};

        // Act
        const actualResult = await getMonthlyAverageRatingsService.execute(testStoreType);
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });
})
