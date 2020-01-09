import { UserRoles } from '../model/User';

export interface JwtPayload {
  sub: string;
  username: string;
  role: UserRoles;
}
