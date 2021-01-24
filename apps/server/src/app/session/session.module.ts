import { forwardRef, Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleActivitySchema, VehicleStateSchema } from '@tesla-dashboard/schemas';

import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'VehicleActivity', schema: VehicleActivitySchema }]),
    MongooseModule.forFeature([{ name: 'VehicleState', schema: VehicleStateSchema }]),
    forwardRef(() => ProductModule),
  ],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
