import { IncomingMessage } from "node:http";

export type Methods = "POST" | "GET" | "PUT" | "DELETE" | "HEAD";
export interface IRequest extends IncomingMessage {
    body: any;
}