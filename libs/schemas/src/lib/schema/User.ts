import { Document, Schema } from 'mongoose'
import { User } from '@tesla-dashboard/types'

export type UserType = User & Document

export const UserSchema = new Schema<UserType>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: { type: Number, required: true, unique: false },
  pwdHash: { type: String, required: true },
  teslaAccounts: [{ type: Schema.Types.ObjectId, ref: 'TeslaAccount' }],
  vehicles: [{ type: Schema.Types.ObjectId, ref: 'Vehicle' }]
})
