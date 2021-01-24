import { Controller, forwardRef, Get, Inject, Param, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SessionService } from '../session/session.service';

@Controller('tag')
export class TagController {
  constructor(
    @Inject(forwardRef(() => SessionService))
    private readonly sessionService: SessionService
  ) {}

  // @UseGuards(AuthGuard('jwt'))
  // @Post(':id/tag/:tag')
  // addSessionTag(@Request() req, @Param('id') id, @Param('tag') tag) {
  //   return this.tagService.addTag(req.user.username, id, tag);
  // }
  //
  // @UseGuards(AuthGuard('jwt'))
  // @Delete(':id/tag/:tag')
  // removeSessionTag(@Request() req, @Param('id') id, @Param('tag') tag) {
  //   return this.tagService.removeTag(req.user.username, id, tag);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get(':productId')
  getSessionTags(@Request() req, @Param('productId') productId) {
    return this.sessionService.findTags(req.user.username, productId);
  }
}
