import { InjectModel } from '@nestjs/mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserRequestDto } from './dto/users.request.dto';
import { User } from './users.schema';

@Injectable()
export class UsersRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async existsByEmail(email: string) {
    const result = await this.userModel.exists({ email });
    return result;
  }

  async existsByUsername(username: string) {
    const result = await this.userModel.exists({ username });
    return result;
  }

  async findUserByIdWithoutPassword(userId: string): Promise<User | null> {
    const user = await this.userModel.findById(userId).select('-password'); // select('email username')
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async create(user: UserRequestDto) {
    // eslint-disable-next-line no-return-await
    return await this.userModel.create(user);
  }

  async delete(user: UserRequestDto) {
    // eslint-disable-next-line no-return-await
    return await this.userModel.deleteOne(user);
  }

  async changeStacks(id, newStacks) {
    // eslint-disable-next-line no-return-await
    return await this.userModel.findByIdAndUpdate(id, {
      stacks: newStacks,
    });
  }

  async findUserAndUpdate(user, body) {
    const { id } = user;
    const { username: newUsername, password: newPassword } = body;
    const isExistUsername = await this.userModel.findOne({
      username: newUsername,
    });

    if (isExistUsername) {
      throw new HttpException('이미 존재하는 닉네임입니다.', 400);
    }

    if (!newPassword) {
      await this.userModel.findByIdAndUpdate(id, {
        username: newUsername,
      });
    }

    if (newPassword) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await this.userModel.findByIdAndUpdate(id, {
        username: newUsername,
        password: hashedPassword,
      });
    }

    const modifiedUserInfo = await this.userModel.findById(id);
    return modifiedUserInfo;
  }
}
