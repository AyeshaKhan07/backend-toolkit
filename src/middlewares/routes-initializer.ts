import { IncomingMessage, ServerResponse } from "node:http";
import AuthRouter, { AuthUrls } from "../modules/auth/auth.router";
import { IRequest } from "../types/shared.types";

export default function routesInitializer(request: IRequest, response: ServerResponse) {
    const baseUrl = request.url?.split("/")
    if (baseUrl?.[1] === "api") {
        switch (request.module) {
            case "auth":
                new AuthRouter(baseUrl[3] as AuthUrls, request, response);
                break
            default:
                response.end("Invalid API endpoint");
        }
    }
    else response.end("Invalid API endpoint");
}
