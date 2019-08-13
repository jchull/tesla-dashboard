import {IDriveSession} from './DriveSession';

export interface IDriveState {
  _id: string;
  id_s: string,
  gps_as_of: number,
  heading: number,
  latitude: number,
  longitude: number,
  power: number,
  shift_state: string,
  speed: number,
  odometer: number,
  timestamp: number,
  battery_heater: boolean,
  battery_level: number,
  est_battery_range: number,
  battery_range: number,
  ideal_battery_range: number,
  usable_battery_level: number,
  driver_temp_setting: number,
  fan_status: number,
  inside_temp: number,
  is_auto_conditioning_on: boolean,
  is_climate_on: boolean,
  is_front_defroster_on: boolean,
  is_preconditioning: boolean,
  is_rear_defroster_on: boolean,
  outside_temp: number,
  passenger_temp_setting: number,
  seat_heater_left: number,
  seat_heater_rear_center: number,
  seat_heater_rear_left: number,
  seat_heater_rear_right: number,
  seat_heater_right: number,
  side_mirror_heaters: boolean,
  smart_preconditioning: boolean,
  wiper_blade_heater: boolean,

  driveSession?: IDriveSession
}
