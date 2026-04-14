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
        try {
            const responseData = this.service.login(req.body);
            res.statusCode = 200;
            return res.end(JSON.stringify({ token: responseData }));
        } catch (error: any) {
            if(error.code){
                res.statusCode = error.code;
                return res.end(JSON.stringify({ error: error.message }));
            }
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
    }

    register(req: IncomingMessage, res: ServerResponse) {
        // Handle registration
    }
}

export default AuthController;
