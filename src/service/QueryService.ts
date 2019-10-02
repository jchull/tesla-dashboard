import axios, {AxiosInstance} from 'axios';
import {IChargeSession, IChargeState, IDriveState, IVehicle} from 'tesla-dashboard-api';


export class QueryService {

  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getProducts(): Promise<[IVehicle]> {
    const result = await this.api.get('/vehicle', {headers: {'Cache-Control': 'no-cache'}});
    return result && result.data;
  }


  async getRecentSessions(vin: string, limit: number = 1): Promise<IChargeSession[]> {
    const result = await axios(`/vehicle/${vin}/session?limit=${limit}`);
    return result && result.data;
  }

  async getChargingStates(vin: string, chargeSessionId: string): Promise<IChargeState[]> {
    const result = await this.api.get(`/vehicle/${vin}/charge/${chargeSessionId}`);
    return result && result.data;
  }

  async getDrivingStates(vin: string, driveSessionId: string): Promise<IDriveState[]> {
    const result = await this.api.get(`/vehicle/${vin}/drive/${driveSessionId}`);
    return result && result.data;
  }

  async addTag(vin: string, sessionId: string, tag: string): Promise<string[]> {
    if (!(tag.match(/^[a-z0-9\w].+$/i))) {
      throw Error('tags must contain only letters, numbers, and spaces');
    }
    const sanitizedTag = tag.replace(' ', '_')
                            .toLowerCase();
    const result = await this.api.post(`/vehicle/${vin}/session/${sessionId}/tag/${sanitizedTag}`, {sanitizedTag});
    return result && result.data;
  }

  async removeTag(vin: string, sessionId: string, tag: string): Promise<string[]> {
    if (!tag.match(/^[a-z0-9\w].+$/i)) {
      throw Error('tags must contain only letters, numbers, and spaces');
    }
    const sanitizedTag = tag.replace(' ', '_')
                            .toLowerCase();
    const result = await this.api.delete(`/vehicle/${vin}/session/${sessionId}/tag/${sanitizedTag}`);
    return result && result.data;
  }
}

