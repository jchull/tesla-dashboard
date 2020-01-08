import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport';
import {AuthService} from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
            usernameField: 'username',
            passwordField: 'password'
          });
  }

  async validate(username: string, password: string): Promise<boolean | undefined> {
    const loggedIn = await this.authService.validate(username, password);
    if (!loggedIn) {
      throw new UnauthorizedException();
    }
    return loggedIn;
  }

  async authenticate(req, options?: any) {
    return this.validate(req.body.username, req.body.password);
  }

}