import { ROLES } from '@shared/constants/role';
export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
  role: typeof ROLES.CUSTOMER | typeof ROLES.PHOTOGRAPHER | string;
  province: string;
  ward: string;
}
