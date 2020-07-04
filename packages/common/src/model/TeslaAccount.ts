import { Document, Schema } from 'mongoose'

export interface TeslaAccount {
  _id?: string;
  token_created_at?: number;
  token_expires_in?: number;
  refresh_token?: string;
  access_token?: string;
  email: string;
  username?: string;
  account_status?: string;
  password?: string;
}

export const TeslaAccountSchema = new Schema({
  username: { type: String },
  email: { type: String, required: true },
  token_created_at: { type: Number, required: false },
  token_expires_in: { type: Number, required: false },
  refresh_token: { type: String, required: false },
  access_token: { type: String, required: false },
})

export type TeslaAccountType = TeslaAccount & Document;
