import { IncomingMessage, ServerResponse } from "node:http";
import { IRequest, Methods } from "../types/shared.types";

export default function bodyParser(incomingRequest: IncomingMessage, response: ServerResponse, next: Function) {
    const requestBody: Uint8Array<ArrayBufferLike>[] = [];
    let request = incomingRequest as IRequest;
    const baseUrl = incomingRequest.url?.split("/");
    if (baseUrl?.length && baseUrl?.length > 2)
        request.module = baseUrl?.[2] as IRequest["module"];

    const { method } = incomingRequest;
    const noBodyMethods: Methods[] = ["GET", "HEAD", "DELETE"];

    if (noBodyMethods.includes(method as Methods))
        return next();

    incomingRequest
        .on("data", (chunk) => {
            requestBody.push(chunk);
        })
        .on("end", () => {
            try {
                request.body = JSON.parse(Buffer.concat(requestBody).toString());
                next();
            } catch (err) {
                response.statusCode = 400;
                response.end("Invalid JSON body");
            }
        })

}
