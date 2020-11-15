import { types } from '@teslapp/common'

export interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  role: types.UserRoles;
}
