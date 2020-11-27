import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AccountController } from './account.controller'
import { AccountService } from './account.service'
import { schema } from '@teslapp/common'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: schema.UserSchema }]),
    MongooseModule.forFeature([
      { name: 'UserPreferences', schema: schema.UserPreferencesSchema }
    ]),

  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService]
})
export class AccountModule {
}
