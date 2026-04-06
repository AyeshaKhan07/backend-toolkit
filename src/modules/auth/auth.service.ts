import { LoginDto } from "./dtos/login.dto";

class AuthService {
    login(payload: LoginDto) {
        console.log(`Logging in with email: ${payload.email} and password: ${payload.password}`);
    }

    register(email: string, password: string) {
        // Implement registration logic
    }
}

export default AuthService;