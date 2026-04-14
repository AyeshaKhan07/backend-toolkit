import { ServerResponse } from "node:http";
import AuthController from "./auth.controller";
import { IRequest, Methods } from "../../types/shared.types";
import ApiError from "../../shared/error-handler";

export enum AuthApis {
    LOGIN = "login",
    REGISTER = "register"
}
class AuthRouter {
    private authController: AuthController;
    constructor(req: IRequest, res: ServerResponse) {
        const method = req.method as Methods;
        this.authController = new AuthController();
        switch(method) {
            case "POST":
                switch(req.api) {
                    case AuthApis.LOGIN:
                        this.authController.login(req, res);
                        break;
                    case AuthApis.REGISTER:
                        // Handle register
                        break;
                    default:
                        throw new ApiError("Endpoint not found", { statusCode: 404 });
                }
                break;
            default:
                throw new ApiError("Method not allowed", { statusCode: 405 });
        }
    }
}

export default AuthRouter;
