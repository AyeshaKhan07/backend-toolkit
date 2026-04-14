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
    user: {
        id: number,
        email: string
    }
}

export interface IToken {
    email: string
    id: number
}

export interface IError extends Error {
    statusCode?: number;
    validationErrors?: { [key: string]: string };
}
