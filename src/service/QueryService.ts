import axios, {AxiosInstance} from 'axios';
import {IVehicle, IChargeSession, IChargeState, IDriveState} from 'tesla-dashboard-api';
import {configurationService} from '@service/Services';


export class QueryService {

    private readonly endpoint: string;
    private readonly api: AxiosInstance;

    constructor() {
        this.endpoint = configurationService.get('REACT_APP_API_ROOT') || '';

        this.api = axios.create({
            withCredentials: true,
            baseURL: this.endpoint,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': 'localhost'
            }
        });
    }

    async getProducts(): Promise<[IVehicle]> {
        const result = await this.api.get('/vehicle', {headers:{'Cache-Control': 'no-cache'}});
        return result && result.data;
    }


    async getRecentSessions(productId: string, limit: number = 1): Promise<IChargeSession[]> {
        const result = await axios(`${this.endpoint}/vehicle/${productId}/session?limit=${limit}`);
        return result && result.data;
    }

    async getChargingStates(vehicleId: string, chargeSessionId: string): Promise<IChargeState[]> {
        const result = await this.api.get(`/vehicle/${vehicleId}/charge/${chargeSessionId}`);
        return result && result.data;
    }

    async getDrivingStates(vehicleId: string, driveSessionId: string): Promise<IDriveState[]> {
        const result = await this.api.get(`/vehicle/${vehicleId}/drive/${driveSessionId}`);
        return result && result.data;
    }

    async addTag(vehicleId: string, sessionId: string, tag: string): Promise<string[]> {
        if(!(tag.match(/^[a-z0-9\w].+$/i))){
            throw Error('tags must contain only letters, numbers, and spaces')
        }
        const sanitizedTag = tag.replace(' ', '_').toLowerCase();
        const result = await this.api.post(`/vehicle/${vehicleId}/session/${sessionId}/tag/${sanitizedTag}`, {sanitizedTag});
        return result && result.data;
    }

    async removeTag(vehicleId: string, sessionId: string, tag: string): Promise<string[]> {
        if(!tag.match(/^[a-z0-9\w].+$/i)){
            throw Error('tags must contain only letters, numbers, and spaces')
        }
        const sanitizedTag = tag.replace(' ', '_').toLowerCase();
        const result = await this.api.delete(`/vehicle/${vehicleId}/session/${sessionId}/tag/${sanitizedTag}`);
        return result && result.data;
    }
}

