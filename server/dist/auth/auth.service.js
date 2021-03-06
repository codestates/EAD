"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const users_schema_1 = require("../users/users.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AuthService = class AuthService {
    constructor(usersService, jwtService, userModel) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async jwtLogIn(data) {
        const { email, password } = data;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.HttpException('please check your email or password', 401);
        }
        const isPasswordValidated = await bcrypt.compare(password, user.password);
        if (!isPasswordValidated) {
            throw new common_1.HttpException('please check your email or password', 401);
        }
        const payload = { email, sub: user.id };
        return {
            isLogin: true,
            userInfo: user,
            token: this.jwtService.sign(payload),
        };
    }
    async validateUser(id, name, refreshToken, provider) {
        const username = Math.random().toString(36).substr(2, 11);
        const oauthId = `${id}/${name}/${provider}`;
        const user = await this.usersService.findOauthUser(oauthId);
        let newUser;
        if (!user) {
            newUser = this.usersService.oauthSignUp(username, oauthId, refreshToken);
        }
        else {
            newUser = this.usersService.oauthTokenUpdate(oauthId, refreshToken);
        }
        return newUser;
    }
    onceToken(userProfile) {
        const payload = {
            user_email: userProfile.user_email,
            user_nick: userProfile.user_nick,
            user_provider: userProfile.user_provider,
            user_token: 'onceToken',
        };
        const token = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '10m',
        });
        return token;
    }
    async createLoginToken(user) {
        const payload = {
            user_no: user.user_no,
            user_token: 'loginToken',
        };
        const token = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '6m',
        });
        return token;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map