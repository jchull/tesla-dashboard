import { Vehicle as TeslaVehicle } from '../tesla'
import { Entity } from './common'

export enum ActivityType {
  CHARGING = 'CHARGING',
  DRIVING = 'DRIVING',
  PARKED = 'PARKED'
}
export type Vehicle = TeslaVehicle & Entity
