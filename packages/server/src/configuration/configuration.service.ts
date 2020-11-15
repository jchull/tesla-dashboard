import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { schema } from '@teslapp/common'

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectModel('Configuration')
    private readonly configurationModel: Model<schema.ConfigurationType>
  ) {
  }

  async getConfiguration() {
    const config = await this.configurationModel.findOne()
    if (!config) {
      console.log('No app configuration found, installing default...')
      return this.configurationModel.create(schema.DEFAULT_CONFIG)
    }
    return config
  }
}
