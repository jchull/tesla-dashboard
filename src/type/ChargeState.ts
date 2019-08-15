import {IChargeSession} from './ChargeSession';
import {IVehicleState} from './VehicleState';

export interface IChargeState extends IVehicleState {
  charge_current_request: number,
  charge_energy_added: number,
  charge_miles_added_ideal: number,
  charge_miles_added_rated: number,
  charge_port_door_open: boolean,
  charge_port_latch: string,
  charge_rate: number,
  charger_actual_current: number,
  charger_power: number,
  charger_voltage: number,
  charging_state: string,
  time_to_full_charge: number,

  session?: IChargeSession
}
