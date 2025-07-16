import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private readonly authService;
    private readonly configService;
    constructor(authService: AuthService, configService: ConfigService);
    private socialLoginRedirect;
    login(req: {
        user: Omit<User, 'password'>;
    }): {
        access_token: string;
    };
    googleAuth(): void;
    googleAuthRedirect(req: {
        user: Omit<User, 'password'>;
    }, res: Response): void;
    kakaoAuth(): void;
    kakaoAuthRedirect(req: {
        user: Omit<User, 'password'>;
    }, res: Response): void;
    naverAuth(): void;
    naverAuthRedirect(req: {
        user: Omit<User, 'password'>;
    }, res: Response): void;
}
