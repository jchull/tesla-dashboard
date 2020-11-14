import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { schema, types} from '@teslapp/common';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<schema.UserType>
  ) {}

  sanitizeUser(user: types.User): types.User {
    const { username, email, role } = user;
    return { sub: user.sub, username, email, role };
  }

  async get(username: string): Promise<schema.UserType | undefined> {
    return this.userModel.findOne({ username });
  }

  async validateNewAccount(user: types.User): Promise<string | undefined> {
    const exists = await this.get(user.username);
    if (exists) {
      return 'Username taken';
    }
  }

  async create(user: types.User): Promise<schema.UserType> {
    if (!bcrypt) {
      throw Error('Cannot run bcrypt in worker!');
    }

    const saltRounds = 10;
    const hash = await bcrypt.hashSync(user.password, saltRounds);
    return this.userModel.create({
      username: user.username,
      email: user.email,
      pwdHash: hash,
      role: types.UserRoles.Standard
    });
  }

  async update(user: types.User): Promise<schema.UserType> {
    return this.userModel.updateOne({ username: user.username }, user);
  }

  async delete(username: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ username });
    return !!result;
  }

  async getPreferences(username: string) {
    const prefs = username;
    //await UserPreferences.findOne({username});
  }
}
