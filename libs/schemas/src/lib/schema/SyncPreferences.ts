import { Document, Schema } from 'mongoose';
import { SyncPreferences } from '@tesla-dashboard/types';

export type SyncPreferencesType = SyncPreferences & Document;

export const SyncPreferencesSchema = new Schema<SyncPreferencesType>({
  enabled: { type: Boolean },
  account_id: { type: String },
  sleepTriggerSeconds: { type: Number },
  driving_pollingIntervalSeconds: { type: Number },
  driving_maxGapSeconds: { type: Number },
  driving_minDurationMinutes: { type: Number },
  charging_minDurationMinutes: { type: Number },
  charging_costPerKwhHome: { type: Number },
  charging_costPerKwhSupercharging: { type: Number },
  charging_pollingIntervalsSeconds: { type: [Number, Number, Number] },
  charging_maxGapSeconds: { type: Number },
});

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
  sleepTriggerSeconds: 300,
};
