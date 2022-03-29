import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.schema';
import { UsersRepository } from '../users/users.repository';
export declare class AuthService {
    private usersService;
    private readonly usersRepository;
    private jwtService;
    constructor(usersService: UsersService, usersRepository: UsersRepository, jwtService: JwtService);
    jwtLogIn(data: any): Promise<{
        isLogin: boolean;
        userInfo: User;
        token: string;
    }>;
    validateUser(userProfile: any): Promise<any>;
    onceToken(userProfile: any): string;
    createLoginToken(user: any): Promise<string>;
}
