import { forwardRef, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  schema
} from '@teslapp/common';
import { TeslaAccountModule } from '../tesla-account/tesla-account.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vehicle', schema: schema.VehicleSchema }]),
    MongooseModule.forFeature([
      { name: 'SyncPreferences', schema: schema.SyncPreferencesSchema }
    ]),
    MongooseModule.forFeature([
      { name: 'VehicleSession', schema: schema.VehicleSessionSchema }
    ]),
    MongooseModule.forFeature([
      { name: 'VehicleState', schema: schema.VehicleStateSchema }
    ]),
    forwardRef(() => TeslaAccountModule)
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
