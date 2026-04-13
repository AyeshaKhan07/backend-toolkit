import { ServerResponse } from "node:http";
import { IRequest } from "../types/shared.types";
import { responseParser } from "../shared/response-parser";
import Crypto from "../services/crypto.service";

export default function authentication(request: IRequest, response: ServerResponse, nextMiddleware: () => void) {
    console.debug("Authentication middleware executed");
    const token = request.headers["authorization"]?.split(" ")[1];
    if (!token) {
        response.statusCode = 401;
        response.end(responseParser({ message: "Unauthorized", statusCode: 401 }));
        return;
    }
    const verifyToken = Crypto.verifyToken(token);
    if (!verifyToken) {
        response.statusCode = 401;
        response.end(responseParser({ message: "Unauthorized", statusCode: 401 }));
        return;
    }
    console.log("Token verified:", verifyToken);
    request.user = verifyToken;
    nextMiddleware();
}