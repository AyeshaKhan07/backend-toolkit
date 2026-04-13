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
        const responseData = this.service.login(req.body);
        res.statusCode = 200;
        return res.end(JSON.stringify({ token: responseData }));
    }

    register(req: IncomingMessage, res: ServerResponse) {
        // Handle registration
    }
}

export default AuthController;
