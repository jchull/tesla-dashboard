export interface Vehicle {
  id_s: string;
  vehicle_id: number;
  vin: string;
  display_name: string;
  option_codes: string;
  color?: string;
  in_service?: boolean;
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
  username?: string;
  sync_state?: string;
}
