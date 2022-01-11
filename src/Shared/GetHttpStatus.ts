import { Operation } from "../Model/Operation";

export function getHttpStatusData(operation: Operation) {
    switch (operation) {
        case Operation.Created:
            return {statusCode: 201, outputData: "Created"};
        case Operation.Error:
            return {statusCode: 500, outputData: "Internal Server Error"};       
        default:
            return {statusCode: 400, outputData: "Bad Request"};
    }
}
