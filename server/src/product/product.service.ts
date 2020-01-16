import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {ChargeSessionType, DriveSessionType, VehicleType} from '../model';
import {Vehicle} from '../model/types/tesla/Vehicle';
import {TeslaAccountService} from '../tesla-account/tesla-account.service';
import {TeslaOwnerService} from '../tesla-account/tesla-owner/tesla-owner.service';

@Injectable()
export class ProductService {
  constructor(
      @InjectModel('Vehicle') private readonly productModel: Model<VehicleType>,
      @InjectModel('DriveSession')
      private readonly driveSessionModel: Model<DriveSessionType>,
      @InjectModel('ChargeSession')
      private readonly chargeSessionModel: Model<ChargeSessionType>,
      @Inject(forwardRef(() => TeslaAccountService))
      private readonly teslaAccountService: TeslaAccountService,
      @Inject(forwardRef(() => TeslaOwnerService))
      private readonly teslaOwnerService: TeslaOwnerService
  ) {
  }

  async create(product: VehicleType) {
    return this.productModel.create(product);
  }

  async update(product: VehicleType) {
    return this.productModel.updateOne({id_s: product.id_s}, product);
  }

  async upsertMany(products: Vehicle[]) {
    return products.map(async (product) => {
      const existing = await this.productModel.findOne({vin: product.vin});
      if (!existing) {
        return this.productModel.create(product);
      } else {
        return this.productModel.updateOne({_id: existing._id}, product);
      }
    });
  }

  async getMyProducts(username: string, syncUpstream = false) {
    if (syncUpstream != false) {
      const teslaAccounts = await this.teslaAccountService.getTeslaAccounts(username);
      if (teslaAccounts) {
        await teslaAccounts.forEach(async (teslaAccount) => {
          const products = await this.teslaOwnerService.getVehicles(teslaAccount);
          await this.upsertMany(products.map((product) => ({...product, username})));
        });
        return this.productModel
                   .find({username})
                   .populate(['sync_preferences'])
                   .sort({$natural: -1});

      }
    } else {
    return this.productModel
               .find({username})
               .populate(['sync_preferences'])
               .sort({$natural: -1});
  }}


  async findByVin(vin: string) {
    return this.productModel.findOne({vin});
  }
}
