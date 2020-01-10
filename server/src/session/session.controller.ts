import {Controller, Get, Param, Request, UseGuards} from '@nestjs/common';
import {SessionService} from './session.service';
import {AuthGuard} from '@nestjs/passport';

@Controller('api/session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getSessionDetails(@Request() req, @Param('id') id) {
    return this.sessionService.getSessionDetails(req.user.username, id);
  }

}
