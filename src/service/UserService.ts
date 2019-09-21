import {ITeslaAccount, IUser} from 'tesla-dashboard-api';
import {AxiosInstance} from 'axios';


export class UserService {
  private readonly api: AxiosInstance;


  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async createUser(username: string, email: string, password: string): Promise<IUser> {
    return await this.api.post('/signup', {username, email, password});
  }

  async getTeslaAccounts(username: string): Promise<[ITeslaAccount] | undefined> {
    const data = await this.api.get(`/user/${username}/tesla-account`);
    if (data) {
      return data.data;
    }
  }

  async updateTeslaAccount(account: ITeslaAccount): Promise<ITeslaAccount> {
    return this.api.put(`/user/${account.username}/tesla-account/${account._id}`, account);
  }

//: Promise<IUser>
  async updateUser(user: IUser) {

  }

}
