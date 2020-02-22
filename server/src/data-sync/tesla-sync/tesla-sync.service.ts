import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { VehicleData } from '../../model/types/tesla/VehicleData';
import { ChargeSessionType, DriveSessionType, VehicleType } from '../../model';
import { TeslaAccountService } from '../../tesla-account/tesla-account.service';
import { TeslaOwnerService } from '../../tesla-account/tesla-owner/tesla-owner.service';
import { ProductService } from '../../product/product.service';
import { SessionService } from '../../session/session.service';

@Injectable()
export class TeslaSyncService {
  constructor(
    private readonly productService: ProductService,
    private readonly sessionService: SessionService,
    private readonly teslaOwnerService: TeslaOwnerService,
    private readonly teslaAccountService: TeslaAccountService
  ) {}

  async updateVehicleData(vin: string): Promise<any> {
    const product = await this.productService.findByVin(vin);
    if (!product) {
      throw new Error(
        'Invalid state, ensure products exist before updating data!'
      );
    } else {
      const teslaAccounts = await this.teslaAccountService.getTeslaAccounts(
        product.username,
        product._id
      );
      // we should not have more than one result when providing both parameters
      if (teslaAccounts && teslaAccounts.length === 1) {
        const vehicleData = await this.teslaOwnerService.getVehicleData(
          teslaAccounts[0],
          product.id_s
        );

        if (vehicleData) {
          const vehicleStatus = this.findVehicleState(vehicleData);
          console.log(
            `${vehicleData.display_name} is currently ${vehicleStatus}`
          );

          const [activeSession] = await this.sessionService.findRecentSessions(
            product.username,
            vin,
            1
          );
          if (!activeSession) {
            console.log('no recent sessions found');
          } else {
            // TODO: check conditions to decide if we want to save this data or ignore it
            // if (activeSession.end_date) {
            // }
          }

          //
          //   this.appendChargeState(activeChargingSession, vehicleData);
          //
          //
          // vehicle.odometer = vehicleData.vehicle_state.odometer;
          // vehicle.display_name = vehicleData.display_name;
          // vehicle.api_version = vehicleData.api_version;
          // vehicle.color = vehicleData.vehicle_config.exterior_color;
          // vehicle.car_type = vehicleData.vehicle_config.car_type;
          // vehicle.timestamp = vehicleData.vehicle_state.timestamp;
          // vehicle.battery_level = vehicleData.charge_state.battery_level;
          // vehicle.battery_range = vehicleData.charge_state.battery_range;
          // vehicle.charging_state = vehicleData.charge_state.charging_state || 'Disconnected';
          // vehicle.time_to_full_charge = vehicleData.charge_state.time_to_full_charge;
          // vehicle.charge_limit_soc = vehicleData.charge_state.charge_limit_soc;
          // vehicle.state = vehicleStatus;
          // return this.productService.update(vehicle);
        }
      }
    }
  }

