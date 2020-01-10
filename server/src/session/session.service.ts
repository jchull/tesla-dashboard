import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ChargeSessionType, ChargeStateType, DriveSessionType, DriveStateType, VehicleType} from '../model';

@Injectable()
export class SessionService {
  constructor(
      @InjectModel('Vehicle') private readonly productModel: Model<VehicleType>,
      @InjectModel('DriveSession') private readonly driveSessionModel: Model<DriveSessionType>,
      @InjectModel('ChargeSession') private readonly chargeSessionModel: Model<ChargeSessionType>,
      @InjectModel('DriveState') private readonly driveStateModel: Model<DriveStateType>,
      @InjectModel('ChargeState') private readonly chargeStateModel: Model<ChargeStateType>
  ) {
  }


  async getSessionDetails(username: string, id: string) {
    // TODO: limit access by username
    const driveStates = await this.driveStateModel.find({driveSession: id})
                                  .sort({timestamp: 1});
    if (driveStates.length) {
      return driveStates;
    } else {
      const chargeStates = await this.chargeStateModel.find({chargeSession: id})
                                     .sort({timestamp: 1});
      if (chargeStates.length) {
        return chargeStates;
      }
    }
  }
}
