/// <reference types="multer" />
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { TwilioClient } from 'nestjs-twilio';
import { UsersRepository } from './users.repository';
import { User } from './users.schema';
import { UserRequestDto } from './dto/users.request.dto';
export declare class UsersService {
    private readonly userModel;
    private readonly usersRepository;
    private readonly mailerService;
    private readonly twilio;
    constructor(userModel: Model<User>, usersRepository: UsersRepository, mailerService: MailerService, twilio: TwilioClient);
    createUser(body: UserRequestDto): Promise<{
        id: string;
        email: string;
        username: string;
        stacks: object;
        oauth: any;
        imgUrl: string;
        posts: import("../posts/posts.schema").Post[];
        refreshToken: string;
    }>;
    oauthSignUp(username: any, refreshToken: any): Promise<void>;
    findUserByToken(refreshToken: any): Promise<User & {
        _id: any;
    }>;
    oauthTokenUpdate(user: any, refreshToken: any): Promise<void>;
    deleteUser(userInfo: UserRequestDto): Promise<string>;
    findUserByEmail(email: any): Promise<User>;
    findUserByUsername(username: any): Promise<User>;
    updateUser(req: any): Promise<{
        isLogin: boolean;
        userInfo: User & {
            _id: any;
        };
    }>;
    changeStacksBoolean(param: any, req: any): Promise<{
        message: string;
    }>;
    getUsersPosts(req: any): Promise<User & {
        _id: any;
    }>;
    verifyUserEmail(body: any): Promise<{
        message: string;
    }>;
    verifyUsername(body: any): Promise<{
        message: string;
    }>;
    uploadImg(req: any, files: Express.Multer.File[]): Promise<{
        id: string;
        email: string;
        username: string;
        stacks: object;
        oauth: any;
        imgUrl: string;
        posts: import("../posts/posts.schema").Post[];
        refreshToken: string;
    }>;
    sendEmail(body: any): Promise<void>;
    sendPhoneMessage(body: any): number;
    usersPayment(req: any, body: any): Promise<User & {
        _id: any;
    }>;
}
