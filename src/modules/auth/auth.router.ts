import { ServerResponse } from "node:http";
import AuthController from "./auth.controller";
import { IRequest, Methods } from "../../types/shared.types";

export enum AuthUrls {
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
                    case AuthUrls.LOGIN:
                        this.authController.login(req, res);
                        break;
                    case AuthUrls.REGISTER:
                        // Handle register
                        break;
                    default:
                        res.writeHead(404);
                        res.end("Endpoint not found");
                        break
                }
                break;
            default:
                res.writeHead(405);
                res.end("Method not allowed");
                break
        }
    }
}

export default AuthRouter;
