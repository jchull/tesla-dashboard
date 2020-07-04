import { Document, Schema } from 'mongoose'

export interface UserPreferences {
  _id?: string;
  username: string;

  displayCurrencyCode: string;
  displayDistanceUnits: 'mi' | 'km';
  displayTempUnits: 'F' | 'C';
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  username: 'default',
  displayDistanceUnits: 'mi',
  displayCurrencyCode: 'USD',
  displayTempUnits: 'F',
}

export const UserPreferencesSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  display_distanceUnits: { type: String },
  display_currencyCode: { type: String },
  display_tempUnits: { type: String },
})

export type UserPreferencesType = UserPreferences & Document;
