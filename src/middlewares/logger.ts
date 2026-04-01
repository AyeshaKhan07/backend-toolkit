import { ServerResponse } from "node:http";
import { IRequest } from "../types/shared.types";

export default function logger(incomingRequest: IRequest, response: ServerResponse, nextMiddleware: Function) {
    const { method, url } = incomingRequest;
    console.log(`\n${method} ${url}\t ${new Date().toISOString()}`);
    if(method === "POST" || method === "PUT") {
        console.log("Request body:", incomingRequest.body);
    }
    nextMiddleware();
}
