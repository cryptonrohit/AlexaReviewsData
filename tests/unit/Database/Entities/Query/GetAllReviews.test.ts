import getAllReviews from "../../../../../src/Database/Entities/Query/GetAllReviews";
import { IGetUserReviewsModel } from "../../../../../src/Model/IGetUserReviewsModel";
import sinon, { SinonStub } from "sinon";
import db from "../../../../../src/Database/Configuration";
import { Operation } from "../../../../../src/Model/Operation";
import { expect } from "chai";

describe("GetAllReviews tests", () => {
    let dbInstanceStub: SinonStub;
    let selectStub: SinonStub;
    let fromStub: SinonStub;
    let whereStub: SinonStub;
    let consoleStub: SinonStub;
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
        dbInstanceStub = sinon.stub(db, "DBInstance");
        selectStub = sinon.stub().returnsThis();
        fromStub = sinon.stub().returnsThis();
        whereStub = sinon.stub();
        dbInstanceStub.returns({
            dbConnector: {
                select: selectStub,
                from: fromStub,
                where: whereStub
            }
        });
        consoleStub = sinon.stub(console, "error");
    })

    afterEach(() => {
        fromStub.reset();
        whereStub.reset();
        selectStub.reset();
        dbInstanceStub.restore();
        consoleStub.restore();
    })

    it("get_WhenReviewDataInDB_ShouldReturnSuccess", async () => {
        // Arrange
        whereStub.resolves(reviewsTestData);       
        const expectedResult = { data: reviewsTestData, totalCount: reviewsTestData.length, status: Operation.Success };

        // Act
        const actualResult = await getAllReviews.get(filterTestData);

        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("get_WhenNoReviewDataInDB_ShouldReturnNoDataFound", async () => {
        // Arrange
        whereStub.resolves([]);       
        const expectedResult = { data: [], totalCount: 0, status: Operation.NoDataFound };

        // Act
        const actualResult = await getAllReviews.get(filterTestData);

        // Assert
        expect(actualResult).to.eql(expectedResult);
        sinon.assert.calledWith(consoleStub, "[DB] No reviews available.");
    });

    it("get_WhenDBError_ShouldReturnError", async () => {
        // Arrange
        whereStub.throws("test DB error.");       
        const expectedResult = { status: Operation.Error };

        // Act
        const actualResult = await getAllReviews.get(filterTestData);

        // Assert
        expect(actualResult).to.eql(expectedResult);
        sinon.assert.calledWith(consoleStub, "[DB] Error while fetching reviews data.");
    });
})