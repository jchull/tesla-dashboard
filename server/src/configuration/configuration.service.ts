import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ConfigurationType} from '../model';

@Injectable()
export class ConfigurationService {
  constructor(@InjectModel('Configuration') private readonly configurationModel: Model<ConfigurationType>) {
  }

  getConfiguration(){
    return this.configurationModel.findOne();
  }

}
