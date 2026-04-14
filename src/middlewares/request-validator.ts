import { ServerResponse } from "node:http";
import { AuthApis } from "../modules/auth/auth.router";
import { LoginDto } from "../modules/auth/dtos/login.dto";
import ApiError from "../shared/error-handler";
import { IRequest, Methods } from "../types/shared.types";

export default function requestValidator(request: IRequest, response: ServerResponse, nextMiddleware: Function) {
    console.log("Request Validator middleware executed");
    const noBodyMethods: Methods[] = ["GET", "HEAD", "DELETE"];

    if (noBodyMethods.includes(request.method as Methods))
        return nextMiddleware();
    switch (request.api) {
        case AuthApis.LOGIN:
            const errors = new LoginDto(request.body).errorMessages;
            if (Object.keys(errors).length)
                throw new ApiError("Data validation failed", {statusCode: 400, validationErrors: errors});

            nextMiddleware();
            break;

        default:
            throw new ApiError("Invalid API endpoint", { statusCode: 404 });
    }
}
