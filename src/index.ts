import { createServer } from "node:http";
import { loadEnvFile } from "node:process";
import bodyParser from "./middlewares/body-parser";
import logger from "./middlewares/logger";
import requestValidator from "./middlewares/request-validator";
import routesInitializer from "./middlewares/routes-initializer";
import requestHandler from "./request-handler";
import { connectDatabase } from "./database";
import authentication from "./middlewares/authentication";

loadEnvFile();
const server = createServer();
connectDatabase();
server.on("request", (req, res) => requestHandler(req, res, [authentication, bodyParser, logger, requestValidator, routesInitializer]))
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});