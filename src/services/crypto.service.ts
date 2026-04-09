import crypto from "node:crypto";
import { IToken } from "../types/shared.types";

class Crypto {
    static hashPassword(password: string): string {
        // Implement hashing logic
        return "hashedPassword";
    }

    static verifyPassword(password: string, hashedPassword: string): boolean {
        // Implement verification logic
        return password === hashedPassword;
    }

    static generateToken(payload: IToken): string {
        const randomIV = crypto.randomBytes(8);
        const token = crypto.createCipheriv("aes-256-cbc", process.env.JWT_SECRET||"", randomIV)
        .update(JSON.stringify(payload), "utf-8", "hex")

        return token
    }

    static verifyToken(token: string): IToken | null {
        // Implement token verification logic
        return token === "valid-token" ? { email: "user@example.com", id: 1 } : null;
    }
}

export default Crypto;