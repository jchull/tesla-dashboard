import { types } from '@teslapp/common';
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
  ): Promise<types.User> {
    return await this.api.put('/account', { username, email, password });
  }

  async getTeslaAccounts(
    username: string
  ): Promise<[types.TeslaAccount] | undefined> {
    const data = await this.api.get(`/tesla-account`);
    if (data) {
      return data.data;
    }
  }

  async updateTeslaAccount(account: types.TeslaAccount): Promise<types.TeslaAccount> {
    return this.api.post(`/tesla-account/${account._id}`, account);
  }

  async linkTeslaAccount(account: types.TeslaAccount): Promise<types.TeslaAccount> {
    return this.api.put(`/tesla-account`, account);
  }

  async updateTeslaToken(
    account: types.TeslaAccount,
    password: string
  ): Promise<types.TeslaAccount | void> {
    return this.api.post(`/tesla-account/${account._id}/token`, { password });
  }

  //: Promise<IUser>
  //   async updateUser(user: IUser) {
  //
  //   }

  async updateProductSyncPreferences(
    vin: string,
    prefs: types.SyncPreferences
  ): Promise<types.SyncPreferences> {
    return this.api.put(`/vehicle/${vin}/sync`, prefs);
  }
}
