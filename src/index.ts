import { createServer } from "node:http";
import AuthRouter, { AuthUrls } from "./modules/auth/auth.router";
import { IRequest, Methods } from "./types/shared.types";

const server = createServer();

server.on("request", (incomingRequest, response) => {
    const requestBody: Uint8Array<ArrayBufferLike>[] = [];
    const baseUrl = incomingRequest.url?.split("/")
    let request: IRequest;

    incomingRequest.on("data", (chunk) => {
        requestBody.push(chunk);
    })

    .on("end", () => {
        request = incomingRequest as IRequest;
        try {
            request.body = JSON.parse(Buffer.concat(requestBody).toString());
        } catch (err) {
            response.statusCode = 400;
            response.end("Invalid JSON body");
            return;
        }

        if (baseUrl?.[1] === "api") {
            switch (baseUrl[2]) {
                case "auth":
                    new AuthRouter(baseUrl[3] as AuthUrls, request, response);
                    break
                default:
                    response.end("Invalid API endpoint");
            }
            response.end();
        }
        else response.end("Invalid API endpoint");
    })
    .on("error", (err) => {
        console.error("Error occurred:", err);
        response.statusCode = 500;
        response.end("Internal Server Error");
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});