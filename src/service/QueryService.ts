import axios from 'axios';
import {IChargeSession} from '../type/ChargeSession';
import {IVehicle} from '../type/Vehicle';
import {IChargeState} from '../type/ChargeState';
import {IDriveState} from '../type/DriveState';

// TODO: get from config
const ENDPOINT = 'http://localhost:3001';



export class QueryService {

  endpoint: string;

  constructor(endpoint: string = ENDPOINT) {
    this.endpoint = endpoint;
  }

  async getProducts(): Promise<Array<IVehicle>> {
    const result = await axios(`${ENDPOINT}/vehicle`, {headers:{'Cache-Control': 'no-cache'}});
    return result && result.data;
  }


  async getRecentSessions(productId: string, limit: number = 1): Promise<Array<IChargeSession>> {
    const result = await axios(`${ENDPOINT}/vehicle/${productId}/session?limit=${limit}`);
    return result && result.data;
  }

  async getChargingStates(vehicleId: string, chargeSessionId: string): Promise<Array<IChargeState>> {
    const result = await axios(`${ENDPOINT}/vehicle/${vehicleId}/charge/${chargeSessionId}`);
    return result && result.data;
  }

  async getDrivingStates(vehicleId: string, driveSessionId: string): Promise<Array<IDriveState>> {
    const result = await axios(`${ENDPOINT}/vehicle/${vehicleId}/drive/${driveSessionId}`);
    return result && result.data;
  }

  async addTag(vehicleId: string, sessionId: string, tag: string): Promise<Array<string>> {
    if(!(tag.match(/^[a-z0-9\w].+$/i))){
      throw Error('tags must contain only letters, numbers, and spaces')
    }
    const sanitizedTag = tag.replace(' ', '_').toLowerCase();
    const result = await axios.post(`${ENDPOINT}/vehicle/${vehicleId}/session/${sessionId}/tag/${sanitizedTag}`, {sanitizedTag});
    return result && result.data;
  }

  async removeTag(vehicleId: string, sessionId: string, tag: string): Promise<Array<string>> {
    if(!tag.match(/^[a-z0-9\w].+$/i)){
      throw Error('tags must contain only letters, numbers, and spaces')
    }
    const sanitizedTag = tag.replace(' ', '_').toLowerCase();
    const result = await axios.delete(`${ENDPOINT}/vehicle/${vehicleId}/session/${sessionId}/tag/${sanitizedTag}`);
    return result && result.data;
  }
}

