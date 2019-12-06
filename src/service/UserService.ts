import {SyncPreferences, TeslaAccount, User} from 'tesla-dashboard-api';
import {AxiosInstance} from 'axios';


export class UserService {
  private readonly api: AxiosInstance;


  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async createUser(username: string, email: string, password: string): Promise<User> {
    return await this.api.post('/signup', {username, email, password});
  }

  async getTeslaAccounts(username: string): Promise<[TeslaAccount] | undefined> {
    const data = await this.api.get(`/user/${username}/tesla-account`);
    if (data) {
      return data.data;
    }
  }

  async updateTeslaAccount(account: TeslaAccount): Promise<TeslaAccount> {
    return this.api.put(`/user/${account.username}/tesla-account/${account._id}`, account);
  }

//: Promise<IUser>
//   async updateUser(user: IUser) {
//
//   }

  async updateProductSyncPreferences(vin: string, prefs: SyncPreferences): Promise<SyncPreferences> {
    return this.api.put(`/vehicle/${vin}/sync`, prefs);
  }

}
