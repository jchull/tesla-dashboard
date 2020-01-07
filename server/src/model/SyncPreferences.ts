import {Document, model, Schema} from 'mongoose';
import {SyncPreferences as ISyncPreferences} from './types/SyncPreferences';


const SyncPreferencesSchema: Schema = new Schema({
  enabled: {type: Boolean},
  account_id: {type: String},
  sleepTriggerSeconds: {type: Number},
  driving_pollingIntervalSeconds: {type: Number},
  driving_maxGapSeconds: {type: Number},
  driving_minDurationMinutes: {type: Number},
  charging_minDurationMinutes: {type: Number},
  charging_costPerKwhHome: {type: Number},
  charging_costPerKwhSupercharging: {type: Number},
  charging_pollingIntervalsSeconds: {type: [Number, Number, Number]},
  charging_maxGapSeconds: {type: Number},

});

export const SyncPreferences = model<ISyncPreferences & Document>('SyncPreferences', SyncPreferencesSchema);
export type SyncPreferencesType = ISyncPreferences & Document;


