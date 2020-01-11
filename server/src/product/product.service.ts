import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChargeSessionType, DriveSessionType, VehicleType } from '../model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Vehicle') private readonly productModel: Model<VehicleType>,
    @InjectModel('DriveSession')
    private readonly driveSessionModel: Model<DriveSessionType>,
    @InjectModel('ChargeSession')
    private readonly chargeSessionModel: Model<ChargeSessionType>,
  ) {}

  async create(product: VehicleType) {
    return this.productModel.create(product);
  }

  async update(product: VehicleType) {
    return this.productModel.updateOne({ id_s: product.id_s }, product);
  }

  async getMyProducts(username: string) {
    return this.productModel
      .find({ username })
      .populate(['sync_preferences'])
      .sort({ $natural: -1 });
  }

  async findRecentSessions(username: string, productId: string, limit: number) {
    const vehicle = await this.productModel.findOne({ _id: productId });
    const driveSessions = await this.driveSessionModel
      .find({ vehicle })
      .sort({ $natural: -1 })
      .limit(limit)
      .populate(['first', 'last', 'vehicle']);
    const chargeSessions = await this.chargeSessionModel
      .find({ vehicle })
      .sort({ $natural: -1 })
      .limit(limit)
      .populate(['first', 'last', 'vehicle']);
    const sessions = [...driveSessions, ...chargeSessions]
      .sort(
        (a: { start_date: number }, b: { start_date: number }) =>
          b.start_date - a.start_date,
      ) // reverse sort
      .slice(0, limit);
    if (sessions.length) {
      return sessions;
    }
  }
}
