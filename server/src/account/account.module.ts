import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TeslaAccountSchema, UserSchema } from '../model';

const modelModules = [
  MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  MongooseModule.forFeature([{ name: 'TeslaAccount', schema: TeslaAccountSchema },]),
];

@Module({
  imports: [...modelModules],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [...modelModules],
})
export class AccountModule {
  constructor() {
  }
}