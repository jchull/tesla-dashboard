import { Document, Schema } from 'mongoose';
import { SpeedLimitMode } from '@tesla-dashboard/types';

export type SpeedLimitModeType = SpeedLimitMode & Document;

export const SpeedLimitModeSchema = new Schema<SpeedLimitModeType>({
  active: { type: Boolean, required: true },
  current_limit_mph: { type: Number, required: false },
  max_limit_mph: { type: Number, required: false },
  min_limit_mph: { type: Number, required: false },
  pin_code_set: { type: Boolean, required: true },
});
