import { Role } from '@prisma/client';
export declare class CreateUserDto {
    email: string;
    password?: string;
    name?: string;
    role?: Role;
    platform?: string;
    snsId?: string;
    profileImage?: string | null;
}
