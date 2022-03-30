/* eslint-disable no-console */
/* eslint-disable no-return-await */
/* eslint-disable lines-between-class-members */
import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
// import * as twilio from 'twilio';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { Post } from 'src/posts/posts.schema';
import { UsersRepository } from './users.repository';
import { User } from './users.schema';
import { UserRequestDto } from './dto/users.request.dto';

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const twilio = require('twilio')(accountSid, authToken);

@Injectable()
export class UsersService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly mailerService: MailerService,
    @InjectTwilio() private readonly twilio: TwilioClient,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(User.name) private readonly postModel: Model<Post>,
  ) {}

  // 회원가입
  async createUser(body: UserRequestDto) {
    const { email, username, password } = body;
    const isEmailExist = await this.usersRepository.existsByEmail(email);
    const isUsernameExist = await this.usersRepository.existsByUsername(
      username,
    );

    if (isEmailExist || isUsernameExist) {
      if (isEmailExist) {
        throw new HttpException('this email already exist', 400);
      }
      if (isUsernameExist) {
        throw new HttpException('this username already exist', 400);
      }
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const stacks = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];

    const user = await this.usersRepository.create({
      email,
      username,
      password: hashedPassword,
      stacks,
      oauth: false,
    });

    return user.readOnlyData;
  }

  // Oauth 유저 회원가입
  async oauthSignUp(username, refreshToken) {
    const stacks = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    await this.usersRepository.create({
      email: 'None',
      password: 'None',
      username,
      stacks,
      oauth: true,
      refreshToken,
    });
  }
  async findUserByToken(refreshToken) {
    const user = this.userModel.findOne({ refreshToken });
    return user;
  }
  async oauthTokenUpdate(user, refreshToken) {
    await this.usersRepository.oauthTokenUpdate(user, refreshToken);
  }

  // 회원탈퇴
  async deleteUser(userInfo: UserRequestDto) {
    await this.usersRepository.delete(userInfo);
    return 'successfully signout';
  }

  async findUserByEmail(email) {
    return await this.usersRepository.findUserByEmail(email);
  }

  async findUserByUsername(username) {
    return await this.usersRepository.findUserByUsername(username);
  }

  // 회원정보 수정
  async updateUser(body) {
    const { username, newUsername, newPassword } = body;

    if (!newPassword || newPassword === '') {
      await this.userModel.findOneAndUpdate(
        { username },
        { username: newUsername },
      );
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await this.userModel.findOneAndUpdate(
        { username },
        {
          username: newUsername,
          password: hashedPassword,
        },
      );
    }
    const modifiedUser = await this.userModel.findOne({
      username: newUsername,
    });
    return modifiedUser;
  }

  // 스택 버튼 누를 시 수정
  async changeStacksBoolean(param, body) {
    const { username } = body;
    const user = await this.userModel.findOne({ username });
    const idx = param.id;
    const newStacks = user.stacks;
    newStacks.splice(idx, 1, !newStacks[idx]);
    await this.userModel.findOneAndUpdate({ username }, { stacks: newStacks });
    return { message: 'ok' };
  }

  async getUsersPosts(req) {
    const { id } = req.user;
    const usersPost = await this.usersRepository.findUserPosts(id);

    return usersPost;
  }

  async verifyUserEmail(body) {
    const { email } = body;
    const isExistEmail = await this.usersRepository.existsByEmail(email);
    if (isExistEmail) {
      throw new HttpException('존재하는 이메일입니다.', 400);
    } else {
      return { message: 'ok' };
    }
  }

  async verifyUsername(body) {
    const { username } = body;
    const isExistUsername = await this.usersRepository.existsByUsername(
      username,
    );
    if (isExistUsername) {
      throw new HttpException('존재하는 닉네임입니다.', 400);
    } else {
      return { message: 'ok' };
    }
  }

  async uploadImg(req, files: Express.Multer.File[]) {
    const { user } = req;
    console.log(`user: ${user}`);
    const fileName = `users/${files[0].filename}`;
    console.log(`fileName: ${fileName}`);
    const newUser = await this.usersRepository.findByIdAndUpdateImg(
      user.id,
      fileName,
    );
    console.log(newUser);
    return newUser;
  }

  async sendEmail(body) {
    const { email } = body;
    const number: number = crypto.randomBytes(8).readUInt32LE(0);

    await this.mailerService.sendMail({
      to: email, // list of receivers
      from: process.env.EMAIL_ID, // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      html: `6자리 인증 코드 :  <b> ${number}</b>`, // HTML body content
    });
  }

  sendPhoneMessage(body) {
    const randomNumber = Math.floor(Math.random() * 1000000) + 1;
    const { phone } = body;

    this.twilio.messages.create({
      body: `SMS 인증 테스트 인증번호 [${randomNumber}]를 입력해주세요`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
    return randomNumber;
  }

  async usersPayment(req, body) {
    const { id } = req.user;
    const { cost } = body;

    const userinfo = await this.usersRepository.usersPayment(id, cost);

    return userinfo;
  }
}
