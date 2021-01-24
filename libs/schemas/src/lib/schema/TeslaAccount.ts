import { Document, Schema } from 'mongoose'
import { TeslaAccount } from '@tesla-dashboard/types'

export type TeslaAccountType = TeslaAccount & Document

export const TeslaAccountSchema = new Schema<TeslaAccountType>({
  username: { type: String },
  email: { type: String, required: true },
  token_created_at: { type: Number, required: false },
  token_expires_in: { type: Number, required: false },
  refresh_token: { type: String, required: false },
  access_token: { type: String, required: false }
})
