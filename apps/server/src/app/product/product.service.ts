import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Vehicle } from '@tesla-dashboard/types'

import { SyncPreferencesType, VehicleType } from '@tesla-dashboard/schemas'

import { TeslaSyncService } from '../data-sync/tesla-sync/tesla-sync.service'

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Vehicle')
    private readonly productModel: Model<VehicleType>,
    @InjectModel('SyncPreferences')
    private readonly syncPreferencesModel: Model<SyncPreferencesType>,
    @Inject(forwardRef(() => TeslaSyncService))
    private readonly teslaSyncService: TeslaSyncService
  ) {}

  async create(product: VehicleType) {
    return this.productModel.create(product)
  }

  async update(product: VehicleType) {
    return this.productModel.updateOne({ id_s: product.id_s }, product)
  }

  async upsert(products: Vehicle[]) {
    return products.map(async (product) => {
      const existing = await this.productModel.findOne({ vin: product.vin })
      return existing ? this.productModel.updateOne({ _id: existing._id }, product) : this.productModel.create(product)
    })
  }

  async getMyProducts(username: string, syncUpstream: boolean = false) {
    if (syncUpstream != false) {
      await this.teslaSyncService.syncVehiclesByAccount(username)
    }
    return this.productModel.find({ username }).populate(['sync_preferences']).sort({ $natural: -1 })
  }

  async findByVin(vin: string) {
    return this.productModel.findOne({ vin })
  }

  async findById(id: string) {
    return this.productModel.findOne({ _id: id })
  }

  async syncVehicleState(id: string) {
    return this.teslaSyncService.syncVehicle(id)
  }
}
