import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';
import { schema } from '@teslapp/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Configuration', schema: schema.ConfigurationSchema }
    ])
  ],
  controllers: [ConfigurationController],
  providers: [ConfigurationService],
  exports: [ConfigurationService]
})
export class ConfigurationModule {}
