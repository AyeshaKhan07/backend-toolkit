import { emailRegex } from "./validation-regex";

export function validateEmail(email: string): boolean {
    return emailRegex.test(email);
}
