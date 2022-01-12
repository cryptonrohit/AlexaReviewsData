import sinon, { SinonStub } from "sinon";
import { expect } from "chai";
import { Operation } from "../../../src/Model/Operation";
import insertReviews from "../../../src/Database/Entities/Command/InsertReviews";
import insertAlexaReviewsService from "../../../src/Services/InsertAlexaReviewsService";

describe("InsertAlexaReviewsService tests", () => {
    let insertReviewsStub: SinonStub;
    const uploadedTestData = `{"review":"Pero deberia de poder cambiarle el idioma a alexa","author":"WarcryxD","review_source":"iTunes",
    "rating":4,"title":"Excelente","product_name":"Amazon Alexa","reviewed_date":"2018-01-12T02:27:03.000Z"}\n{"review":"Not so good.",
    "author":"Rohit","review_source":"iTunes","rating":2,"title":"Worst","product_name":"Amazon Alexa","reviewed_date":"2019-02-12T02:27:03.000Z"}\n`
    beforeEach(() => {
        insertReviewsStub = sinon.stub(insertReviews, "insert");
    })

    afterEach(() => {
        insertReviewsStub.restore();
    });

    it("execute_WhenFileSuccessfullyInserted_ShouldReturnStatusCode201", async () => {
        // Arrange
        insertReviewsStub.returns(Operation.Created);
        const expectedResult = {data: "Created", status: 201};

        // Act
        const actualResult = await insertAlexaReviewsService.execute(uploadedTestData);
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("execute_WhenDBError_ShouldReturnStatusCode500", async () => {
        // Arrange
        insertReviewsStub.returns(Operation.Error);
        const expectedResult = {data: "Internal Server Error", status: 500};

        // Act
        const actualResult = await insertAlexaReviewsService.execute(uploadedTestData);
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("execute_WhenAnyOtherException_ShouldReturnStatusCode400", async () => {
        // Arrange
        insertReviewsStub.returns(Operation.BadRequest);
        const expectedResult = {data: "Bad Request", status: 400};

        // Act
        const actualResult = await insertAlexaReviewsService.execute(uploadedTestData);
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });
})