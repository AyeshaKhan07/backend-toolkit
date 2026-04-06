import { ServerResponse } from "node:http";
import { AuthApis } from "../modules/auth/auth.router";
import { LoginDto } from "../modules/auth/dtos/login.dto";
import { IRequest, Methods } from "../types/shared.types";
import { responseParser } from "../shared/response-parser";

export default function requestValidator(request: IRequest, response: ServerResponse, nextMiddleware: Function) {
    const noBodyMethods: Methods[] = ["GET", "HEAD", "DELETE"];

    if (noBodyMethods.includes(request.method as Methods))
        return nextMiddleware();

    switch (request.api) {
        case AuthApis.LOGIN:
            const errors = new LoginDto(request.body).errorMessages;
            if (Object.keys(errors).length)
                return response.end(responseParser({ errors, message: "Validation failed" }));
            
            nextMiddleware();
            break;

        default:
            break;
    }
}
