import { AuthService } from './auth.service';
import { User } from '@prisma/client';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: {
        user: Omit<User, 'password'>;
    }): {
        access_token: string;
    };
    googleAuth(): void;
    googleAuthRedirect(req: {
        user: Omit<User, 'password'>;
    }): {
        access_token: string;
    };
    kakaoAuth(): void;
    kakaoAuthRedirect(req: {
        user: Omit<User, 'password'>;
    }): {
        access_token: string;
    };
}
