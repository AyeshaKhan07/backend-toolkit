import { createServer, IncomingMessage, ServerResponse } from "node:http";
import bodyParser from "./middlewares/body-parser";
import requestHandler from "./request-handler";
import routesInitializer from "./middlewares/routes-initializer";
import errorHandler from "./middlewares/error-handler";
import logger from "./middlewares/logger";
import requestValidator from "./middlewares/request-validator";

const server = createServer();

server.on("request", (req, res) => requestHandler(req, res, [errorHandler, bodyParser, logger, requestValidator, routesInitializer]))

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});