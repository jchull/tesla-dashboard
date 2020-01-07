import {Document, model, Schema} from 'mongoose';
import {UserPreferences as IUserPreferences} from './types/UserPreferences';


const UserPreferencesSchema: Schema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  display_distanceUnits: {type: String},
  display_currencyCode: {type: String},
  display_tempUnits: {type: String}
});

export const UserPreferences = model<IUserPreferences & Document>('UserPreferences', UserPreferencesSchema);
export type UserPreferencesType = IUserPreferences & Document;


