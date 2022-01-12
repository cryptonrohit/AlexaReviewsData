import sinon from "sinon";
import getReviewsDataByRatingMiddleware from "../../../src/Middleware/GetReviewsDataByRatingMiddleware";

describe("GetReviewsDataByRatingMiddleware tests", () => {
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

    it("validate_WhenRatingIsUndefined_ShouldReturnStatusCode400", async () => {
        // Arrange
        request.params = {rating: undefined};      

        // Act
        getReviewsDataByRatingMiddleware.validate(request, response, next)
    
        // Assert
        sinon.assert.calledWith(response.status, 400);
        sinon.assert.calledWith(response.send, "Rating entered is invalid. Please enter a valid rating.");
    });

    it("validate_WhenRatingNotInRange1-5_ShouldReturnStatusCode400", async () => {
        // Arrange
        request.params = {rating: 6};      

        // Act
        getReviewsDataByRatingMiddleware.validate(request, response, next)
    
        // Assert
        sinon.assert.calledWith(response.status, 400);
        sinon.assert.calledWith(response.send, "Please enter a rating between 1-5.");
    });

    it("validate_WhenRatingInRange1-5_ShouldCallNextFunction", async () => {
        // Arrange
        request.params = {rating: 4};      

        // Act
        getReviewsDataByRatingMiddleware.validate(request, response, next)
    
        // Assert
        sinon.assert.called(next);
    });
})