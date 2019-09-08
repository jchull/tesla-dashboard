import {IUser} from 'tesla-dashboard-api';
import axios from 'axios';
import {ConfigurationService} from '@service/ConfigurationService';

const configurationService = new ConfigurationService();

export class UserService {
  private readonly endpoint: string;

  constructor() {
    this.endpoint = configurationService.get('REACT_APP_API_ROOT') + '/signup';
  }

  async create(username: string, email: string, password: string) {
    // res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    const response = await axios.post(this.endpoint, {username, email, password});
    if (response) {
      console.log(response);
    }

  }

//: Promise<IUser>
  async update(user: IUser) {

  }

}
