import { PrismaService } from 'src/prisma/prisma.service';
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
}
