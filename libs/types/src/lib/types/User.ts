import { Entity } from './Entity'

export enum UserRoles {
  Standard,
  Admin,
}

export type TUserRoles = UserRoles.Standard | UserRoles.Admin

export interface User extends Entity {
  sub?: string
  username: string
  email?: string
  role?: TUserRoles
  password?: string
  pwdHash?: string
}
