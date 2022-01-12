import sinon from "sinon";
import insertReviewsDataMiddleware from "../../../src/Middleware/InsertReviewsDataMiddleware";

describe("InsertReviewsDataMiddleware tests", () => {
    let request: any;
    let response: any;
    let next: any;

    beforeEach(() => {
        request = {
            query: {},
            params: {},
            files: {}
        };
        response = {
            send: sinon.spy(),
            status: sinon.spy(),
        };
        next = sinon.spy();
    })

    it("validate_WhenNoFileUploaded_ShouldReturnStatusCode400", async () => {
        // Arrange
        request.files = null;

        // Act
        insertReviewsDataMiddleware.validate(request, response, next)
    
        // Assert
        sinon.assert.calledWith(response.status, 400);
        sinon.assert.calledWith(response.send, "No file uploaded. Please upload a json file");
    });

    it("validate_WhenImproperFileKeyName_ShouldReturnStatusCode400", async () => {
        // Arrange
        request.files = {
            testFile: {data: Buffer.from("test"), name: "textFile.json"}
        };

        // Act
        insertReviewsDataMiddleware.validate(request, response, next)
    
        // Assert
        sinon.assert.calledWith(response.status, 400);
        sinon.assert.calledWith(response.send, "Uploaded file's key name should be reviewsFile. Please reupload your json file with key: reviewsFile");
    });

    it("validate_WhenFileOtherThanJsonUploaded_ShouldReturnStatusCode400", async () => {
        // Arrange
        request.files = request.files = {
            reviewsFile: {data: Buffer.from("test"), name: "textFile.pdf"}
        };;

        // Act
        insertReviewsDataMiddleware.validate(request, response, next)
    
        // Assert
        sinon.assert.calledWith(response.status, 400);
        sinon.assert.calledWith(response.send, "Please upload a .json file");
    });

    it("validate_WhenProperFileUploaded_ShouldCallNextFunction", async () => {
        // Arrange
        request.files = request.files = {
            reviewsFile: {data: Buffer.from("test"), name: "textFile.json"}
        };;

        // Act
        insertReviewsDataMiddleware.validate(request, response, next)
    
        // Assert
        sinon.assert.called(next);
    });
})