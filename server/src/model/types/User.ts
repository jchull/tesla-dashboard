export enum UserRoles {
  Standard,
  Admin,
}

type TUserRoles =
    UserRoles.Standard |
    UserRoles.Admin;


export interface User {
  _id?: string;
  username: string;
  email: string;
  role?: TUserRoles;
  password?: string;
  pwdHash?: string;
}
