import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigurationType, DEFAULT_CONFIG } from '@teslapp/common';

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
      const newConfig = await this.configurationModel.create(DEFAULT_CONFIG);
      return newConfig;
    }
    return config;
  }
}
