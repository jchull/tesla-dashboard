import {Request, Controller, Post, UseGuards} from '@nestjs/common';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from '@nestjs/passport';

@Controller('/api')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() body) {
    return this.authService.login(body.username, body.password);
  }
}
