import {Injectable} from '@nestjs/common';
import {TeslaAccount, TeslaAccountType} from '../model';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable()
export class TeslaAccountService {
  constructor(
      @InjectModel('TeslaAccount')
      private readonly teslaAccountModel: Model<TeslaAccountType>
  ) {
  }

  async create(teslaAccount: TeslaAccount) {
    return this.teslaAccountModel.create(teslaAccount);
  }

  async update(teslaAccount: TeslaAccount) {
    return this.teslaAccountModel.updateOne({_id: teslaAccount._id}, teslaAccount);
  }

  sanitizeTeslaAccount(account: TeslaAccount): TeslaAccount {
    const {
      _id,
      email,
      refresh_token,
      access_token,
      token_created_at,
      token_expires_in,
      username
    } = account;
    return {
      _id,
      email,
      refresh_token,
      access_token,
      token_created_at,
      token_expires_in,
      username
    };
  }

  async getTeslaAccounts(
      username: string,
      vehicleId?: string
  ): Promise<TeslaAccount[] | undefined> {
    const accountList = await this.teslaAccountModel.find({username});
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
                                 this.sanitizeTeslaAccount(account)
      );
    }
  }


  async validateTeslaConnection(id: string) {
    return false;
  }

  async requestTeslaToken(id: string, password: string) {
    return undefined;
  }
}
