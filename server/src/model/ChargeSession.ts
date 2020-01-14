import { Document, Schema } from 'mongoose';
import { ChargeState } from './ChargeState';
import { Vehicle } from './types/tesla/Vehicle';
export interface ChargeSession {
  _id: string;
  id_s: string;
  start_date: number;
  end_date?: number;
  archived: boolean;
  tags: string[];
  latitude?: number;
  longitude?: number;
  charge_current_request_max?: number;
  charge_enable_request?: boolean;
  charge_limit_soc?: number;
  charge_limit_soc_max?: number;
  charge_limit_soc_min?: number;
  charge_limit_soc_std?: number;
  charge_port_cold_weather_mode?: boolean;
  charge_to_max_range?: boolean;
  charger_phases?: number;
  charger_pilot_current?: number;
  conn_charge_cable?: string;
  fast_charger_brand?: string;
  fast_charger_present?: boolean;
  fast_charger_type?: string;
  managed_charging_active?: boolean;
  managed_charging_start_time?: number;
  managed_charging_user_canceled?: boolean;
  max_range_charge_counter?: number;
  scheduled_charging_pending?: boolean;
  scheduled_charging_start_time?: number;
  trip_charging?: boolean;
  first: ChargeState;
  last?: ChargeState;
  vehicle?: Vehicle;
}

export const ChargeSessionSchema = new Schema({
  start_date: { type: Number, required: true },
  end_date: { type: Number },
  archived: { type: Boolean },
  latitude: { type: Number },
  longitude: { type: Number },
  charge_current_request_max: { type: Number },
  charge_enable_request: { type: Boolean },
  charge_limit_soc: { type: Number },
  charge_limit_soc_max: { type: Number },
  charge_limit_soc_min: { type: Number },
  charge_limit_soc_std: { type: Number },
  charge_port_cold_weather_mode: { type: Boolean },
  charge_to_max_range: { type: Boolean },
  charger_phases: { type: Number },
  charger_pilot_current: { type: Number },
  conn_charge_cable: { type: String },
  fast_charger_brand: { type: String },
  fast_charger_present: { type: Boolean },
  fast_charger_type: { type: String },
  managed_charging_active: { type: Boolean },
  managed_charging_start_time: { type: Number },
  managed_charging_user_canceled: { type: Boolean },
  max_range_charge_counter: { type: Number }, // end of charge
  scheduled_charging_pending: { type: Boolean },
  scheduled_charging_start_time: { type: Number },
  trip_charging: { type: Boolean },
  tags: { type: [String] },
  first: { type: Schema.Types.ObjectId, ref: 'ChargeState' },
  last: { type: Schema.Types.ObjectId, ref: 'ChargeState' },
  vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' }
});

export type ChargeSessionType = ChargeSession & Document;
