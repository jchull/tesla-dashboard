import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ChargeSessionType,
  ChargeStateType,
  DriveSessionType,
  DriveStateType,
  VehicleType
} from '@teslapp/common';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel('Vehicle') private readonly productModel: Model<VehicleType>,
    @InjectModel('DriveSession')
    private readonly driveSessionModel: Model<DriveSessionType>,
    @InjectModel('ChargeSession')
    private readonly chargeSessionModel: Model<ChargeSessionType>,
    @InjectModel('DriveState')
    private readonly driveStateModel: Model<DriveStateType>,
    @InjectModel('ChargeState')
    private readonly chargeStateModel: Model<ChargeStateType>
  ) {}

  async getSessionDetails(username: string, id: string) {
    // TODO: limit access by username
    const driveStates = await this.driveStateModel
      .find({ driveSession: id })
      .sort({ timestamp: 1 });
    if (driveStates.length) {
      return driveStates;
    } else {
      const chargeStates = await this.chargeStateModel
        .find({ chargeSession: id })
        .sort({ timestamp: 1 });
      if (chargeStates.length) {
        return chargeStates;
      }
    }
  }

  async deleteSession(username: string, id: string) {
    // TODO: limit access by username matching
    const deleteCount = await this.driveSessionModel.deleteOne({ _id: id });
    if (deleteCount.deletedCount) {
      const deleteItemCount = await this.driveStateModel.deleteMany({
        driveSession: id
      });
      if (deleteItemCount.deletedCount) {
        return (deleteCount.deletedCount || 0) + (deleteItemCount.deletedCount || 0);
      }
    } else {
      const deleteCount = await this.chargeSessionModel.deleteOne({ _id: id });
      if (deleteCount.deletedCount) {
        const deleteItemCount = await this.chargeStateModel.deleteMany({
          chargeSession: id
        });
        if (deleteItemCount.deletedCount) {
          return (deleteCount.deletedCount || 0) + (deleteItemCount.deletedCount || 0);
        }
      }
    }
  }

  async addTag(username: string, sessionId: string, tag: string) {
    const driveSession = await this.driveSessionModel.findOne({
      _id: sessionId
    });
    if (driveSession && !driveSession.tags.includes(tag)) {
      driveSession.tags.push(tag);
      const result = await this.driveSessionModel.updateOne(
        { _id: sessionId },
        driveSession
      );
      return result.tags;
    } else {
      const chargeSession = await this.chargeSessionModel.findOne({
        _id: sessionId
      });
      if (chargeSession && !chargeSession.tags.includes(tag)) {
        chargeSession.tags.push(tag);
        const result = await this.chargeSessionModel.updateOne(
          { _id: sessionId },
          chargeSession
        );
        return result.tags;
      }
    }
  }

  async removeTag(username: string, sessionId: string, tag: string) {
    const driveSession = await this.driveSessionModel.findOne({
      _id: sessionId
    });
    if (driveSession && driveSession.tags.includes(tag)) {
      driveSession.tags.splice(driveSession.tags.indexOf(tag), 1);
      const result = await this.driveSessionModel.updateOne(
        { _id: sessionId },
        driveSession
      );
      return result.tags;
    } else {
      const chargeSession = await this.chargeSessionModel.findOne({
        _id: sessionId
      });
      if (chargeSession && chargeSession.tags.includes(tag)) {
        chargeSession.tags.splice(chargeSession.tags.indexOf(tag), 1);
        const result = await this.chargeSessionModel.updateOne(
          { _id: sessionId },
          chargeSession
        );
        return result.tags;
      }
    }
  }

  async findRecentSessions(username: string, vin: any, limit: number) {
    const latestDriveSessions = await this.driveSessionModel
      .find({ vin })
      .sort({ $natural: -1 })
      .limit(limit);
    const latestChargeSessions = await this.chargeSessionModel
      .find({ vin })
      .sort({ $natural: -1 })
      .limit(limit);
    const sessions = [...latestDriveSessions, ...latestChargeSessions]
      .sort((a, b) => b.start_date - a.start_date) // reverse sort
      .slice(0, limit);
    return sessions;
  }

  async createNewSession() {
    // TODO
    const session = {};
  }
}