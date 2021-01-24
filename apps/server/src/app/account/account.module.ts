import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AccountController } from './account.controller'
import { AccountService } from './account.service'
import { UserPreferencesSchema, UserSchema } from '@tesla-dashboard/schemas'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'UserPreferences', schema: UserPreferencesSchema }]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
