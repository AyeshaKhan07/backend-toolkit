import { ServerResponse } from "node:http";
import Crypto from "../services/crypto.service";
import ApiError from "../shared/error-handler";
import { IRequest } from "../types/shared.types";
import { WhiteListUrls } from "../contants";

export default function authentication(request: IRequest, response: ServerResponse, nextMiddleware: () => void) {
    console.debug("Authentication middleware executed");
    
    if (request.url && WhiteListUrls.includes(request.url)) return nextMiddleware();

    const token = request.headers["authorization"]?.split(" ")[1];
    if (!token)
        throw new ApiError("Unauthorized", { statusCode: 401 });

    const verifyToken = Crypto.verifyToken(token);
    if (!verifyToken)
        throw new ApiError("Invalid token", { statusCode: 401 });

    console.log("Token verified:", verifyToken);
    request.user = verifyToken;
    nextMiddleware();
}