import { forwardRef, Module } from '@nestjs/common'
import { SessionController } from './session.controller'
import { SessionService } from './session.service'
import { MongooseModule } from '@nestjs/mongoose'
import { schema } from '@teslapp/common'
import { ProductModule } from '../product/product.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vehicle', schema: schema.VehicleSchema }]),
    MongooseModule.forFeature([
      { name: 'VehicleActivity', schema: schema.VehicleActivitySchema }
    ]),
    MongooseModule.forFeature([
      { name: 'VehicleState', schema: schema.VehicleStateSchema }
    ]),
    forwardRef(() => ProductModule)
  ],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService]
})
export class SessionModule {
}
