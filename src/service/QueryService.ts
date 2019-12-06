import axios, {AxiosInstance} from 'axios';
import {ChargeSession, ChargeState, DriveSession, DriveState, Vehicle as Product} from 'tesla-dashboard-api';


export class QueryService {

  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getProducts(): Promise<[Product]> {
    const result = await this.api.get('/vehicle', {headers: {'Cache-Control': 'no-cache'}});
    return result && result.data;
  }


  async getRecentSessions(vin: string, limit = 1): Promise<ChargeSession[] | DriveSession[]> {
    const result = await axios(`/vehicle/${vin}/session?limit=${limit}`);
    return result && result.data;
  }

  async getSessionDetails(sessionId: string): Promise<ChargeState[] | DriveState[]> {
    const result = await this.api.get(`/session/${sessionId}`);
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

  async removeSession(vin: string, sessionId: string): Promise<string[]> {
    const result = await this.api.delete(`/vehicle/${vin}/session/${sessionId}`);
    return result && result.data;
  }

}

