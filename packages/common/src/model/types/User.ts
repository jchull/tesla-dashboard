export enum UserRoles {
  Standard,
  Admin,
}

export type TUserRoles = UserRoles.Standard | UserRoles.Admin

export interface User {
  sub?: string
  username: string
  email?: string
  role?: TUserRoles
  password?: string
  pwdHash?: string
}
