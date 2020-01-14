import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';
import * as bcrypt from 'bcrypt';
import { User } from '../model';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService
  ) {}

  async validate(username: string, password: string): Promise<User | null> {
    const user = await this.accountService.get(username);
    return user?.pwdHash && bcrypt.compareSync(password, user.pwdHash)
      ? this.accountService.sanitizeUser(user)
      : null;
  }

  async decode(token: string): Promise<any> {
    return this.jwtService.decode(token);
  }

  async login(username: string, password: string) {
    const user = await this.validate(username, password);
    if (user) {
      const payload: JwtPayload = {
        username: user.username,
        email: user.email,
        role: user.role,
        sub: user._id?.toString()
      };
      const token = this.jwtService.sign(payload);
      console.log(`generated token: ${token} from ${JSON.stringify(payload)}`);
      return {
        access_token: token
      };
    }
  }

  logout() {
    // TODO: add revoked token
    return;
  }
}
