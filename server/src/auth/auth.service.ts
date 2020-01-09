import {Injectable} from '@nestjs/common';
import {AccountService} from '../account/account.service';
import {JwtService} from '@nestjs/jwt';
import {JwtPayload} from './jwt.payload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
      private readonly accountService: AccountService,
      private readonly jwtService: JwtService
  ) {
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.accountService.get(username);
    return user?.pwdHash && bcrypt.compareSync(password, user.pwdHash) && user;
  }

  async decode(token: string): Promise<any> {
    return this.jwtService.decode(token);
  }

  async login(username: string, password: string) {
    const user = await this.validate(username, password);
    if (user) {
      const payload: JwtPayload = {
        username: user.username,
        role: user.role,
        sub: user._id.toString()
      };
      // return {
      //   access_token: this.jwtService.sign(payload)
      // };
      return this.accountService.sanitizeUser(user);
    }
  }
}
