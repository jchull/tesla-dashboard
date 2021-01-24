import { Vehicle as TeslaVehicle } from '@tesla-dashboard/tesla-types';
import { Entity } from './Entity';

export enum ActivityType {
  CHARGING = 'CHARGING',
  DRIVING = 'DRIVING',
  PARKED = 'PARKED',
}

export type Vehicle = TeslaVehicle & Entity;
