/// <reference types="multer" />
import { UsersRepository } from 'src/users/users.repository';
import { Model } from 'mongoose';
import { User } from 'src/users/users.schema';
import { PostsRepository } from './posts.repository';
import { Post } from './posts.schema';
import { Comment } from './comments.schema';
export declare class PostsService {
    private readonly postsRepository;
    private readonly usersRepository;
    private readonly postModel;
    private readonly commentModel;
    private readonly userModel;
    constructor(postsRepository: PostsRepository, usersRepository: UsersRepository, postModel: Model<Post>, commentModel: Model<Comment>, userModel: Model<User>);
    getOnePost(id: any): Promise<Post & {
        _id: any;
    }>;
    createPost(body: any): Promise<Post & {
        _id: any;
    }>;
    updatePost(body: any, param: any): Promise<Post & {
        _id: any;
    }>;
    deletePost(param: any, body: any): Promise<{
        message: string;
    }>;
    uploadPostImg(body: any, param: any, files: Express.Multer.File[]): Promise<Post & {
        _id: any;
    }>;
    searchPost(keyword: any): Promise<{
        id: any;
        title: any;
        tag: any;
    }[]>;
    searchPostByTag(body: any): Promise<any[]>;
    createComment(body: any, param: any): Promise<Post & {
        _id: any;
    }>;
    modifyComment(body: any, param: any): Promise<Comment & {
        _id: any;
    }>;
    deleteComment(param: any): Promise<Post & {
        _id: any;
    }>;
    uploadCommentImg(body: any, param: any, files: Express.Multer.File[]): Promise<Comment & {
        _id: any;
    }>;
    getPostTitle(): Promise<{
        id: any;
        title: string;
        tag: string[];
    }[]>;
}
