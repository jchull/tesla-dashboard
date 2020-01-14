import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ChargeSessionSchema,
  ChargeStateSchema,
  DriveSessionSchema,
  DriveStateSchema,
  SyncPreferencesSchema,
  VehicleSchema
} from '../model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vehicle', schema: VehicleSchema }]),
    MongooseModule.forFeature([
      { name: 'SyncPreferences', schema: SyncPreferencesSchema }
    ]),
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
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
