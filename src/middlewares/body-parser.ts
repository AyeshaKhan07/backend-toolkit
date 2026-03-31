import { IncomingMessage, ServerResponse } from "node:http";
import { IRequest } from "../types/shared.types";


export default function bodyParser(incomingRequest: IncomingMessage, response: ServerResponse) {
    const requestBody: Uint8Array<ArrayBufferLike>[] = [];
    let request: IRequest;

    incomingRequest.on("data", (chunk) => {
        requestBody.push(chunk);
    })
    .on("end", () => {
        request = incomingRequest as IRequest;
        try {
            request.body = JSON.parse(Buffer.concat(requestBody).toString());
            return request;
        } catch (err) {
            response.statusCode = 400;
            response.end("Invalid JSON body");
            return;
        }
    });
}
