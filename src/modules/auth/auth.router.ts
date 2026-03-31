import { ServerResponse } from "node:http";
import AuthController from "./auth.controller";
import { IRequest, Methods } from "../../types/shared.types";

export enum AuthUrls {
    LOGIN = "login",
    REGISTER = "register"
}
class AuthRouter {
    private authController: AuthController;
    constructor(url: AuthUrls, req: IRequest, res: ServerResponse) {
        const method = req.method as Methods;
        this.authController = new AuthController();
        switch(method) {
            case "POST":
                switch(url) {
                    case AuthUrls.LOGIN:
                        this.authController.login(req, res);
                        break;
                    case AuthUrls.REGISTER:
                        // Handle register
                        break;
                }
                break;
        }
    }
}

export default AuthRouter;
