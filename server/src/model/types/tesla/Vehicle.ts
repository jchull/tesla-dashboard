import {SyncPreferences} from '../SyncPreferences';

export interface Vehicle {
  _id: string;
  id_s: string;
  vehicle_id: number;
  vin: string;
  display_name: string;
  option_codes: string;
  color?: string;

  //tokens
  // state: string;
  // in_service: boolean;
  calendar_enabled: boolean;
  api_version: number;
  // backseat_token: String
  // backseat_token_updated_at: number
  odometer?: number;
  timestamp: number;
  car_type: string;
  battery_level: number;
  battery_range: number;
  state: string;
  charging_state?: string;
  time_to_full_charge?: number;
  charge_limit_soc?: number;
  last_session_id: string;
  username?: string;
  sync_preferences?: SyncPreferences;
  sync_state?: string;
}

