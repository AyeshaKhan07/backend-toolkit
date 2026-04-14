import { ServerResponse } from "node:http";
import AuthRouter from "../modules/auth/auth.router";
import ApiError from "../shared/error-handler";
import { IRequest, Modules } from "../types/shared.types";

export default function routesInitializer(request: IRequest, response: ServerResponse) {
    console.debug("Routes Initializer middleware executed");
    if (request?.baseUrl === "api") {
        switch (request.module) {
            case Modules.AUTH:
                new AuthRouter(request, response);
                break
            default:
                throw new ApiError("Invalid API endpoint", { statusCode: 404 });
        }
    }
    else throw new ApiError("Invalid API endpoint", { statusCode: 404 });
}
