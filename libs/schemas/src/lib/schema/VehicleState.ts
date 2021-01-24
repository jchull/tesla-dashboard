import { Document, Schema } from 'mongoose'
import { VehicleState } from '@tesla-dashboard/types'

export type VehicleStateType = VehicleState & Document

export const VehicleStateSchema = new Schema<VehicleStateType>({
  is_key_state: { type: Boolean },

  id: { type: Number },
  id_s: { type: String },
  user_id: { type: Number },
  vehicle_id: { type: Number },
  vin: { type: String },
  display_name: { type: String },
  option_codes: { type: String },
  color: { type: String },
  // tokens: { type: [String] },
  state: { type: String },
  in_service: { type: Boolean },
  calendar_enabled: { type: Boolean },
  api_version: { type: Number },
  backseat_token: { type: String },
  backseat_token_updated_at: { type: Number },

  // charge_state: {
  battery_heater_on: { type: Boolean },
  battery_level: { type: Number },
  battery_range: { type: Number },
  charge_current_request: { type: Number },
  charge_current_request_max: { type: Number },
  charge_enable_request: { type: Boolean },
  charge_energy_added: { type: Number },
  charge_limit_soc: { type: Number },
  charge_limit_soc_max: { type: Number },
  charge_limit_soc_min: { type: Number },
  charge_limit_soc_std: { type: Number },
  charge_miles_added_ideal: { type: Number },
  charge_miles_added_rated: { type: Number },
  charge_port_cold_weather_mode: { type: Boolean },
  charge_port_door_open: { type: Boolean },
  charge_port_latch: { type: String },
  charge_rate: { type: Number },
  charge_to_max_range: { type: Boolean },
  charger_actual_current: { type: Number },
  charger_phases: { type: Number },
  charger_pilot_current: { type: Number },
  charger_power: { type: Number },
  charger_voltage: { type: Number },
  charging_state: { type: String },
  conn_charge_cable: { type: String },
  est_battery_range: { type: Number },
  fast_charger_brand: { type: String },
  fast_charger_present: { type: Boolean },
  fast_charger_type: { type: String },
  ideal_battery_range: { type: Number },
  managed_charging_active: { type: Boolean },
  managed_charging_start_time: { type: Number },
  managed_charging_user_canceled: { type: Boolean },
  max_range_charge_counter: { type: Number },
  minutes_to_full_charge: { type: Number },
  not_enough_power_to_heat: { type: Boolean },
  scheduled_charging_pending: { type: Boolean },
  scheduled_charging_start_time: { type: Number },
  time_to_full_charge: { type: Number },
  timestamp: { type: Number },
  trip_charging: { type: Boolean },
  usable_battery_level: { type: Number },
  user_charge_enable_request: { type: String },

  // climate_state: {
  battery_heater: { type: Boolean },
  battery_heater_no_power: { type: String },
  climate_keeper_mode: { type: String },
  defrost_mode: { type: Number },
  driver_temp_setting: { type: Number },
  fan_status: { type: Number },
  inside_temp: { type: Number },
  is_auto_conditioning_on: { type: Boolean },
  is_climate_on: { type: Boolean },
  is_front_defroster_on: { type: Boolean },
  is_preconditioning: { type: Boolean },
  is_rear_defroster_on: { type: Boolean },
  left_temp_direction: { type: Number },
  max_avail_temp: { type: Number },
  min_avail_temp: { type: Number },
  outside_temp: { type: Number },
  passenger_temp_setting: { type: Number },
  remote_heater_control_enabled: { type: Boolean },
  right_temp_direction: { type: Number },
  seat_heater_left: { type: Number },
  seat_heater_rear_center: { type: Number },
  seat_heater_rear_left: { type: Number },
  seat_heater_rear_right: { type: Number },
  seat_heater_right: { type: Number },
  side_mirror_heaters: { type: Boolean },
  smart_preconditioning: { type: Boolean },
  wiper_blade_heater: { type: Boolean },

  // drive_state: {
  gps_as_of: { type: Number },
  heading: { type: Number },
  latitude: { type: Number },
  longitude: { type: Number },
  native_latitude: { type: Number },
  native_location_supported: { type: Number },
  native_longitude: { type: Number },
  native_type: { type: String },
  power: { type: Number },
  shift_state: { type: String },
  speed: { type: Number },

  // gui_settings: {
  gui_24_hour_time: { type: Boolean },
  gui_charge_rate_units: { type: String },
  gui_distance_units: { type: String },
  gui_range_display: { type: String },
  gui_temperature_units: { type: String },
  show_range_units: { type: Boolean },

  // vehicle_config: {
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
  use_range_badging: { type: Boolean },
  wheel_type: { type: String },
  // vehicle_state: {
  autopark_state_v3: { type: String },
  autopark_style: { type: String },
  calendar_supported: { type: Boolean },
  car_version: { type: String },
  center_display_state: { type: Number },
  fd_window: { type: Number },
  fp_window: { type: Number },
  rd_window: { type: Number },
  rp_window: { type: Number },
  smart_summon_available: { type: Boolean },
  summon_standby_mode_enabled: { type: Boolean },
  df: { type: Number },
  dr: { type: Number },
  ft: { type: Number },
  homelink_nearby: { type: Boolean },
  is_user_present: { type: Boolean },
  last_autopark_error: { type: String },
  locked: { type: Boolean },
  // media_state: {
  remote_control_enabled: { type: Boolean },
  notifications_supported: { type: Boolean },
  odometer: { type: Number },
  parsed_calendar_supported: { type: Boolean },
  pf: { type: Number },
  pr: { type: Number },
  remote_start: { type: Boolean },
  remote_start_enabled: { type: Boolean },
  remote_start_supported: { type: Boolean },
  rt: { type: Number },
  sentry_mode: { type: Boolean },
  sentry_mode_available: { type: Boolean },
  // software_update: {
  download_perc: { type: Number },
  install_perc: { type: Number },
  expected_duration_sec: { type: Number },
  status: { type: String },
  version: { type: String },
  // speed_limit_mode: {
  active: { type: Boolean },
  current_limit_mph: { type: Number },
  max_limit_mph: { type: Number },
  min_limit_mph: { type: Number },
  pin_code_set: { type: Boolean },
  sun_roof_percent_open: { type: Number },
  sun_roof_state: { type: String },
  valet_mode: { type: Boolean },
  valet_pin_needed: { type: Boolean },
  vehicle_name: { type: String },
  vehicleActivity: { type: Schema.Types.ObjectId, ref: 'VehicleActivity' }
})
