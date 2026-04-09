import Crypto from "../../services/crypto.service";
import { LoginDto } from "./dtos/login.dto";

class AuthService {
    login(payload: LoginDto) {
        const token = Crypto.generateToken({ email: payload.email, id: 1 }); // Mock user ID
        console.log(`Logging in with email: ${payload.email} and password: ${payload.password}`);
        return token;
    }

    register(email: string, password: string) {
        // Implement registration logic
    }
}

export default AuthService;