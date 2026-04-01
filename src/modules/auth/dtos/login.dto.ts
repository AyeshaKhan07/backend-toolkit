export interface ILoginDto {
    email: string;
    password: string;
}

export class LoginDto {
    public email: string;
    public password: string;

    constructor(
        payload: ILoginDto
    ) {
        this.email = payload.email;
        this.password = payload.password;
        this.validateEmail();
        this.validatePassword();
    }

    validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    validatePassword() {
        return this.password.length >= 6;
    }
}