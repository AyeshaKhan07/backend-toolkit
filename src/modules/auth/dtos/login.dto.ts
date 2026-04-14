import { validateEmail } from "../../../shared/validators";

export interface ILoginDto {
    email: string;
    password: string;
}

export class LoginDto {
    public email: string;
    public password: string;
    public errorMessages: { email?: string; password?: string } = {};

    constructor(
        payload: ILoginDto
    ) {
        this.email = payload.email;
        this.password = payload.password;
        this.validateFields();
    }

    validateFields() {
        
        if(!validateEmail(this.email)){
            this.errorMessages.email = "Invalid email format";
        }
        
        if(this.password?.length < 6){
            this.errorMessages.password = "Password must be at least 6 characters long";
        }
        
        return this.errorMessages;
    }

}