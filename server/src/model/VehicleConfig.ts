import { Document, Schema } from 'mongoose';
import { VehicleConfig } from './types/tesla/VehicleConfig';

export const VehicleConfigSchema = new Schema({
  id_s: { type: String, required: true },
  can_accept_navigation_requests: { type: Boolean },
  can_actuate_trunks: { type: Boolean },
  car_special_type: { type: String },
  car_type: { type: String },
  charge_port_type: { type: String },
  eu_vehicle: { type: Boolean },
  exterior_color: { type: String },
  has_air_suspension: { type: Boolean },
  has_ludicrous_mode: { type: Boolean },
  key_version: { type: Number },
  motorized_charge_port: { type: Boolean },
  plg: { type: Boolean },
  rear_seat_heaters: { type: Number },
  rear_seat_type: { type: String },
  rhd: { type: Boolean },
  roof_color: { type: String },
  seat_type: { type: String },
  spoiler_type: { type: String },
  sun_roof_installed: { type: Boolean },
  third_row_seats: { type: String },
  timestamp: { type: Number },
  use_range_badging: { type: Boolean },
  wheel_type: { type: String },
});

export type VehicleConfigType = VehicleConfig & Document;
