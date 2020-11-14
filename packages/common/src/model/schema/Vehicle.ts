import { Document, Schema } from 'mongoose'
import { Vehicle } from '../types'


export const VehicleSchema = new Schema<Vehicle>({
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
  last_session_id: { type: String },
  username: { type: String },
  sync_preferences: { type: Schema.Types.ObjectId, ref: 'SyncPreferences' },
  sync_state: { type: String }
})

export type VehicleType = Vehicle & Document
