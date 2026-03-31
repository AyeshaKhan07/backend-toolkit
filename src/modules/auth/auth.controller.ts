import { IncomingMessage, ServerResponse } from "node:http";
import AuthService from "./auth.service";
import { IRequest } from "../../types/shared.types";

class AuthController {
    private service: AuthService
    constructor() {
        this.service = new AuthService();
    }
    login(req: IRequest, res: ServerResponse) {
        return this.service.login(req.body.email, req.body.password);
    }

    register(req: IncomingMessage, res: ServerResponse) {
        // Handle registration
    }
}

export default AuthController;
