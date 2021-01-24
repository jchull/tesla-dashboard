import { Document, Schema } from 'mongoose';
import { UserPreferences } from '@tesla-dashboard/types';

export type UserPreferencesType = UserPreferences & Document;

export const UserPreferencesSchema = new Schema<UserPreferencesType>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  display_distanceUnits: { type: String },
  display_currencyCode: { type: String },
  display_tempUnits: { type: String },
});

export const DEFAULT_PREFERENCES: UserPreferences = {
  _id: 'default',
  username: 'default',
  displayDistanceUnits: 'mi',
  displayCurrencyCode: 'USD',
  displayTempUnits: 'F',
};
