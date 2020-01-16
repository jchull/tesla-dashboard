import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';
import { ConfigurationSchema } from '../model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Configuration', schema: ConfigurationSchema }
    ])
  ],
  controllers: [ConfigurationController],
  providers: [ConfigurationService],
  exports: [ConfigurationService]
})
export class ConfigurationModule {}
