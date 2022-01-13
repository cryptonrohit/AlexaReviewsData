import sinon, { SinonStub } from "sinon";
import db from "../../../../../src/Database/Configuration";
import { Operation } from "../../../../../src/Model/Operation";
import { expect } from "chai";
import insertReviews from "../../../../../src/Database/Entities/Command/InsertReviews";
import { IInsertUserReviewsModel } from "../../../../../src/Model/IInsertUserReviewsModel";

describe("InsertReviews tests", () => {
    let dbInstanceStub: SinonStub;
    let insertStub: SinonStub;
    let intoStub: SinonStub;
    let consoleStub: SinonStub;
    const testDataToInsert: IInsertUserReviewsModel[] = [
        {
            "review": "Pero deberia de poder cambiarle el idioma a alexa",
            "author": "WarcryxD",
            "review_source": "iTunes",
            "rating": 4,
            "title": "Excelente",
            "product_name": "Amazon Alexa",
            "reviewed_date": "2018-01-12T02:27:03.000Z" as unknown as Date
        },
        {
            "review": "Cannot fix connection glitches without this-also fix connection glitches \n\nSmart things sees my light and Alexa doesn’t :(\n\n*update new devices “unresponsive” each day...they are working fine in SmartThings. No way to delete disabled devices. Very poor.",
            "author": "Ranchorat",
            "review_source": "iTunes",
            "rating": 1,
            "title": "Need to be able to delete devices",
            "product_name": "Amazon Alexa",
            "reviewed_date": "2017-12-06T13:06:33.000Z" as unknown as Date
        }
    ]

    beforeEach(() => {
        dbInstanceStub = sinon.stub(db, "DBInstance");
        insertStub = sinon.stub().returnsThis();
        intoStub = sinon.stub();
        dbInstanceStub.returns({
            dbConnector: {
                insert: insertStub,
                into: intoStub
            }
        });
        consoleStub = sinon.stub(console, "error");
    })

    afterEach(() => {
        insertStub.reset();
        intoStub.reset();
        dbInstanceStub.restore();
        consoleStub.restore();
    })

    it("insert_WhenSuccessfulInsertionToDB_ShouldReturnCreated", async () => {
        // Arrange
        intoStub.resolves(Operation.Created);       
        const expectedResult = Operation.Created;

        // Act
        const actualResult = await insertReviews.insert(testDataToInsert);

        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("insert_WhenDBError_ShouldReturnError", async () => {
        // Arrange
        intoStub.throws("test DB error.");       
        const expectedResult = Operation.Error;

        // Act
        const actualResult = await insertReviews.insert(testDataToInsert);

        // Assert
        expect(actualResult).to.eql(expectedResult);
        sinon.assert.calledWith(consoleStub, "[DB] Error inserting user Reviews Data. Error: ");
    });
})