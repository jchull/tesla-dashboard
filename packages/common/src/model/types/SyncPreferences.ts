import { Entity } from './common'

export interface SyncPreferences extends Entity {
  enabled: boolean
  accountId?: string
  sleepTriggerSeconds: number
  chargingMinDurationMinutes: number
  chargingCostPerKwhHome: number
  chargingCostPerKwhSupercharging: number
  chargingMaxGapSeconds: number
  /**
   * tuple of polling intervals in seconds to use while charging
   * level 1 charging = [0], level 2 = [1], etc
   */
  chargingPollingIntervalsSeconds: [number, number, number]

  drivingPollingIntervalSeconds: number
  drivingMinDurationMinutes: number
  drivingMaxGapSeconds: number
}
