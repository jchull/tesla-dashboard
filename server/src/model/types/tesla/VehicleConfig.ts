export interface VehicleConfig {
  id_s: string;
  can_accept_navigation_requests: boolean;
  can_actuate_trunks: boolean;
  car_special_type: string;
  car_type: string;
  charge_port_type: string;
  eu_vehicle: boolean;
  exterior_color: string;
  has_air_suspension: boolean;
  has_ludicrous_mode: boolean;
  key_version: number;
  motorized_charge_port: boolean;
  plg: boolean;
  rear_seat_heaters: number;
  rear_seat_type: string;
  rhd: boolean;
  roof_color: string;
  seat_type: string;
  spoiler_type: string;
  sun_roof_installed: boolean;
  third_row_seats: string;
  timestamp: number;
  use_range_badging: boolean;
  wheel_type: string;
}
