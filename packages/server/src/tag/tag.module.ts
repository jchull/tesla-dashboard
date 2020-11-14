import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { MongooseModule } from '@nestjs/mongoose';
import { schema } from '@teslapp/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'VehicleSession', schema: schema.VehicleSessionSchema }
    ]),
  ],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService]
})
export class TagModule {}
