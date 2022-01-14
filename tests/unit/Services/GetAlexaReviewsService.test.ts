import sinon, { SinonStub } from "sinon";
import { expect } from "chai";
import getAllReviews from "../../../src/Database/Entities/Query/GetAllReviews";
import { IGetUserReviewsModel } from "../../../src/Model/IGetUserReviewsModel";
import { Operation } from "../../../src/Model/Operation";
import getAlexaReviewsService from "../../../src/Services/GetAlexaReviewsService";

describe("GetAlexaReviewsService tests", () => {
    let getAllReviewsStub: SinonStub;
    const filterTestData: IGetUserReviewsModel  = {
        storeType: "iTunes",
        rating: 4,
        from: "2018-01-01T00:00:00.000Z" as unknown as Date,
        to: "2018-05-01T00:00:00.000Z" as unknown as Date
    }
    const reviewsTestData = [
        {
            "review": "Pero deberia de poder cambiarle el idioma a alexa",
            "author": "WarcryxD",
            "review_source": "iTunes",
            "rating": 4,
            "title": "Excelente",
            "product_name": "Amazon Alexa",
            "reviewed_date": "2018-01-01T00:00:00.000Z"
        },
        {
            "review": "Cannot fix connection glitches without this-also fix connection glitches \n\nSmart things sees my light and Alexa doesn’t :(\n\n*update new devices “unresponsive” each day...they are working fine in SmartThings. No way to delete disabled devices. Very poor.",
            "author": "Ranchorat",
            "review_source": "iTunes",
            "rating": 4,
            "title": "Need to be able to delete devices",
            "product_name": "Amazon Alexa",
            "reviewed_date": "2018-01-01T00:00:00.000Z"
        }
    ]

    beforeEach(() => {
        getAllReviewsStub = sinon.stub(getAllReviews, "get");
    })

    afterEach(() => {
        getAllReviewsStub.restore();
    });

    it("execute_WhenDataInDB_ShouldReturnStatusCode200", async () => {
        // Arrange
        getAllReviewsStub.returns({ data: reviewsTestData, totalCount: reviewsTestData.length, status: Operation.Success });
        const expectedResult = {data: reviewsTestData, totalCount: reviewsTestData.length, status: 200};

        // Act
        const actualResult = await getAlexaReviewsService.execute(filterTestData);
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("execute_WhenNoDataInDB_ShouldReturnStatusCode404", async () => {
        // Arrange
        getAllReviewsStub.returns({ data: [], totalCount: 0, status: Operation.NoDataFound });
        const expectedResult = {data: [], totalCount: 0, status: 404};

        // Act
        const actualResult = await getAlexaReviewsService.execute(filterTestData);
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("execute_WhenDBError_ShouldReturnStatusCode500", async () => {
        // Arrange
        getAllReviewsStub.returns({ status: Operation.Error });
        const expectedResult = {data: undefined, totalCount: undefined, status: 500};

        // Act
        const actualResult = await getAlexaReviewsService.execute(filterTestData);
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });
})