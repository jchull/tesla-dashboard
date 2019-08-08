import {ProductType} from './ProductType';

export interface IVehicle extends ProductType {
  _id: string;
  id_s: string;
  vehicle_id: number;
  vin: string;
  display_name: string;
  option_codes: string;
  color?: string;
  calendar_enabled: boolean;
  api_version: number;
}


