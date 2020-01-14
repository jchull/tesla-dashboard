import {forwardRef, Inject, Injectable} from '@nestjs/common';
import axios from 'axios';

import {TeslaAccountService} from '../tesla-account.service';
import {Configuration, TeslaAccount, VehicleType} from '../../model';
import {VehicleData} from '../../model/types/tesla/VehicleData';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Vehicle} from '../../model/types/tesla/Vehicle';

@Injectable()
export class TeslaOwnerService {
  private config: Configuration;

  constructor(
      private readonly configurationService: ConfigurationService,
      @Inject(forwardRef(() => TeslaAccountService)) private readonly teslaAccountService: TeslaAccountService) {

  }


  async checkToken(teslaAccount: TeslaAccount): Promise<TeslaAccount> {
    if(!this.config){
      this.config = await this.configurationService.getConfiguration();
    }
    if (teslaAccount.access_token && teslaAccount.token_expires_in && teslaAccount.token_created_at) {
      // token_expires_in is in seconds, refresh if it expires in the next 24 hours
      if ((Date.now() - 86400000) < teslaAccount.token_created_at.valueOf() + (1000 * teslaAccount.token_expires_in)) {
        return Promise.resolve(teslaAccount);
      } else {
        return this.updateToken(teslaAccount, 'refresh_token');
      }
    } else {
      return this.updateToken(teslaAccount, 'password');
    }
  };

  async updateToken(teslaAccount: TeslaAccount, grant_type: string, password?: string) {
    if(!this.config){
      this.config = await this.configurationService.getConfiguration();
    }
    const data = {
      email: teslaAccount.email,
      client_id: this.config.teslaClientKey,
      client_secret: this.config.teslaClientSecret,
      grant_type
    };
    if (password && grant_type === 'password') {
      // @ts-ignore
      data[grant_type] = password;
    } else {
      // @ts-ignore
      data[grant_type] = this.teslaAccount[grant_type];
    }
    const res = await axios({
                              method: 'post',
                              url: `${this.config.ownerBaseUrl}/oauth/token?grant_type=${grant_type}`,
                              data,
                              headers: {
                                'User-Agent': 'coderado-tesla-sync'
                              }
                            });
    console.log('Authenticated with Tesla API');
    teslaAccount.access_token = res.data.access_token;
    teslaAccount.refresh_token = res.data.refresh_token;
    teslaAccount.token_expires_in = res.data.expires_in;
    teslaAccount.token_created_at = Date.now();
    console.log('saving token');
    return this.teslaAccountService.sanitizeTeslaAccount(
        await this.teslaAccountService.update(teslaAccount)
    );
  }


  async getVehicles(teslaAccount: TeslaAccount): Promise<Vehicle[]> {
    return this.checkToken(teslaAccount)
               .then(() => axios.get(`${this.config.ownerBaseUrl}/api/1/vehicles`, {
                 headers: {
                   'User-Agent': 'coderado-tesla-sync',
                   'Authorization': `Bearer ${teslaAccount.access_token}`
                 }
               }))
               .then((vehicleListResponse) => vehicleListResponse?.data?.response);
  }

  async getState(teslaAccount: TeslaAccount, id: String): Promise<VehicleData | undefined> {
    return this.checkToken(teslaAccount)
               .then(() => axios.get(`${this.config.ownerBaseUrl}/api/1/vehicles/${id}/vehicle_data`, {
                 headers: {
                   'User-Agent': 'coderado-tesla-sync',
                   'Authorization': `Bearer ${teslaAccount.access_token}`
                 }
               }))
               .then((vehicle_data) => {
                       return vehicle_data?.data?.response;
                     },
                     (err) => {
                       const statusCode = err.response.status;
                       switch (statusCode) {
                         case 408:
                           console.log('Vehicle sleeping');
                           break;
                         case 502:
                           console.log('Vehicle offline');
                           break;
                         case 504:
                           console.log('Vehicle offline');
                           break;
                         default:
                           console.log(`Got response ${statusCode} and it is not handled yet`);
                           console.log(err);
                       }
                     });
  }

  getNearbyChargers(teslaAccount: TeslaAccount, id: String) {
    return this.checkToken(teslaAccount)
               .then(() => axios.get(`${this.config.ownerBaseUrl}/api/1/vehicles/${id}/nearby_charging_sites`, {
                 headers: {
                   'User-Agent': 'coderado-tesla-sync',
                   'Authorization': `Bearer ${teslaAccount.access_token}`
                 }
               }))
               .then((nearby_charging_sites) => {
                       return nearby_charging_sites?.data?.response;
                     },
                     (err) => {
                       const statusCode = err.response.status;
                       switch (statusCode) {
                           // TODO: handle response codes?
                         default:
                           console.log(`Got response ${statusCode} and it is not handled yet`);
                           console.log(err);
                       }
                     });
  }

  async getVehicle(teslaAccount: TeslaAccount, id_s: string) {
    return this.checkToken(teslaAccount)
               .then(() => axios.get(`${this.config.ownerBaseUrl}/api/1/vehicles/${id_s}`, {
                 headers: {
                   'User-Agent': 'coderado-tesla-sync',
                   'Authorization': `Bearer ${teslaAccount.access_token}`
                 }
               }))
               .then((vehicleResponse) => vehicleResponse?.data?.response);
  }
}
