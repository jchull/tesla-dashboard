import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { VehicleType } from '../model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Vehicle') private readonly productModel: Model<VehicleType>,
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
}
