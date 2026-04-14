import crypto from "node:crypto";
import { IToken } from "../types/shared.types";
import ApiError from "../shared/error-handler";

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
        const iv = crypto.randomBytes(16);
        const secret = process.env.JWT_SECRET

        try {
            if (secret) {
                const key = crypto.createHash('sha256').update(secret).digest();

                const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

                let encrypted = cipher.update(JSON.stringify(payload), 'utf8', 'hex');
                encrypted += cipher.final('hex');

                return `${encrypted}|${iv.toString('hex')}`;
            }

            throw new Error("JWT_SECRET is not defined in environment variables");
        } catch (error) {
            throw error
        }
    }

    static verifyToken(token: string) {
        const [encryptedData, iv] = token.split('|');
        const secret = process.env.JWT_SECRET;
        if (secret && encryptedData && iv) {
            const key = crypto.createHash('sha256').update(secret).digest();
            const decipher = crypto.createDecipheriv(
                'aes-256-cbc',
                key,
                Buffer.from(iv, 'hex')
            );

            // Decrypt the data
            let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            try {
                return JSON.parse(decrypted);
            } catch (error) {
                throw new ApiError("Invalid token", { statusCode: 401 });
            }
        }
        if (!secret) throw new ApiError("JWT_SECRET is not defined in environment variables");
        if (!encryptedData || !iv) throw new ApiError("Invalid token", { statusCode: 401 });
    }
}

export default Crypto;