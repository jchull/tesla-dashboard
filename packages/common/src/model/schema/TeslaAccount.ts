import { Document, Schema } from 'mongoose'
import { TeslaAccount } from '../types'


export const TeslaAccountSchema = new Schema({
  username: { type: String },
  email: { type: String, required: true },
  token_created_at: { type: Number, required: false },
  token_expires_in: { type: Number, required: false },
  refresh_token: { type: String, required: false },
  access_token: { type: String, required: false }
})

export type TeslaAccountType = TeslaAccount & Document
