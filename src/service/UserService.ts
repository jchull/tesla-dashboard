import {ITeslaAccount, IUser} from 'tesla-dashboard-api';
import {AxiosInstance} from 'axios';


export class UserService {
  private readonly api: AxiosInstance;


  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async create(username: string, email: string, password: string): Promise<IUser> {
    return await this.api.post('/signup', {username, email, password});
  }

  async getTeslaAccounts(username: string): Promise<[ITeslaAccount] | undefined> {
    const response = await this.api.get(`/user/${username}/tesla-account`);
    if (response) {
      return response.data;
    }
  }

  async updateTeslaAccount(account: ITeslaAccount): Promise<ITeslaAccount> {
    return this.api.put(`/user/${account.username}/tesla-account/${account._id}`, account);
  }

//: Promise<IUser>
  async update(user: IUser) {

  }

}
