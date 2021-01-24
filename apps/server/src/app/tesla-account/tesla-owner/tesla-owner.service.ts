import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { TeslaAccountService } from '../tesla-account.service';
import { Configuration, TeslaAccount, Vehicle } from '@tesla-dashboard/types';
import { ConfigurationService } from '../../configuration/configuration.service';
import {
  fetchNearbyChargers,
  fetchToken,
  fetchVehicle,
  fetchVehicleData,
  fetchVehicles,
} from './tesla-owner.connector';
import { VehicleData } from '@tesla-dashboard/tesla-types';

@Injectable()
export class TeslaOwnerService {
  private config: Configuration;

  constructor(
    private readonly configurationService: ConfigurationService,
    @Inject(forwardRef(() => TeslaAccountService))
    private readonly teslaAccountService: TeslaAccountService
  ) {}

  async checkToken(teslaAccount: TeslaAccount): Promise<TeslaAccount> {
    if (!this.config) {
      this.config = await this.configurationService.getConfiguration();
    }
    if (teslaAccount.access_token && teslaAccount.token_expires_in && teslaAccount.token_created_at) {
      // token_expires_in is in seconds, refresh if it expires in the next 24 hours
      if (Date.now() - 86400000 < teslaAccount.token_created_at.valueOf() + 1000 * teslaAccount.token_expires_in) {
        return Promise.resolve(teslaAccount);
      } else {
        return this.updateToken(teslaAccount, 'refresh_token');
      }
    } else {
      return this.updateToken(teslaAccount, 'password');
    }
  }

  async updateToken(teslaAccount: TeslaAccount, grant_type: string = 'password', password?: string) {
    if (!this.config) {
      this.config = await this.configurationService.getConfiguration();
    }
    const response = await fetchToken(this.config, teslaAccount, grant_type, password);
    console.log('saving updated token');
    const updatedAccount = await this.teslaAccountService.updateAccount(response);
    return this.teslaAccountService.sanitizeAccount(updatedAccount);
  }

  async getVehicles(teslaAccount: TeslaAccount): Promise<Vehicle[]> {
    return (await this.checkToken(teslaAccount)) ? fetchVehicles(this.config, teslaAccount) : [];
  }

  async getVehicleData(teslaAccount: TeslaAccount, id_s: string): Promise<VehicleData | undefined> {
    return (await this.checkToken(teslaAccount)) && fetchVehicleData(this.config, teslaAccount, id_s);
  }

  async getNearbyChargers(teslaAccount: TeslaAccount, id_s: string) {
    return (await this.checkToken(teslaAccount)) && fetchNearbyChargers(this.config, teslaAccount, id_s);
  }

  async getVehicle(teslaAccount: TeslaAccount, id_s: string) {
    return (await this.checkToken(teslaAccount)) && fetchVehicle(this.config, teslaAccount, id_s);
  }
}
