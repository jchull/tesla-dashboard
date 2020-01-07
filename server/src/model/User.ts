import {Document, model, Schema} from 'mongoose';
import {User as IUser} from './types/User';

const UserSchema: Schema = new Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  role: {type: Number, required: true, unique: false},
  pwdHash: {type: String, required: true},
  teslaAccounts: [{type: Schema.Types.ObjectId, ref: 'TeslaAccount'}],
  vehicles: [{type: Schema.Types.ObjectId, ref: 'Vehicle'}]

});

export const User = model<IUser & Document>('User', UserSchema);
export type UserType = IUser & Document;


