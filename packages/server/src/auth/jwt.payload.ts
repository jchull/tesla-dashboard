import { UserRoles } from '../../../common/src/model/User';

export interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  role: UserRoles;
}
