/// <reference types="multer" />
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { TwilioClient } from 'nestjs-twilio';
import { Post } from 'src/posts/posts.schema';
import { Comment } from 'src/posts/comments.schema';
import { UsersRepository } from './users.repository';
import { User } from './users.schema';
import { UserRequestDto } from './dto/users.request.dto';
export declare class UsersService {
    private readonly usersRepository;
    private readonly mailerService;
    private readonly twilio;
    private readonly userModel;
    private readonly postModel;
    private readonly commentModel;
    constructor(usersRepository: UsersRepository, mailerService: MailerService, twilio: TwilioClient, userModel: Model<User>, postModel: Model<Post>, commentModel: Model<Comment>);
    createUser(body: UserRequestDto): Promise<{
        id: string;
        email: string;
        username: string;
        stacks: object;
        oauth: any;
        imgUrl: string;
        posts: Post[];
        refreshToken: string;
        oauthId: string;
    }>;
    oauthSignUp(username: any, oauthId: any, refreshToken: any): Promise<User & {
        _id: any;
    }>;
    findUserByToken(refreshToken: any): Promise<User & {
        _id: any;
    }>;
    oauthTokenUpdate(oauthId: any, refreshToken: any): Promise<User & {
        _id: any;
    }>;
    deleteUser(userInfo: UserRequestDto): Promise<string>;
    findUserByEmail(email: any): Promise<User>;
    findOauthUser(oauthId: any): Promise<User & {
        _id: any;
    }>;
    updateUser(body: any): Promise<User & {
        _id: any;
    }>;
    changeStacksBoolean(param: any, body: any): Promise<User & {
        _id: any;
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
    uploadImg(param: any, files: Express.Multer.File[]): Promise<User & {
        _id: any;
    }>;
    sendPhoneMessage(body: any): number;
    usersPayment(body: any): Promise<User & {
        _id: any;
    }>;
}
