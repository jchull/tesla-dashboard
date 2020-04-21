import { Module} from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ChargeSessionSchema,
  DriveSessionSchema
} from '@teslapp/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ChargeSession', schema: ChargeSessionSchema }
    ]),
    MongooseModule.forFeature([
      { name: 'DriveSession', schema: DriveSessionSchema }
    ])
  ],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService]
})
export class TagModule {}
