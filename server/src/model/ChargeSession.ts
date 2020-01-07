import {Document, model, Schema} from 'mongoose';
import {ChargeSession as IChargeSession} from './types/ChargeSession';

const ChargeSessionSchema: Schema = new Schema(
    {
      start_date: {type: Number, required: true},
      end_date: {type: Number},
      archived: {type: Boolean},
      latitude: {type: Number},
      longitude: {type: Number},
      charge_current_request_max: {type: Number},
      charge_enable_request: {type: Boolean},
      charge_limit_soc: {type: Number},
      charge_limit_soc_max: {type: Number},
      charge_limit_soc_min: {type: Number},
      charge_limit_soc_std: {type: Number},
      charge_port_cold_weather_mode: {type: Boolean},
      charge_to_max_range: {type: Boolean},
      charger_phases: {type: Number},
      charger_pilot_current: {type: Number},
      conn_charge_cable: {type: String},
      fast_charger_brand: {type: String},
      fast_charger_present: {type: Boolean},
      fast_charger_type: {type: String},
      managed_charging_active: {type: Boolean},
      managed_charging_start_time: {type: Number},
      managed_charging_user_canceled: {type: Boolean},
      max_range_charge_counter: {type: Number}, // end of charge
      scheduled_charging_pending: {type: Boolean},
      scheduled_charging_start_time: {type: Number},
      trip_charging: {type: Boolean},
      tags: {type: [String]},
      first: {type: Schema.Types.ObjectId, ref: 'ChargeState'},
      last: {type: Schema.Types.ObjectId, ref: 'ChargeState'},
      vehicle: {type: Schema.Types.ObjectId, ref: 'Vehicle'}
    });

export const ChargeSession = model<IChargeSession & Document>('ChargeSession', ChargeSessionSchema);
export type ChargeSessionType = IChargeSession & Document;
