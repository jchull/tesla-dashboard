import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../model';
import { JwtPayload } from './jwt.payload';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(username: string, password: string): Promise<boolean> {
    const user = await this.accountService.get(username);
    return user?.pwdHash ? bcrypt.compareSync(password, user.pwdHash) : false;
  }

  async decode(token: string): Promise<any> {
    return this.jwtService.decode(token);
  }

  async login(user: User) {
    const payload: JwtPayload = {
      username: user.username,
      role: user.role,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
