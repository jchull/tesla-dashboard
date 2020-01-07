
export interface VehicleState {
  _id: string;
  id_s: string;
  vehicle_id: number;
  is_key_state: boolean;
  battery_heater_on: boolean;
  battery_level: number;
  battery_range: number;
  est_battery_range: number;
  ideal_battery_range: number;
  timestamp: number;
  driver_temp_setting: number;
  fan_status: number;
  inside_temp: number;
  is_auto_conditioning_on: boolean;
  is_climate_on: boolean;
  is_front_defroster_on: boolean;
  is_preconditioning: boolean;
  is_rear_defroster_on: boolean;
  outside_temp: number;
  passenger_temp_setting: number;
  seat_heater_left: number;
  seat_heater_rear_center: number;
  seat_heater_rear_left: number;
  seat_heater_rear_right: number;
  seat_heater_right: number;
  side_mirror_heaters: boolean;
  smart_preconditioning: boolean;
  is_user_present: boolean;
  usable_battery_level: number;
}

