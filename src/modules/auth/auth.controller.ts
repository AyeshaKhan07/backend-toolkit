import { IncomingMessage, ServerResponse } from "node:http";
import AuthService from "./auth.service";
import { IRequest } from "../../types/shared.types";
import { responseParser } from "../../shared/response-parser";

class AuthController {
    private service: AuthService
    constructor() {
        this.service = new AuthService();
    }
    login(req: IRequest, res: ServerResponse) {
        this.service.login(req.body);
        return res.end(responseParser({ statusCode: 200, message: "Login successful" }));
    }

    register(req: IncomingMessage, res: ServerResponse) {
        // Handle registration
    }
}

export default AuthController;
