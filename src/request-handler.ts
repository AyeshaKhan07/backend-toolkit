import { IncomingMessage, ServerResponse } from "node:http";
import ApiError from "./shared/error-handler";

export default function requestHandler(request: IncomingMessage, response: ServerResponse, middlewares: Array<any>) {
    let index = 0;
    function next() {
        const middleware = middlewares[index];
        if(index < middlewares.length)
            index++

        try {
            middleware(request, response, next);
        } catch (error) {
            ApiError.handleError(error as ApiError, response);
        }
    }
    next();
}