  private async appendChargeState(
    session: ChargeSessionType,
    vehicleData: VehicleData
  ): Promise<any> {
    // // @ts-ignore
    // if (!session.last || this.hasChanges(session.last, vehicleData)) {
    //
    //   const state = await this.chargeSessionModel.create({
    //                                            battery_heater_on: vehicleData.charge_state.battery_heater_on || false,
    //                                            battery_level: vehicleData.charge_state.battery_level,
    //                                            battery_range: vehicleData.charge_state.battery_range,
    //                                            charge_current_request: vehicleData.charge_state.charge_current_request,
    //                                            charge_energy_added: vehicleData.charge_state.charge_energy_added,
    //                                            charge_miles_added_ideal: vehicleData.charge_state.charge_miles_added_ideal,
    //                                            charge_miles_added_rated: vehicleData.charge_state.charge_miles_added_rated,
    //                                            charge_port_door_open: vehicleData.charge_state.charge_port_door_open,
    //                                            charge_port_latch: vehicleData.charge_state.charge_port_latch,
    //                                            charge_rate: vehicleData.charge_state.charge_rate,
    //                                            charger_actual_current: vehicleData.charge_state.charger_actual_current,
    //                                            charger_power: vehicleData.charge_state.charger_power || 0,
    //                                            charger_voltage: vehicleData.charge_state.charger_voltage || 0,
    //                                            charging_state: vehicleData.charge_state.charging_state || 'Disconnected',
    //                                            est_battery_range: vehicleData.charge_state.est_battery_range,
    //                                            ideal_battery_range: vehicleData.charge_state.ideal_battery_range,
    //                                            time_to_full_charge: vehicleData.charge_state.time_to_full_charge || 0,
    //                                            timestamp: vehicleData.charge_state.timestamp,
    //                                            driver_temp_setting: vehicleData.climate_state.driver_temp_setting,
    //                                            fan_status: vehicleData.climate_state.fan_status || 0,
    //                                            inside_temp: vehicleData.climate_state.inside_temp,
    //                                            is_auto_conditioning_on: vehicleData.climate_state.is_auto_conditioning_on,
    //                                            is_climate_on: vehicleData.climate_state.is_climate_on || undefined,
    //                                            is_front_defroster_on: vehicleData.climate_state.is_front_defroster_on || undefined,
    //                                            is_preconditioning: vehicleData.climate_state.is_preconditioning || undefined,
    //                                            is_rear_defroster_on: vehicleData.climate_state.is_rear_defroster_on || undefined,
    //                                            outside_temp: vehicleData.climate_state.outside_temp,
    //                                            passenger_temp_setting: vehicleData.climate_state.passenger_temp_setting,
    //                                            seat_heater_left: vehicleData.climate_state.seat_heater_left,
    //                                            seat_heater_rear_center: vehicleData.climate_state.seat_heater_rear_center,
    //                                            seat_heater_rear_left: vehicleData.climate_state.seat_heater_rear_left,
    //                                            seat_heater_rear_right: vehicleData.climate_state.seat_heater_rear_right,
    //                                            seat_heater_right: vehicleData.climate_state.seat_heater_right,
    //                                            side_mirror_heaters: vehicleData.climate_state.side_mirror_heaters,
    //                                            smart_preconditioning: vehicleData.climate_state.smart_preconditioning,
    //                                            is_user_present: vehicleData.vehicle_state.is_user_present || undefined,
    //                                            chargeSession: session
    //                                          });
    //
    //   if (!session.first) {
    //     session.first = state;
    //   }
    //   session.last = state;
    //   session.trip_charging = session.trip_charging || vehicleData.charge_state.trip_charging || false;
    //   session.end_date = state.timestamp;
    //   session.charge_current_request_max = vehicleData.charge_state.charge_current_request_max;
    //   session.charge_enable_request = vehicleData.charge_state.charge_enable_request;
    //   session.charge_limit_soc = vehicleData.charge_state.charge_limit_soc;
    //   session.charge_limit_soc_max = vehicleData.charge_state.charge_limit_soc_max;
    //   session.charge_limit_soc_min = vehicleData.charge_state.charge_limit_soc_min;
    //   session.charge_limit_soc_std = vehicleData.charge_state.charge_limit_soc_std;
    //   session.charge_port_cold_weather_mode = vehicleData.charge_state.charge_port_cold_weather_mode;
    //   session.charge_to_max_range = session.charge_to_max_range || vehicleData.charge_state.charge_to_max_range || false;
    //   session.charger_phases = vehicleData.charge_state.charger_phases;
    //   session.charger_pilot_current = vehicleData.charge_state.charger_pilot_current;
    //   session.conn_charge_cable = vehicleData.charge_state.conn_charge_cable;
    //   session.fast_charger_brand = vehicleData.charge_state.fast_charger_brand;
    //   session.fast_charger_present = vehicleData.charge_state.fast_charger_present || false;
    //   session.fast_charger_type = vehicleData.charge_state.fast_charger_type;
    //   session.managed_charging_active = vehicleData.charge_state.managed_charging_active;
    //   session.managed_charging_start_time = vehicleData.charge_state.managed_charging_start_time;
    //   session.managed_charging_user_canceled = vehicleData.charge_state.managed_charging_user_canceled;
    //   session.max_range_charge_counter = vehicleData.charge_state.max_range_charge_counter;
    //   session.scheduled_charging_pending = vehicleData.charge_state.scheduled_charging_pending;
    //   session.scheduled_charging_start_time = vehicleData.charge_state.scheduled_charging_start_time;
    //
    //   await ChargeSession.updateOne({_id: session._id}, session);
    // } else {
    //   console.log('No Changes detected');
    // }
  }

