import {ITeslaAccount, IUser} from 'tesla-dashboard-api';
import axios, {AxiosInstance} from 'axios';


export class UserService {
  private readonly api: AxiosInstance;


  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async create(username: string, email: string, password: string) {
    const response = await this.api.post('/signup', {username, email, password});
    if (response) {
      console.log(response);
    }

  }

  async getTeslaAccounts(username: string):Promise<[ITeslaAccount] | undefined> {
    const response = await this.api.get(`/user/${username}/tesla-account`);
    if(response){
      return response.data;
    }
  }

  async updateTeslaAccount(account: ITeslaAccount) {
    this.api.post('/tesla-accountxxxxxx', account);
  }

//: Promise<IUser>
  async update(user: IUser) {

  }

}
