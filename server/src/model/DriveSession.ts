import {Document, model, Schema} from 'mongoose';
import {DriveSession as IDriveSession} from './types/DriveSession';

const DriveSessionSchema: Schema = new Schema({
  start_date: {type: Number, required: true},
  end_date: {type: Number, required: true},
  archived: {type: Boolean},
  distance: {type: Number},
  tags: {type: [String]},
  first: {type: Schema.Types.ObjectId, ref: 'DriveState'},
  last: {type: Schema.Types.ObjectId, ref: 'DriveState'},
  vehicle: {type: Schema.Types.ObjectId, ref: 'Vehicle'}
});

export const DriveSession = model<IDriveSession & Document>('DriveSession', DriveSessionSchema);
export type DriveSessionType = IDriveSession & Document;

