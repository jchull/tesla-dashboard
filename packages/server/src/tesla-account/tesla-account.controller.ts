import {
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TeslaAccountService } from './tesla-account.service';

@Controller('tesla-account')
export class TeslaAccountController {
  constructor(private readonly teslaAccountService: TeslaAccountService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getMyTeslaAccounts(@Request() req, @Query('vid') vid?: string) {
    return this.teslaAccountService.getTeslaAccounts(req.user.username, vid);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async linkTeslaAccount(@Request() req) {
    if (req.user.username !== req.body.username) {
      throw new HttpException('data validation error', 401);
    }
    return this.teslaAccountService.sanitizeTeslaAccount(
      await this.teslaAccountService.create(req.body)
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  async updateTeslaAccount(@Request() req, @Param('id') id) {
    if (id !== req.body._id || req.user.username !== req.body.username) {
      throw new HttpException('data validation error', 401);
    }
    return this.teslaAccountService.sanitizeTeslaAccount(
      await this.teslaAccountService.update(req.body)
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/validate')
  async validateAccount(@Request() req, @Param('id') id: string) {
    return this.teslaAccountService.validateTeslaConnection(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/token')
  async requestTeslaToken(@Request() req, @Param('id') id: string) {
    return this.teslaAccountService.requestTeslaToken(id, req.body.password);
  }
}
