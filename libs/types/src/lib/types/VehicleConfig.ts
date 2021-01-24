import { VehicleConfig as TeslaVehicleConfig } from '@tesla-dashboard/tesla-types';
import { Entity } from './Entity';

export type VehicleConfig = TeslaVehicleConfig & Entity;
