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

  async updateTeslaAccount(account: ITeslaAccount) {
    this.api.post('/tesla-accountxxxxxx', account);
  }

//: Promise<IUser>
  async update(user: IUser) {

  }

}