  private async appendDriveState(
    session: DriveSessionType,
    vehicleData: VehicleData
  ): Promise<any> {
    // const vin = vehicleData.vin;
    // const state = await DriveState.create({
    //                                         gps_as_of: vehicleData.drive_state.gps_as_of,
    //                                         heading: vehicleData.drive_state.heading,
    //                                         latitude: vehicleData.drive_state.latitude,
    //                                         longitude: vehicleData.drive_state.longitude,
    //                                         power: vehicleData.drive_state.power,
    //                                         shift_state: vehicleData.drive_state.shift_state,
    //                                         speed: vehicleData.drive_state.speed,
    //                                         odometer: vehicleData.vehicle_state.odometer,
    //                                         timestamp: vehicleData.drive_state.timestamp,
    //                                         battery_heater: vehicleData.climate_state.battery_heater,
    //                                         battery_level: vehicleData.charge_state.battery_level,
    //                                         battery_range: vehicleData.charge_state.battery_range,
    //                                         est_battery_range: vehicleData.charge_state.est_battery_range,
    //                                         ideal_battery_range: vehicleData.charge_state.ideal_battery_range,
    //                                         usable_battery_level: vehicleData.charge_state.usable_battery_level,
    //                                         driver_temp_setting: vehicleData.climate_state.driver_temp_setting,
    //                                         fan_status: vehicleData.climate_state.fan_status,
    //                                         inside_temp: vehicleData.climate_state.inside_temp,
    //                                         is_auto_conditioning_on: vehicleData.climate_state.is_auto_conditioning_on,
    //                                         is_climate_on: vehicleData.climate_state.is_climate_on,
    //                                         is_front_defroster_on: vehicleData.climate_state.is_front_defroster_on,
    //                                         is_preconditioning: vehicleData.climate_state.is_preconditioning,
    //                                         is_rear_defroster_on: vehicleData.climate_state.is_rear_defroster_on,
    //                                         outside_temp: vehicleData.climate_state.outside_temp,
    //                                         passenger_temp_setting: vehicleData.climate_state.passenger_temp_setting,
    //                                         seat_heater_left: vehicleData.climate_state.seat_heater_left,
    //                                         seat_heater_rear_center: vehicleData.climate_state.seat_heater_rear_center,
    //                                         seat_heater_rear_left: vehicleData.climate_state.seat_heater_rear_left,
    //                                         seat_heater_rear_right: vehicleData.climate_state.seat_heater_rear_right,
    //                                         seat_heater_right: vehicleData.climate_state.seat_heater_right,
    //                                         side_mirror_heaters: vehicleData.climate_state.side_mirror_heaters,
    //                                         smart_preconditioning: vehicleData.climate_state.is_preconditioning,
    //                                         wiper_blade_heater: vehicleData.climate_state.wiper_blade_heater,
    //                                         driveSession: session
    //                                       });
    //
    // if (!session.first) {
    //   session.first = state;
    // }
    // session.last = state;
    // session.end_date = session.last.timestamp;
    // session.distance = session.last.odometer - session.first.odometer;
    //
    // const vehicle = await this.productModel.findOne({vin});
    // if (vehicle) {
    //   vehicle.odometer = state.odometer;
    //   vehicle.display_name = vehicleData.display_name;
    //   vehicle.api_version = vehicleData.api_version;
    //   vehicle.color = vehicleData.vehicle_config.exterior_color;
    //   vehicle.car_type = vehicleData.vehicle_config.car_type;
    //   vehicle.timestamp = state.timestamp;
    //   await this..updateOne({vin}, vehicle);
    // }
    //
    // return this.driveSessionModel.updateOne({_id: session._id}, session);
  }

  private isCharging(vehicleData: VehicleData): boolean {
    return vehicleData.charge_state.charging_state === 'Charging';
  }

  private isDriving(vehicleData: VehicleData): boolean {
    return vehicleData.drive_state.shift_state !== null;
  }

  private findVehicleState(vehicleData: VehicleData): string {
    if (vehicleData.drive_state.shift_state) {
      return 'Driving';
    }
    if (
      vehicleData.charge_state.charging_state &&
      vehicleData.charge_state.charging_state !== 'Disconnected'
    ) {
      return vehicleData.charge_state.charging_state;
    }
    return 'Parked';
  }
}
