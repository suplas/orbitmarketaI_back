import { AuthService } from './auth.service';
import { User } from '@prisma/client';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: {
        user: Omit<User, 'password'>;
    }): Promise<{
        access_token: string;
    }>;
}
