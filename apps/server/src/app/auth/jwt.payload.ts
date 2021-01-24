import { UserRoles } from '@tesla-dashboard/types';

export interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  role: UserRoles;
}
