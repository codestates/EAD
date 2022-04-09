/* eslint-disable operator-assignment */
/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable no-return-await */
/* eslint-disable lines-between-class-members */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { AwsService } from 'src/aws.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { AuthService } from '../auth/auth.service';
import { UserRequestDto } from './dto/users.request.dto';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { UsersService } from './users.service';
import { User } from './users.schema';
import { Post as PostModel } from '../posts/posts.schema';
import { Comment } from '../posts/comments.schema';

@Controller('users')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class UsersController {
  // 의존성 주입
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly awsService: AwsService,
    private httpService: HttpService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(PostModel.name) private readonly postModel: Model<PostModel>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/auth')
  auth(@Req() req) {
    const token = req.rawHeaders[1].slice(7);

    return { isLogin: true, userInfo: req.user, token };
  }

  @Post('/oauth')
  async oauth(@Req() req, @Body() body) {
    const refreshToken = req.rawHeaders[9];
    const { oauthId } = body;
    const user = await this.usersService.findOauthUser(oauthId);

    return { isLogin: true, userInfo: user, token: refreshToken };
  }

  // Naver 로그인
  @Get('auth/naver')
  async naverlogin(@Query() query) {
    const provider = 'naver';
    const { code, state } = query;
    const naverUrl = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&code=${code}&state=${state}`;
    const naverToken = await axios.get(naverUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true,
    });

    const accessToken = naverToken.data.access_token;
    const refreshToken = naverToken.data.refresh_token;

    const userData = await axios.get('https://openapi.naver.com/v1/nid/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    const user = await this.authService.validateUser(
      userData.data.response.id,
      userData.data.response.name,
      refreshToken,
      provider,
    );

    return { token: refreshToken, oauthId: user.oauthId };
  }

  // Kakao 로그인
  @Get('auth/kakao')
  async kakaoLogin(@Query() query) {
    const provider = 'kakao';
    const { code } = query;
    const kakaoUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_CALLBACK_URL}&code=${code}`;

    const kakaoToken = await axios.post(kakaoUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true,
    });

    const accessToken = kakaoToken.data.access_token;
    const refreshToken = kakaoToken.data.refresh_token;

    const userData = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    console.log(userData.data.properties.nickname);
    const user = await this.authService.validateUser(
      userData.data.id,
      userData.data.properties.nickname,
      refreshToken,
      provider,
    );

    return { token: refreshToken, oauthId: user.oauthId };
  }

  // Google 로그인
  @Get('auth/google')
  async googleLogin(@Query() query) {
    const provider = 'google';
    const { code } = query;

    const googleUrl = `https://oauth2.googleapis.com/token?grant_type=authorization_code&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_PASSWORD}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}&code=${code}`;
    const googleToken = await axios.post(googleUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true,
    });

    const { access_token, id_token } = googleToken.data;

    const userData = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`,
    );
    const { sub, name } = userData.data;

    const user = await this.authService.validateUser(
      sub,
      name,
      access_token,
      provider,
    );

    return { token: access_token, oauthId: user.oauthId };
  }

  // 유저 로그인
  @Post('/login')
  async login(@Body() body: LoginRequestDto) {
    return this.authService.jwtLogIn(body);
  }

  // 유저 회원가입
  @Post('/signup')
  async signup(@Body() body: UserRequestDto) {
    const signupService = await this.usersService.createUser(body);
    return signupService;
  }

  // 유저 로그아웃
  @Post('/logout')
  logout(@Req() req, @Res() res) {
    res.cookie('jwt', '', {
      maxAge: 0,
    });
    return res.send({
      message: 'success',
    });
  }

  // 유저 회원탈퇴
  @Delete('/signout')
  signout(@Req() req) {
    return this.usersService.deleteUser(req.user);
  }

  // 유저 회원정보 수정
  @Patch('/profile')
  updateUser(@Body() body) {
    return this.usersService.updateUser(body);
  }

  // 유저 스택 변경
  @Post('/stacks/:id')
  updateStacks(@Param() param, @Body() body) {
    return this.usersService.changeStacksBoolean(param, body);
  }

  // email 유효성 검사
  @Post('/verify/email')
  verifyEmail(@Body() body) {
    return this.usersService.verifyUserEmail(body);
  }

  // username 유효성 검사
  @Post('/verify/username')
  verifyUsername(@Body() body) {
    return this.usersService.verifyUsername(body);
  }

  // 유저 프로필 사진 업로드
  @UseInterceptors(FileInterceptor('image'))
  @Post('upload/:id')
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Param() param) {
    const { id } = param;
    const user = await this.userModel.findById(id);

    if (user.imgUrl) {
      await this.awsService.deleteS3Object(user.imgUrl.slice(42));
    }

    const result = await this.awsService.uploadFileToS3('users', file);
    const imgUrl = await this.awsService.getAwsS3FileUrl(result.key);
    user.imgUrl = imgUrl;
    await user.save();

    // 유저의 포스트, 댓글 이미지 수정
    await this.postModel.updateMany(
      { writer: id },
      { $set: { writerImg: user.imgUrl } },
    );
    await this.commentModel.updateMany(
      { writer: id },
      { $set: { writerImg: user.imgUrl } },
    );

    return user;
  }

  // 문자 인증
  @Post('/sms')
  sendPhoneMessage(@Body() body) {
    return this.usersService.sendPhoneMessage(body);
  }

  // 금액 충전
  @Post('/payment')
  usersPayment(@Body() body) {
    return this.usersService.usersPayment(body);
  }

  // 금액 충전 (모바일)
  @Get('/payment/mobile/:imp_uid/:merchant_uid')
  async usersPaymentMobile(@Param() param, @Req() req) {
    const { imp_uid } = param;

    const getToken = await axios.post(
      'https://api.iamport.kr/users/getToken',
      {
        imp_key: '7617144421555476',
        imp_secret:
          '51a0e59f49ef90aacc3548c8563412dcea27f4a20e0f94a2327c609ba12aed1c21801ba8f46230b1',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );

    const { access_token } = getToken.data.response;
    console.log(access_token);

    // imp_uid로 아임포트 서버에서 결제 정보 조회
    const getPaymentData = await axios.get(
      `https://api.iamport.kr/payments/${imp_uid}`,
      {
        headers: { Authorization: access_token },
      },
    );
    const paymentData = getPaymentData.data.response;
    console.log(paymentData.amount);
    const user = await this.userModel
      .findOne({
        username: paymentData.buyer_name,
      })
      .select('-password');

    user.money = user.money + paymentData.amount;
    user.save();

    return {
      isLogin: true,
      userInfo: user,
      accessToken: req.headers.authorization.slice(7),
    };
  }
}
