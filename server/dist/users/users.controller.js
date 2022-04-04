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
exports.UsersController = void 0;
const users_repository_1 = require("./users.repository");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const axios_1 = require("@nestjs/axios");
const axios_2 = require("axios");
const multer_options_1 = require("../common/utils/multer.options");
const jwt_guard_1 = require("../auth/jwt/jwt.guard");
const login_request_dto_1 = require("../auth/dto/login.request.dto");
const auth_service_1 = require("../auth/auth.service");
const users_request_dto_1 = require("./dto/users.request.dto");
const success_interceptor_1 = require("../common/interceptors/success.interceptor");
const http_exception_filter_1 = require("../common/exceptions/http-exception.filter");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(usersService, authService, usersRepository, httpService) {
        this.usersService = usersService;
        this.authService = authService;
        this.usersRepository = usersRepository;
        this.httpService = httpService;
    }
    auth(req) {
        const token = req.rawHeaders[1].slice(7);
        return { isLogin: true, userInfo: req.user, token };
    }
    async oauth(req, body) {
        const refreshToken = req.rawHeaders[9];
        const { oauthId } = body;
        const user = await this.usersService.findOauthUser(oauthId);
        return { isLogin: true, userInfo: user, token: refreshToken };
    }
    async naverlogin(query) {
        const provider = 'naver';
        const { code, state } = query;
        const naverUrl = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&code=${code}&state=${state}`;
        const naverToken = await axios_2.default.get(naverUrl, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
        });
        const accessToken = naverToken.data.access_token;
        const refreshToken = naverToken.data.refresh_token;
        console.log(accessToken);
        console.log(refreshToken);
        const userData = await axios_2.default.get('https://openapi.naver.com/v1/nid/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
        const user = await this.authService.validateUser(userData.data.response.id, userData.data.response.name, refreshToken, provider);
        console.log(user);
        return { token: refreshToken, oauthId: user.oauthId };
    }
    async kakaoLogin(query) {
        const provider = 'kakao';
        const { code } = query;
        const kakaoUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_CALLBACK_URL}&code=${code}`;
        const kakaoToken = await axios_2.default.post(kakaoUrl, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
        });
        const accessToken = kakaoToken.data.access_token;
        const refreshToken = kakaoToken.data.refresh_token;
        const userData = await axios_2.default.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
        console.log(userData.data.properties.nickname);
        const user = await this.authService.validateUser(userData.data.id, userData.data.properties.nickname, refreshToken, provider);
        console.log(user);
        return { token: refreshToken, oauthId: user.oauthId };
    }
    async googleLogin(query) {
        const provider = 'google';
        const { code } = query;
        const googleUrl = `https://oauth2.googleapis.com/token?grant_type=authorization_code&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_PASSWORD}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}&code=${code}`;
        const googleToken = await axios_2.default.post(googleUrl, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
        });
        const { access_token, id_token } = googleToken.data;
        const userData = await axios_2.default.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`);
        const { sub, name } = userData.data;
        console.log(userData);
        const user = await this.authService.validateUser(sub, name, access_token, provider);
        console.log(user);
        return { token: access_token, oauthId: user.oauthId };
    }
    async login(body) {
        return this.authService.jwtLogIn(body);
    }
    async signup(body) {
        const signupService = await this.usersService.createUser(body);
        return signupService;
    }
    logout(req, res) {
        res.cookie('jwt', '', {
            maxAge: 0,
        });
        return res.send({
            message: 'success',
        });
    }
    signout(req) {
        return this.usersService.deleteUser(req.user);
    }
    updateUser(body) {
        return this.usersService.updateUser(body);
    }
    updateStacks(param, body) {
        return this.usersService.changeStacksBoolean(param, body);
    }
    verifyEmail(body) {
        return this.usersService.verifyUserEmail(body);
    }
    verifyUsername(body) {
        return this.usersService.verifyUsername(body);
    }
    getUsersPosts(req) {
        return this.usersService.getUsersPosts(req);
    }
    uploadImage(files, param) {
        return this.usersService.uploadImg(param, files);
    }
    sendPhoneMessage(body) {
        return this.usersService.sendPhoneMessage(body);
    }
    usersPayment(body) {
        return this.usersService.usersPayment(body);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/auth'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "auth", null);
__decorate([
    (0, common_1.Post)('/oauth'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "oauth", null);
__decorate([
    (0, common_1.Get)('auth/naver'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "naverlogin", null);
__decorate([
    (0, common_1.Get)('auth/kakao'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "kakaoLogin", null);
__decorate([
    (0, common_1.Get)('auth/google'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_request_dto_1.LoginRequestDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_request_dto_1.UserRequestDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signup", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "logout", null);
__decorate([
    (0, common_1.Delete)('/signout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "signout", null);
__decorate([
    (0, common_1.Patch)('/profile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)('/stacks/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateStacks", null);
__decorate([
    (0, common_1.Post)('/verify/email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('/verify/username'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "verifyUsername", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('posts'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsersPosts", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('image', 10, (0, multer_options_1.multerOptions)('users'))),
    (0, common_1.Post)('upload/:id'),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('/sms'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "sendPhoneMessage", null);
__decorate([
    (0, common_1.Post)('/payment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "usersPayment", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseInterceptors)(success_interceptor_1.SuccessInterceptor),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService,
        users_repository_1.UsersRepository,
        axios_1.HttpService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map