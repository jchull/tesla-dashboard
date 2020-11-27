import { Document, Schema } from 'mongoose'
import { VehicleState } from '../types'


export const VehicleStateSchema = new Schema<VehicleState>({
  is_key_state: { type: Boolean },
  battery_heater_on: { type: Boolean },
  battery_level: { type: Number },
  battery_range: { type: Number },
  charge_current_request: { type: Number },
  charge_energy_added: { type: Number },
  charge_miles_added_ideal: { type: Number },
  charge_miles_added_rated: { type: Number },
  charge_port_door_open: { type: Boolean },
  charge_port_latch: { type: String },
  charge_rate: { type: Number },
  charger_actual_current: { type: Number },
  charger_power: { type: Number },
  charger_voltage: { type: Number },
  charging_state: { type: String },
  est_battery_range: { type: Number },
  ideal_battery_range: { type: Number },
  time_to_full_charge: { type: Number },
  timestamp: { type: Number },
  driver_temp_setting: { type: Number },
  fan_status: { type: Number },
  inside_temp: { type: Number },
  is_auto_conditioning_on: { type: Boolean },
  is_climate_on: { type: Boolean },
  is_front_defroster_on: { type: Boolean },
  is_preconditioning: { type: Boolean },
  is_rear_defroster_on: { type: Boolean },
  outside_temp: { type: Number },
  passenger_temp_setting: { type: Number },
  seat_heater_left: { type: Number },
  seat_heater_rear_center: { type: Number },
  seat_heater_rear_left: { type: Number },
  seat_heater_rear_right: { type: Number },
  seat_heater_right: { type: Number },
  side_mirror_heaters: { type: Boolean },
  smart_preconditioning: { type: Boolean },
  is_user_present: { type: Boolean },

  vehicleActivity: { type: Schema.Types.ObjectId, ref: 'VehicleActivity' }
})

export type VehicleStateType = VehicleState & Document
