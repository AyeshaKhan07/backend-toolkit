import { IncomingMessage, ServerResponse } from "node:http";
import { IRequest, Methods } from "../types/shared.types";
import ApiError from "../shared/error-handler";

export default function bodyParser(incomingRequest: IncomingMessage, response: ServerResponse, nextMiddleware: Function) {
    console.debug("Body Parser middleware executed");
    const requestBody: Uint8Array<ArrayBufferLike>[] = [];
    let request = incomingRequest as IRequest;
    const baseUrl = incomingRequest.url?.split("/");

    if (baseUrl?.length) {
        request.baseUrl = baseUrl?.[1] as IRequest["baseUrl"];

        if (baseUrl?.length > 2)
            request.module = baseUrl?.[2] as IRequest["module"];

        if (baseUrl?.length > 3)
            request.api = baseUrl?.[3] as IRequest["api"];
    }

    const { method } = incomingRequest;
    const noBodyMethods: Methods[] = ["GET", "HEAD", "DELETE"];

    if (noBodyMethods.includes(method as Methods))
        return nextMiddleware();

    incomingRequest
        .on("data", (chunk) => {
            requestBody.push(chunk);
        })
        .on("end", () => {
            if (requestBody.length)
                try {
                    request.body = JSON.parse(Buffer.concat(requestBody).toString());
                    nextMiddleware();

                } catch (err) {
                    throw new ApiError("Invalid JSON body", { statusCode: 400 });
                }
            else {
                request.body = {};
                nextMiddleware();
            }
        })

}
