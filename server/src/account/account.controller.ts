import {Controller, Get, HttpException, Post, Put, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AccountService} from './account.service';

@Controller('account')
export class AccountController {

  constructor(private readonly accountService: AccountService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getMyAccount(@Request() req) {
    return this.accountService.sanitizeUser(
        await this.accountService.get(req.user.username)
    );
  }

  // @UseGuards(AuthGuard('local'))
  @Put()
  async signup(@Request() req) {
    const {username, password, email} = req.body;
    if (!username || !password || !email) {
      throw new HttpException('Missing required field value', 500);
    }
    const newUser = {username, password, email};
    const errorMessage = await this.accountService.validateNewAccount(newUser);
    if (errorMessage) {
      throw new HttpException(errorMessage, 500);
    }
    return this.accountService.sanitizeUser(
        await this.accountService.create(newUser)
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async update(@Request() req) {
    const {username, password, email} = req.body;
    if (!username || !password || !email) {
      throw new HttpException('Missing required field value', 500);
    }
    const user = await this.accountService.get(username);
    if (user && user.username === req.user.username) {
      user.password = password;
      user.email = email;
      return this.accountService.sanitizeUser(
          await this.accountService.update(user)
      );
    } else {
      throw new HttpException('wrong user', 401);
    }
  }

}
