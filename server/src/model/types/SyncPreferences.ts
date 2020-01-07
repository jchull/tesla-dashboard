export interface SyncPreferences {
  _id: string;
  enabled: boolean;
  accountId?: string;
  sleepTriggerSeconds: number;
  chargingMinDurationMinutes: number;
  chargingCostPerKwhHome: number;
  chargingCostPerKwhSupercharging: number;
  chargingMaxGapSeconds: number;
  /**
   * tuple of polling intervals in seconds to use while charging
   * level 1 charging = [0], level 2 = [1], etc
   */
  chargingPollingIntervalsSeconds: [number, number, number];

  drivingPollingIntervalSeconds: number;
  drivingMinDurationMinutes: number;
  drivingMaxGapSeconds: number;
}


export const DEFAULT_SYNC_PREFERENCES: SyncPreferences = {
  _id: 'default',
  enabled: false,
  chargingMaxGapSeconds: 300,
  chargingMinDurationMinutes: 5,
  chargingCostPerKwhHome: 0.12,
  chargingCostPerKwhSupercharging: 0.28,
  chargingPollingIntervalsSeconds: [600, 200, 30],
  drivingMaxGapSeconds: 300,
  drivingPollingIntervalSeconds: 60,
  drivingMinDurationMinutes: 5,
  sleepTriggerSeconds: 300
};
