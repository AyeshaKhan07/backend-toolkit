import { IncomingMessage, ServerResponse } from "node:http";
import AuthRouter, { AuthApis } from "../modules/auth/auth.router";
import { IRequest, Modules } from "../types/shared.types";

export default function routesInitializer(request: IRequest, response: ServerResponse) {
    
    if (request.baseUrl === "api") {
        switch (request.module) {
            case Modules.AUTH:
                new AuthRouter(request, response);
                break
            default:
                response.end("Invalid API endpoint");
        }
    }
    else response.end("Invalid API endpoint");
}
