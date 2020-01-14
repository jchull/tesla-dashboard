import { Module } from '@nestjs/common';
import { TeslaAccountService } from './tesla-account.service';
import { TeslaAccountController } from './tesla-account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeslaAccountSchema } from '../model';

const modelModules = [
  MongooseModule.forFeature([
    { name: 'TeslaAccount', schema: TeslaAccountSchema }
  ])
];

@Module({
  imports: [...modelModules],
  providers: [TeslaAccountService],
  controllers: [TeslaAccountController],
  exports: [...modelModules]
})
export class TeslaAccountModule {}
