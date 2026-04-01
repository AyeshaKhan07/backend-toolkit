import { LoginDto } from "../modules/auth/dtos/login.dto";
import { IRequest, Methods } from "../types/shared.types";

export default function requestValidator(request: IRequest, response: any, nextMiddleware: Function) {
    const noBodyMethods: Methods[] = ["GET", "HEAD", "DELETE"];

    if (noBodyMethods.includes(request.method as Methods))
        return nextMiddleware();

    switch (request.api) {
        case "login":
            const loginDto = new LoginDto(request.body);
            if (!loginDto.validateEmail()) {
                response.statusCode = 400;
                response.end("Invalid email");
                return;
            }
            if (!loginDto.validatePassword()) {
                response.statusCode = 400;
                response.end("Invalid password");
                return;
            }
            nextMiddleware();
            break;

        default:
            break;
    }
}
