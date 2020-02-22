import { SyncPreferences, TeslaAccount, User } from '@teslapp/common';
import { AxiosInstance } from 'axios';

export class UserService {
  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async createUser(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    return await this.api.put('/account', { username, email, password });
  }

  async getTeslaAccounts(
    username: string
  ): Promise<[TeslaAccount] | undefined> {
    const data = await this.api.get(`/tesla-account`);
    if (data) {
      return data.data;
    }
  }

  async updateTeslaAccount(account: TeslaAccount): Promise<TeslaAccount> {
    return this.api.post(`/tesla-account/${account._id}`, account);
  }

  async linkTeslaAccount(account: TeslaAccount): Promise<TeslaAccount> {
    return this.api.put(`/tesla-account`, account);
  }

  async updateTeslaToken(
    account: TeslaAccount,
    password: string
  ): Promise<TeslaAccount | void> {
    return this.api.post(`/tesla-account/${account._id}/token`, { password });
  }

  //: Promise<IUser>
  //   async updateUser(user: IUser) {
  //
  //   }

  async updateProductSyncPreferences(
    vin: string,
    prefs: SyncPreferences
  ): Promise<SyncPreferences> {
    return this.api.put(`/vehicle/${vin}/sync`, prefs);
  }
}
