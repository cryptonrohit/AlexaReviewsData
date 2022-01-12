import sinon from "sinon";
import getReviewsDataMiddleware from "../../../src/Middleware/GetReviewsDataMiddleware";

describe("GetReviewsDataMiddleware tests", () => {
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

    it("validate_WhenNoFiltersPassed_ShouldCallNextFunction", async () => {
        // Arrange

        // Act
        getReviewsDataMiddleware.validate(request, response, next)
    
        // Assert
        sinon.assert.called(next);
    });

    it("validate_WhenAllValidFiltersPassed_ShouldCallNextFunction", async () => {
        // Arrange
        request.query = {storeType: "iTunes", rating: 4, date: "2017-12-23T00:00:00.000Z"}; 

        // Act
        getReviewsDataMiddleware.validate(request, response, next)
    
        // Assert
        sinon.assert.called(next);
    });

    it("validate_WhenDifferentStoreTypePassed_ShouldReturnStatusCode400", async () => {
        // Arrange
        request.query = {storeType: "Microsoft"} 

        // Act
        getReviewsDataMiddleware.validate(request, response, next)
    
        // Assert
        sinon.assert.calledWith(response.status, 400);
        sinon.assert.calledWith(response.send, "Please enter a valid store Type i.e either iTunes or GooglePlayStore. Please follow case sensitive.");
    });

    it("validate_WhenRatingNotInRange1-5_ShouldReturnStatusCode400", async () => {
        // Arrange
        request.query = {rating: 7} 

        // Act
        getReviewsDataMiddleware.validate(request, response, next)
    
        // Assert
        sinon.assert.calledWith(response.status, 400);
        sinon.assert.calledWith(response.send, "Please enter a rating between 1-5.");
    });

    it("validate_WhenDateIsInInvalidFormat_ShouldReturnStatusCode400", async () => {
        // Arrange
        request.query = {date: "2017-12-33T00:00:00.000Z"} 

        // Act
        getReviewsDataMiddleware.validate(request, response, next)
    
        // Assert
        sinon.assert.calledWith(response.status, 400);
        sinon.assert.calledWith(response.send, "Please enter a valid Date format");
    });
})