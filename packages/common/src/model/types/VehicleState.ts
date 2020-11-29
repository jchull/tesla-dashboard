import { Entity } from './common'

export interface VehicleState extends Entity {
  id: number
  id_s: string
  user_id: number
  vehicle_id: number
  vin: string
  display_name: string
  option_codes?: string
  color?: string
  tokens?: string[]
  state?: string
  in_service?: boolean
  calendar_enabled?: boolean
  api_version: number
  backseat_token?: string
  backseat_token_updated_at?: number
  timestamp: number

  // charge_state: {
  battery_heater_on?: boolean
  battery_level: number
  battery_range: number
  charge_current_request: number
  charge_current_request_max: number
  charge_enable_request?: boolean
  charge_energy_added: number
  charge_limit_soc: number
  charge_limit_soc_max: number
  charge_limit_soc_min: number
  charge_limit_soc_std: number
  charge_miles_added_ideal: number
  charge_miles_added_rated: number
  charge_port_cold_weather_mode: boolean
  charge_port_door_open: boolean
  charge_port_latch: string
  charge_rate: number
  charge_to_max_range: boolean
  charger_actual_current: number
  charger_phases?: number
  charger_pilot_current: number
  charger_power?: number
  charger_voltage?: number
  charging_state?: string
  conn_charge_cable?: string
  est_battery_range: number
  fast_charger_brand?: string
  fast_charger_present?: boolean
  fast_charger_type?: string
  ideal_battery_range: number
  managed_charging_active?: boolean
  managed_charging_start_time?: number
  managed_charging_user_canceled?: boolean
  max_range_charge_counter?: number
  minutes_to_full_charge?: number
  not_enough_power_to_heat?: boolean
  scheduled_charging_pending?: boolean
  scheduled_charging_start_time?: number
  time_to_full_charge?: number
  trip_charging?: boolean
  usable_battery_level: number
  user_charge_enable_request?: any

  // climate_state: {
  battery_heater?: boolean
  battery_heater_no_power: any
  climate_keeper_mode: string
  defrost_mode?: number
  driver_temp_setting: number
  fan_status?: number
  inside_temp: number
  is_auto_conditioning_on: boolean
  is_climate_on?: boolean
  is_front_defroster_on?: boolean
  is_preconditioning?: boolean
  is_rear_defroster_on?: boolean
  left_temp_direction: number
  max_avail_temp: number
  min_avail_temp: number
  outside_temp: number
  passenger_temp_setting: number
  remote_heater_control_enabled: boolean
  right_temp_direction: number
  seat_heater_left: number
  seat_heater_rear_center: number
  seat_heater_rear_left: number
  seat_heater_rear_right: number
  seat_heater_right: number
  side_mirror_heaters: boolean
  smart_preconditioning: boolean
  wiper_blade_heater: boolean

  // drive_state: {
  gps_as_of?: number
  heading?: number
  latitude?: number
  longitude?: number
  native_latitude?: number
  native_location_supported?: number
  native_longitude?: number
  native_type?: string
  power?: number
  shift_state?: string
  speed?: number

  // gui_settings: {
  gui_24_hour_time?: boolean
  gui_charge_rate_units?: string
  gui_distance_units?: string
  gui_range_display?: string
  gui_temperature_units?: string
  show_range_units?: boolean

  // vehicle_config: {
  can_accept_navigation_requests?: boolean
  can_actuate_trunks?: boolean
  car_special_type?: string
  car_type: string
  charge_port_type?: string
  eu_vehicle?: boolean
  exterior_color?: string
  has_air_suspension?: boolean
  has_ludicrous_mode?: boolean
  key_version?: number
  motorized_charge_port?: boolean
  plg?: boolean
  rear_seat_heaters?: number
  rear_seat_type?: any
  rhd?: boolean
  roof_color?: string
  seat_type?: any
  spoiler_type?: string
  sun_roof_installed?: boolean
  third_row_seats?: string
  use_range_badging?: boolean
  wheel_type?: string

  // vehicle_state: {
  autopark_state_v3?: string
  autopark_style?: string
  calendar_supported?: boolean
  car_version?: string
  center_display_state?: number
  fd_window?: number
  fp_window?: number
  rd_window?: number
  rp_window?: number
  smart_summon_available?: boolean
  summon_standby_mode_enabled?: boolean
  df?: number
  dr?: number
  ft?: number
  homelink_nearby?: boolean
  is_user_present?: boolean
  last_autopark_error?: string
  locked?: boolean

  // media_state?: {
  remote_control_enabled?: boolean

  notifications_supported?: boolean
  odometer: number
  parsed_calendar_supported?: boolean
  pf?: number
  pr?: number
  remote_start?: boolean
  remote_start_enabled?: boolean
  remote_start_supported?: boolean
  rt?: number
  sentry_mode?: boolean
  sentry_mode_available?: boolean

  // software_update?: {
  download_perc?: number
  install_perc?: number
  expected_duration_sec?: number
  status?: string
  version?: string

  // speed_limit_mode?: {
  active?: boolean
  current_limit_mph?: number
  max_limit_mph?: number
  min_limit_mph?: number
  pin_code_set?: boolean

  sun_roof_percent_open?: number
  sun_roof_state?: string
  valet_mode?: boolean
  valet_pin_needed?: boolean
  vehicle_name: string
}
