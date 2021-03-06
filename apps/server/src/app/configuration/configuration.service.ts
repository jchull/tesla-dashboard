import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigurationSchema, ConfigurationType, DEFAULT_CONFIG } from '@tesla-dashboard/schemas';

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectModel('Configuration')
    private readonly configurationModel: Model<ConfigurationType>
  ) {}

  async getConfiguration() {
    const config = await this.configurationModel.findOne();
    if (!config) {
      console.log('No app configuration found, installing default...');
      return this.configurationModel.create(DEFAULT_CONFIG);
    }
    return config;
  }
}
