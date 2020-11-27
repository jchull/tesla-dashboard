import { forwardRef, Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { MongooseModule } from '@nestjs/mongoose'
import { schema } from '@teslapp/common'
import { TeslaAccountModule } from '../tesla-account/tesla-account.module'
import { DataSyncModule } from '../data-sync/data-sync.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vehicle', schema: schema.VehicleSchema }]),
    MongooseModule.forFeature([
      { name: 'SyncPreferences', schema: schema.SyncPreferencesSchema }
    ]),
    MongooseModule.forFeature([
      { name: 'VehicleActivity', schema: schema.VehicleActivitySchema }
    ]),
    MongooseModule.forFeature([
      { name: 'VehicleState', schema: schema.VehicleStateSchema }
    ]),
    forwardRef(() => TeslaAccountModule),
    forwardRef(() => DataSyncModule)
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {
}
