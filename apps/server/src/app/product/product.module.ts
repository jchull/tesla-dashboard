import { forwardRef, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SyncPreferencesSchema, VehicleSchema } from '@tesla-dashboard/schemas';

import { TeslaAccountModule } from '../tesla-account/tesla-account.module';
import { DataSyncModule } from '../data-sync/data-sync.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vehicle', schema: VehicleSchema }]),
    MongooseModule.forFeature([{ name: 'SyncPreferences', schema: SyncPreferencesSchema }]),
    forwardRef(() => TeslaAccountModule),
    forwardRef(() => DataSyncModule),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
