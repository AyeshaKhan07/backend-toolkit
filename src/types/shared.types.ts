import { IncomingMessage } from "node:http";
import { AuthApis } from "../modules/auth/auth.router";

export type Methods = "POST" | "GET" | "PUT" | "DELETE" | "HEAD";
export enum Modules {
    AUTH = "auth"
}
export interface IRequest extends IncomingMessage {
    body: any;
    module: Modules;
    baseUrl: "api";
    api: AuthApis
}

export interface IToken {
    email: string
    id: number
}