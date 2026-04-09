import { IncomingMessage, ServerResponse } from "node:http";
import AuthRouter, { AuthApis } from "../modules/auth/auth.router";
import { IRequest, Modules } from "../types/shared.types";

export default function routesInitializer(request: IRequest, response: ServerResponse) {
    console.debug("Routes Initializer middleware executed");
    if (request?.baseUrl === "api") {
        try {
            switch (request.module) {
                case Modules.AUTH:
                    new AuthRouter(request, response);
                    break
                default:
                    response.end("Invalid API endpoint");
            }
        } catch (error) {
            console.error("Error in route handler:", error);
            response.statusCode = 500;
            response.end("Internal Server Error");
        }
    }
    else response.end("Invalid API endpoint");
}
