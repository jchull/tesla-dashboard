import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { schema, types } from '@teslapp/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { TeslaOwnerService } from './tesla-owner/tesla-owner.service'
import { ProductService } from '../product/product.service'

@Injectable()
export class TeslaAccountService {
  constructor(
    @InjectModel('TeslaAccount')
    private readonly teslaAccountModel: Model<schema.TeslaAccountType>,
    @Inject(forwardRef(() => TeslaOwnerService))
    private readonly teslaOwnerService: TeslaOwnerService,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService
  ) {
  }

  async create(teslaAccount: types.TeslaAccount) {
    return this.teslaAccountModel.create(teslaAccount)
  }

  async update(teslaAccount: types.TeslaAccount) {
    return this.teslaAccountModel.updateOne(
      { username: teslaAccount.username },
      teslaAccount
    )
  }

  sanitizeTeslaAccount(account: schema.TeslaAccountType): types.TeslaAccount {
    const {
      _id,
      email,
      token_created_at,
      token_expires_in,
      username
    } = account
    return {
      _id,
      email,
      refresh_token: 'saved',
      access_token: 'saved',
      token_created_at,
      token_expires_in,
      username
    }
  }

  async getTeslaAccounts(
    username: string,
    vehicleId?: string
  ): Promise<types.TeslaAccount[] | undefined> {
    const accountList = await this.teslaAccountModel.find({ username })
    if (accountList?.length) {
      if (vehicleId) {
        // const vehicle = await vs.get(vehicleId);
        // if (vehicle?.sync_preferences) {
        //   const {accountId} = vehicle.sync_preferences;
        //   return accountList.filter(account => accountId === account._id)
        //                     .map((account: TeslaAccountType) => this.sanitizeTeslaAccount(account));
        //
        // }
      }
      return accountList.map((account: schema.TeslaAccountType) =>
        this.sanitizeTeslaAccount(account)
      )
    }
  }

  async validateTeslaConnection(id: string) {
    const teslaAccount = await this.getById(id)
    const resultTeslaAccount = await this.teslaOwnerService.checkToken(
      teslaAccount
    )
    if (resultTeslaAccount) {
      const vehicles = await this.teslaOwnerService.getVehicles(
        resultTeslaAccount
      )
      if (vehicles) {
        return this.productService.upsertMany(vehicles)
      }
    }
  }

  async requestTeslaToken(id: string, password: string) {
    const teslaAccount = await this.getById(id)
    return this.teslaOwnerService.updateToken(
      teslaAccount,
      'password',
      password
    )
  }

  private async getById(id: string) {
    return this.teslaAccountModel.findOne({ _id: id })
  }
}
