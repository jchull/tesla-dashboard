import { Document, Schema } from 'mongoose'
import { UserPreferences } from '../types'


export const DEFAULT_PREFERENCES: UserPreferences = {
  _id: 'default',
  username: 'default',
  displayDistanceUnits: 'mi',
  displayCurrencyCode: 'USD',
  displayTempUnits: 'F'
}

export const UserPreferencesSchema = new Schema<UserPreferences>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  display_distanceUnits: { type: String },
  display_currencyCode: { type: String },
  display_tempUnits: { type: String }
})

export type UserPreferencesType = UserPreferences & Document
