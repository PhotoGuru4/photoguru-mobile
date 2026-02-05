import { POST } from '@shared/services/apiService';
import { API_ENDPOINTS } from '@/shared/constants';
import type { LoginResponse, LoginPayload } from '@features/auth/types/login';

export const loginRequest = (
  data: LoginPayload,
): Promise<LoginResponse> => {
  return POST<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
};
