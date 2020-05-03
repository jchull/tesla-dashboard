import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

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
    return this.tagService.getTags(req.user.username, productId);
  }
}
