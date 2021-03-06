import { Operation } from "../Model/Operation";

/**
 * This file basically gives the statusCodes according to the DB operation.
 * @param operation The DB operation.
 * @returns statusCode and the outputData
 */
export function getHttpStatusData(operation: Operation) {
    switch (operation) {
        case Operation.Success:
            return {statusCode: 200, outputData: "All good."};
        case Operation.NoDataFound:
            return {statusCode: 404, outputData: "No data available"};
        case Operation.Created:
            return {statusCode: 201, outputData: "Created"};
        case Operation.Error:
            return {statusCode: 500, outputData: "Internal Server Error"};       
        default:
            return {statusCode: 400, outputData: "Bad Request"};
    }
}
