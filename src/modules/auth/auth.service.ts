import Crypto from "../../services/crypto.service";
import { LoginDto } from "./dtos/login.dto";

class AuthService {
    login(payload: LoginDto) {
        try {
            const token = Crypto.generateToken({ email: payload.email, id: 1 }); // Mock user ID
            return token;
            
        } catch (error) {
            throw error;
        }
    }

    register(email: string, password: string) {
        // Implement registration logic
    }
}

export default AuthService;