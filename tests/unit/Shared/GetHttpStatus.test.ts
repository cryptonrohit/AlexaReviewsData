import { expect } from "chai";
import { Operation } from "../../../src/Model/Operation";
import { getHttpStatusData } from "../../../src/Shared/GetHttpStatus";

describe("GetHttpStatus tests", () => {

    it("getHttpStatusData_WhenOperationSuccess_ShouldReturnStatusCode200", async () => {
        // Arrange
        const expectedResult = {statusCode: 200, outputData: "All good."};

        // Act
        const actualResult = getHttpStatusData(Operation.Success)
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("getHttpStatusData_WhenOperationNoDataFound_ShouldReturnStatusCode404", async () => {
        // Arrange
        const expectedResult = {statusCode: 404, outputData: "No data available"};

        // Act
        const actualResult = getHttpStatusData(Operation.NoDataFound)
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("getHttpStatusData_WhenOperationCreated_ShouldReturnStatusCode201", async () => {
        // Arrange
        const expectedResult = {statusCode: 201, outputData: "Created"};

        // Act
        const actualResult = getHttpStatusData(Operation.Created)
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("getHttpStatusData_WhenOperationError_ShouldReturnStatusCode500", async () => {
        // Arrange
        const expectedResult = {statusCode: 500, outputData: "Internal Server Error"};

        // Act
        const actualResult = getHttpStatusData(Operation.Error)
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("getHttpStatusData_WhenAnyOtherOperation_ShouldReturnStatusCode400", async () => {
        // Arrange
        const expectedResult = {statusCode: 400, outputData: "Bad Request"};

        // Act
        const actualResult = getHttpStatusData(Operation.BadRequest)
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });
})