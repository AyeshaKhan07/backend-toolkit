import { IncomingMessage, ServerResponse } from "node:http";

export default function errorHandler(req: IncomingMessage, res: ServerResponse, next: Function) {
    req.on("error", (error) => {
        res.statusCode = 500;
        res.end("Internal Server Error");
    });
    next()
}
