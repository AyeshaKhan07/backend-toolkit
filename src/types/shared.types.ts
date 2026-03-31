import { IncomingMessage } from "node:http";

export type Methods = "POST" | "GET" | "PUT" | "DELETE";
export interface IRequest extends IncomingMessage {
    body: any;
}