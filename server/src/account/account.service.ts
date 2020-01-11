import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import {
  UserType,
  User,
  TeslaAccount,
  TeslaAccountType,
  UserRoles,
} from '../model';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserType>,
    @InjectModel('TeslaAccount')
    private readonly teslaAccountModel: Model<TeslaAccountType>,
  ) {}

  sanitizeUser(user: User): User {
    const { username, email, role } = user;
    return { sub: user._id.toString(), username, email, role };
  }

  sanitizeTeslaAccount(account: TeslaAccount): TeslaAccount {
    const {
      _id,
      email,
      refresh_token,
      access_token,
      token_created_at,
      token_expires_in,
      username,
    } = account;
    return {
      _id,
      email,
      refresh_token,
      access_token,
      token_created_at,
      token_expires_in,
      username,
    };
  }

  async get(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }

  async create(user: User) {
    if (!bcrypt) {
      throw Error('Cannot run bcrypt in worker!');
    }
    const saltRounds = 10;
    const hash = await bcrypt.hashSync(user.password, saltRounds);
    return await this.userModel.create({
      username: user.username,
      email: user.email,
      pwdHash: hash,
      role: UserRoles.Standard,
    });
  }

  async update(user: User): Promise<User> {
    return this.userModel.updateOne({ username: user.username }, user);
  }

  async delete(username: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ username });
    return !!result;
  }

  async getPreferences(username: string) {
    // const prefs = await UserPreferences.findOne({username});
  }

  async getTeslaAccounts(
    username: string,
    vehicleId?: string,
  ): Promise<TeslaAccount[] | undefined> {
    const accountList = await this.teslaAccountModel.find({ username });
    if (accountList?.length) {
      if (vehicleId) {
        // const vehicle = await vs.get(vehicleId);
        // if (vehicle?.sync_preferences) {
        //   const {accountId} = vehicle.sync_preferences;
        //   return accountList.filter(account => accountId === account._id)
        //                     .map((account: TeslaAccountType) => this.sanitizeTeslaAccount(account));
        //
        // }
      }
      return accountList.map((account: TeslaAccountType) =>
        this.sanitizeTeslaAccount(account),
      );
    }
  }

  async updateTeslaAccount(account: TeslaAccount) {
    const { _id } = account;
    let updatedAccount;
    if (_id) {
      const result = await this.teslaAccountModel.updateOne({ _id }, account, {
        password: 'delete',
      });
      if (result?.ok === 1) {
        updatedAccount = await this.teslaAccountModel.findOne({ _id });
      }
    } else {
      updatedAccount = await this.teslaAccountModel.create(account);
    }
    return updatedAccount && this.sanitizeTeslaAccount(updatedAccount);
  }
}
