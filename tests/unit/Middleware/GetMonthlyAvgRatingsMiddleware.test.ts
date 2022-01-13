import sinon from "sinon";
import getMonthlyAvgRatingsMiddleware from "../../../src/Middleware/GetMonthlyAvgRatingsMiddleware";

describe("GetMonthlyAvgRatingsMiddleware tests", () => {
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

    it("validate_WhenNoStoreTypePassed_ShouldCallNextFunction", async () => {
        // Arrange

        // Act
        getMonthlyAvgRatingsMiddleware.validate(request, response, next)
    
        // Assert
        sinon.assert.called(next);
    });

    it("validate_WhenDifferentStoreTypePassed_ShouldReturnStatusCode400", async () => {
        // Arrange
        request.query = {storeType: "Microsoft"};      

        // Act
        getMonthlyAvgRatingsMiddleware.validate(request, response, next)
    
        // Assert
        sinon.assert.calledWith(response.status, 400);
        sinon.assert.calledWith(response.send, "Please enter a valid store Type i.e either iTunes or GooglePlayStore. Please follow case sensitive.");
    });

    it("validate_WhenProperStoreTypePassed_ShouldCallNextFunction", async () => {
        // Arrange
        request.query = {storeType: "iTunes"};      

        // Act
        getMonthlyAvgRatingsMiddleware.validate(request, response, next)
    
        // Assert
        sinon.assert.called(next);
    });
})