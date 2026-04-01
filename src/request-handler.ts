import { IncomingMessage, ServerResponse } from "node:http";

export default function requestHandler(request: IncomingMessage, response: ServerResponse, middlewares: Array<any>) {
    let index = 0;
    function next() {
        const middleware = middlewares[index];
        if(index < middlewares.length)
            index++
        middleware(request, response, next);
    }
    next();
}