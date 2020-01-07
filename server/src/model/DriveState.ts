import {Document, model, Schema} from 'mongoose';
import {DriveState as IDriveState} from './types/DriveState';


const DriveStateSchema: Schema = new Schema({
  gps_as_of: {type: Number},
  heading: {type: Number},
  latitude: {type: Number},
  longitude: {type: Number},
  power: {type: Number},
  shift_state: {type: String},
  speed: {type: Number},
  odometer: {type: Number},
  timestamp: {type: Number},
  battery_heater: {type: Boolean},
  battery_level: {type: Number},
  battery_range: {type: Number},
  est_battery_range: {type: Number},
  ideal_battery_range: {type: Number},
  usable_battery_level: {type: Number},
  driver_temp_setting: {type: Number},
  fan_status: {type: Number},
  inside_temp: {type: Number},
  is_auto_conditioning_on: {type: Boolean},
  is_climate_on: {type: Boolean},
  is_front_defroster_on: {type: Boolean},
  is_preconditioning: {type: Boolean},
  is_rear_defroster_on: {type: Boolean},
  outside_temp: {type: Number},
  passenger_temp_setting: {type: Number},
  seat_heater_left: {type: Number},
  seat_heater_rear_center: {type: Number},
  seat_heater_rear_left: {type: Number},
  seat_heater_rear_right: {type: Number},
  seat_heater_right: {type: Number},
  side_mirror_heaters: {type: Boolean},
  smart_preconditioning: {type: Boolean},
  wiper_blade_heater: {type: Boolean},

  driveSession: {type: Schema.Types.ObjectId, ref: 'DriveSession'}
});

export const DriveState = model<IDriveState & Document>('DriveState', DriveStateSchema);
export type DriveStateType = IDriveState & Document;

