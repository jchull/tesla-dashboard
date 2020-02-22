import { UserRoles } from '@teslapp/common';

export interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  role: UserRoles;
}
