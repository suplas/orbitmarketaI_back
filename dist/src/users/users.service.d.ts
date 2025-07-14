import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<{
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
    } | null>;
    findById(id: number): Promise<{
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
    } | null>;
    findByPlatformAndSnsId(platform: string, snsId: string): Promise<{
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
    } | null>;
    create(data: CreateUserDto): Promise<{
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
}
