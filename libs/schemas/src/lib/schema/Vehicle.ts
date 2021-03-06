import { Document, Schema } from 'mongoose';
import { Vehicle } from '@tesla-dashboard/types';

export type VehicleType = Vehicle & Document;

export const VehicleSchema = new Schema<VehicleType>({
  id_s: { type: String, required: true, unique: true },
  vin: { type: String, required: true, unique: true },
  display_name: { type: String, required: true },
  color: { type: String },
  option_codes: { type: String },
  calendar_enabled: { type: Boolean },
  api_version: { type: Number },
  odometer: { type: Number },
  timestamp: { type: Number },
  car_type: { type: String },
  battery_level: { type: Number },
  state: { type: String },
  battery_range: { type: Number },
  charging_state: { type: String },
  time_to_full_charge: { type: Number },
  charge_limit_soc: { type: Number },
  charge_limit_soc_min: { type: Number },
  username: { type: String },
  sync_preferences: { type: Schema.Types.ObjectId, ref: 'SyncPreferences' },
  sync_state: { type: String },
});
