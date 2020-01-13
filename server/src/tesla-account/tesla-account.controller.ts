import {Controller, Get, Query, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {TeslaAccountService} from './tesla-account.service';

@Controller('tesla-account')
export class TeslaAccountController {

  constructor(private readonly teslaAccountService: TeslaAccountService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getMyTeslaAccounts(@Request() req, @Query('vid') vid?: string) {
    return this.teslaAccountService.getTeslaAccounts(req.user.username, vid);
  }
}
