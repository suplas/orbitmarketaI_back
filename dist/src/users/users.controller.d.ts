import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: {
        user: {
            userId: number;
            email: string;
            role: string;
        };
    }): {
        userId: number;
        email: string;
        role: string;
    };
}
