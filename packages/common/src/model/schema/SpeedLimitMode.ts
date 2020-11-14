import { Document, Schema } from 'mongoose'
import { SpeedLimitMode } from '../types'


export const SpeedLimitModeSchema = new Schema<SpeedLimitMode>({
  active: { type: Boolean, required: true },
  current_limit_mph: { type: Number, required: false },
  max_limit_mph: { type: Number, required: false },
  min_limit_mph: { type: Number, required: false },
  pin_code_set: { type: Boolean, required: true }
})

export type SpeedLimitModeType = SpeedLimitMode & Document
