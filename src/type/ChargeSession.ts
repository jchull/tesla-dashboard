import {IChargeState} from './ChargeState';
import {IVehicleSession} from './VehicleSession';

export interface IChargeSession extends IVehicleSession {
  latitude?: number,
  longitude?: number,
  charge_current_request_max?: number,
  charge_enable_request?: boolean,
  charge_limit_soc?: number,
  charge_limit_soc_max?: number,
  charge_limit_soc_min?: number,
  charge_limit_soc_std?: number,
  charge_port_cold_weather_mode?: boolean,
  charge_to_max_range?: boolean,
  charger_phases?: number,
  charger_pilot_current?: number,
  conn_charge_cable?: string,
  fast_charger_brand?: string,
  fast_charger_present?: boolean,
  fast_charger_type?: string,
  managed_charging_active?: boolean,
  managed_charging_start_time?: number,
  managed_charging_user_canceled?: boolean,
  max_range_charge_counter?: number,
  scheduled_charging_pending?: boolean,
  scheduled_charging_start_time?: number,
  trip_charging?: boolean,
  first: IChargeState,
  last?: IChargeState
}
