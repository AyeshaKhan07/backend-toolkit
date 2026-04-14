import { IncomingMessage, ServerResponse } from "node:http";

export default function errorHandler(req: IncomingMessage, res: ServerResponse, nextMiddleware: Function) {
    console.debug("Error Handler middleware executed");
    req.on("error", (error) => {
        console.debug("error handler", error)
        res.statusCode = 500;
        res.end("Internal Server Error");
    });
    nextMiddleware()
}
