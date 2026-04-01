import { IncomingMessage, ServerResponse } from "node:http";
import AuthRouter, { AuthUrls } from "../modules/auth/auth.router";
import { IRequest } from "../types/shared.types";

export default function routesInitializer(request: IncomingMessage, response: ServerResponse) {
    const baseUrl = request.url?.split("/")
    if (baseUrl?.[1] === "api") {
        switch (baseUrl[2]) {
            case "auth":
                new AuthRouter(baseUrl[3] as AuthUrls, request as IRequest, response);
                break
            default:
                response.end("Invalid API endpoint");
        }
    }
    else response.end("Invalid API endpoint");
}
