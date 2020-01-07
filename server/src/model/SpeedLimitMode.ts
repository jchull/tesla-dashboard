import {Document, model, Schema} from 'mongoose';
import {SpeedLimitMode as ISpeedLimitMode} from './types/tesla/SpeedLimitMode';

const SpeedLimitModeSchema: Schema = new Schema({
  active: {type: Boolean, required: true},
  current_limit_mph: {type: Number, required: false},
  max_limit_mph: {type: Number, required: false},
  min_limit_mph: {type: Number, required: false},
  pin_code_set: {type: Boolean, required: true}
});

export const SpeedLimitMode = model<ISpeedLimitMode & Document>('SpeedLimitMode', SpeedLimitModeSchema);
export type SpeedLimitModeType = ISpeedLimitMode & Document;

