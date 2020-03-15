import {forwardRef, Module} from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ChargeSessionSchema,
  ChargeStateSchema,
  DriveSessionSchema,
  DriveStateSchema,
  VehicleSchema
} from '@teslapp/common';
import {ProductModule} from '../product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vehicle', schema: VehicleSchema }]),
    MongooseModule.forFeature([
      { name: 'ChargeSession', schema: ChargeSessionSchema }
    ]),
    MongooseModule.forFeature([
      { name: 'ChargeState', schema: ChargeStateSchema }
    ]),
    MongooseModule.forFeature([
      { name: 'DriveSession', schema: DriveSessionSchema }
    ]),
    MongooseModule.forFeature([
      { name: 'DriveState', schema: DriveStateSchema }
    ]),
    forwardRef(() => ProductModule)
  ],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService]
})
export class SessionModule {}
