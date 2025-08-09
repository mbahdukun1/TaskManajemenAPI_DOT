import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwt;
    constructor(usersService: UsersService, jwt: JwtService);
    validateUser(email: string, pass: string): Promise<import("../users/user.entity").User>;
    sign(user: {
        id: string;
        email: string;
        role: string;
    }): Promise<{
        access_token: string;
    }>;
}
