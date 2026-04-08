import { ServerResponse } from "node:http";
import { IRequest } from "../types/shared.types";
import { responseParser } from "../shared/response-parser";

export default function authentication(request: IRequest, response: ServerResponse, nextMiddleware: () => void) {
    const token = request.headers["authorization"]?.split(" ")[1];
    if (!token || token !== "valid-token") { // Replace with actual token validation logic
        response.end(responseParser({ message: "Unauthorized", statusCode: 401 }));
        return;
    }
    nextMiddleware()
    // Verify token (pseudo-code)
    // const user = verifyToken(token);
    // if (!user) {
    //     response.end(responseParser({ message: "Unauthorized", statusCode: 401 }));
    //     return;
    // }
    // request.user = user;
}