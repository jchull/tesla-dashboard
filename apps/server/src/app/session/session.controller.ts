import { Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { AuthGuard } from '@nestjs/passport';
import { decodeRequest, QueryResult } from '@tesla-dashboard/util';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async findSessions(@Request() req): Promise<QueryResult> {
    const findQuery = decodeRequest(req.body);
    return await this.sessionService.findActivities(req.user.username, findQuery);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getSessionDetails(@Request() req, @Param('id') id) {
    return this.sessionService.getSessionDetails(req.user.username, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteSession(@Request() req, @Param('id') id) {
    return this.sessionService.deleteSession(req.user.username, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/tag/:tag')
  addSessionTag(@Request() req, @Param('id') id, @Param('tag') tag) {
    return this.sessionService.addTag(req.user.username, id, tag);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/tag/:tag')
  removeSessionTag(@Request() req, @Param('id') id, @Param('tag') tag) {
    return this.sessionService.removeTag(req.user.username, id, tag);
  }
}
