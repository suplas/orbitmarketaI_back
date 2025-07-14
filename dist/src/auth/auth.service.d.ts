import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, pass: string): Promise<any>;
    validateSocialUser(data: {
        email: string;
        displayName: string;
        snsId: string;
        platform: string;
        profileImage?: string | null;
    }): Promise<{
        id: number;
        email: string;
        password: string | null;
        name: string | null;
        role: import(".prisma/client").$Enums.Role;
        status: import(".prisma/client").$Enums.AccountStatus;
        platform: string;
        snsId: string | null;
        profileImage: string | null;
        providerEmail: string | null;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(user: any): {
        access_token: string;
    };
}
