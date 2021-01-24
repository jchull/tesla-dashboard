import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { TeslaAccount } from '@tesla-dashboard/types'
import { TeslaAccountType } from '@tesla-dashboard/schemas'

import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { TeslaOwnerService } from './tesla-owner/tesla-owner.service'

@Injectable()
export class TeslaAccountService {
  constructor(
    @InjectModel('TeslaAccount')
    private readonly teslaAccountModel: Model<TeslaAccountType>,
    @Inject(forwardRef(() => TeslaOwnerService))
    private readonly teslaOwnerService: TeslaOwnerService
  ) {}

  async createAccount(teslaAccount: TeslaAccount) {
    return this.teslaAccountModel.create(teslaAccount)
  }

  async updateAccount(teslaAccount: TeslaAccount) {
    return this.teslaAccountModel.updateOne(
      { _id: teslaAccount._id },
      teslaAccount
    )
  }

  sanitizeAccount(account: TeslaAccountType): TeslaAccount {
    const { _id, email, token_created_at, token_expires_in, username } = account
    return {
      _id,
      email,
      refresh_token: 'saved',
      access_token: 'saved',
      token_created_at,
      token_expires_in,
      username,
    }
  }

  async getAccounts(username: string): Promise<TeslaAccount[]> {
    return this.teslaAccountModel.find({ username })
  }

  async validate(id: string): Promise<boolean> {
    const teslaAccount = await this.getById(id)
    const resultTeslaAccount = await this.teslaOwnerService.checkToken(
      teslaAccount
    )
    return !!resultTeslaAccount
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
