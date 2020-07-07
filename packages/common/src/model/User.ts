import { Document, Schema } from 'mongoose'

export enum UserRoles {
  Standard,
  Admin,
}

type TUserRoles = UserRoles.Standard | UserRoles.Admin

export interface User {
  _id?: string
  sub?: string
  username: string
  email?: string
  role?: TUserRoles
  password?: string
  pwdHash?: string
}

export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: { type: Number, required: true, unique: false },
  pwdHash: { type: String, required: true },
  teslaAccounts: [{ type: Schema.Types.ObjectId, ref: 'TeslaAccount' }],
  vehicles: [{ type: Schema.Types.ObjectId, ref: 'Vehicle' }],
})

export type UserType = User & Document
