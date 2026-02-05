import { ROLES } from '@shared/constants/role';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginUser {
  id: number;
  email: string;
  role: typeof ROLES.CUSTOMER | typeof ROLES.PHOTOGRAPHER | string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    user: LoginUser;
}
