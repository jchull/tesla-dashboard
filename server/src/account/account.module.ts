import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { UserPreferencesSchema, UserSchema} from '../model';

const modelModules = [
  MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  MongooseModule.forFeature([{ name: 'UserPreferences', schema: UserPreferencesSchema }])
];

@Module({
  imports: [...modelModules],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [...modelModules, AccountService],
})
export class AccountModule {
  constructor() {}
}
