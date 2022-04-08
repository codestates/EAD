/// <reference types="multer" />
import { Model } from 'mongoose';
import { User } from 'src/users/users.schema';
import { Post } from './posts.schema';
import { Comment } from './comments.schema';
export declare class PostsService {
    private readonly postModel;
    private readonly commentModel;
    private readonly userModel;
    constructor(postModel: Model<Post>, commentModel: Model<Comment>, userModel: Model<User>);
    getOnePost(id: any): Promise<Post & {
        _id: any;
    }>;
    createPost(body: any): Promise<(Post & {
        _id: any;
    }) | {
        message: string;
    }>;
    updatePost(body: any, param: any): Promise<Post & {
        _id: any;
    }>;
    deletePost(param: any, body: any): Promise<{
        message: string;
    }>;
    uploadPostImg(files: Express.Multer.File[]): Promise<string>;
    searchPost(keyword: any): Promise<(Post & {
        _id: any;
    })[]>;
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
    getOneComment(param: any): Promise<Comment & {
        _id: any;
    }>;
    uploadCommentImg(files: Express.Multer.File[]): Promise<string>;
    getPostTitle(): Promise<{
        id: any;
        title: string;
        tag: string[];
    }[]>;
    getOnePostContent(id: any): Promise<{
        content: string;
    }[]>;
    getMyPost(body: any): Promise<(Post & {
        _id: any;
    })[]>;
    getMyComment(body: any): Promise<(Comment & {
        _id: any;
    })[]>;
    selectComment(body: any): Promise<void>;
}
