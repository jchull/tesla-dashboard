import axios from 'axios';
import {IVehicle, IChargeSession, IChargeState, IDriveState} from 'tesla-dashboard-api';
// TODO: get from config
const ENDPOINT = 'http://localhost:3001';



export class QueryService {

    endpoint: string;

    constructor(endpoint: string = ENDPOINT) {
        this.endpoint = endpoint;
    }

    async getProducts(): Promise<[IVehicle]> {
        const result = await axios(`${ENDPOINT}/vehicle`, {headers:{'Cache-Control': 'no-cache'}});
        return result && result.data;
    }


    async getRecentSessions(productId: string, limit: number = 1): Promise<IChargeSession[]> {
        const result = await axios(`${ENDPOINT}/vehicle/${productId}/session?limit=${limit}`);
        return result && result.data;
    }

    async getChargingStates(vehicleId: string, chargeSessionId: string): Promise<IChargeState[]> {
        const result = await axios(`${ENDPOINT}/vehicle/${vehicleId}/charge/${chargeSessionId}`);
        return result && result.data;
    }

    async getDrivingStates(vehicleId: string, driveSessionId: string): Promise<IDriveState[]> {
        const result = await axios(`${ENDPOINT}/vehicle/${vehicleId}/drive/${driveSessionId}`);
        return result && result.data;
    }

    async addTag(vehicleId: string, sessionId: string, tag: string): Promise<string[]> {
        if(!(tag.match(/^[a-z0-9\w].+$/i))){
            throw Error('tags must contain only letters, numbers, and spaces')
        }
        const sanitizedTag = tag.replace(' ', '_').toLowerCase();
        const result = await axios.post(`${ENDPOINT}/vehicle/${vehicleId}/session/${sessionId}/tag/${sanitizedTag}`, {sanitizedTag});
        return result && result.data;
    }

    async removeTag(vehicleId: string, sessionId: string, tag: string): Promise<string[]> {
        if(!tag.match(/^[a-z0-9\w].+$/i)){
            throw Error('tags must contain only letters, numbers, and spaces')
        }
        const sanitizedTag = tag.replace(' ', '_').toLowerCase();
        const result = await axios.delete(`${ENDPOINT}/vehicle/${vehicleId}/session/${sessionId}/tag/${sanitizedTag}`);
        return result && result.data;
    }
}

