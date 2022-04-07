"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const aws_service_1 = require("../aws.service");
const users_module_1 = require("../users/users.module");
const auth_module_1 = require("../auth/auth.module");
const posts_controller_1 = require("./posts.controller");
const posts_service_1 = require("./posts.service");
const posts_schema_1 = require("./posts.schema");
const comments_schema_1 = require("./comments.schema");
const users_schema_1 = require("../users/users.schema");
let PostsModule = class PostsModule {
};
PostsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: posts_schema_1.Post.name, schema: posts_schema_1.PostSchema },
                { name: comments_schema_1.Comment.name, schema: comments_schema_1.CommentSchema },
                { name: users_schema_1.User.name, schema: users_schema_1.UserSchema },
            ]),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
        ],
        controllers: [posts_controller_1.PostsController],
        providers: [posts_service_1.PostsService, aws_service_1.AwsService],
        exports: [posts_service_1.PostsService],
    })
], PostsModule);
exports.PostsModule = PostsModule;
//# sourceMappingURL=posts.module.js.map