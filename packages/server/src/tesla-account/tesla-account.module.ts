import { forwardRef, Module } from '@nestjs/common'
import { TeslaAccountService } from './tesla-account.service'
import { TeslaAccountController } from './tesla-account.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { schema } from '@teslapp/common'
import { TeslaOwnerService } from './tesla-owner/tesla-owner.service'
import { ConfigurationModule } from '../configuration/configuration.module'
import { ProductModule } from '../product/product.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TeslaAccount', schema: schema.TeslaAccountSchema }
    ]),
    ConfigurationModule,
    forwardRef(() => ProductModule)
  ],
  providers: [TeslaAccountService, TeslaOwnerService],
  controllers: [TeslaAccountController],
  exports: [TeslaAccountService, TeslaOwnerService]
})
export class TeslaAccountModule {
}
