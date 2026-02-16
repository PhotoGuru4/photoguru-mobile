import { API_ENDPOINTS } from '@shared/constants';
import { POST } from '@shared/services/apiService';
import type { RegisterPayload } from '@features/auth/types/register';

export const registerRequest = (data: RegisterPayload) => {
  return POST(API_ENDPOINTS.AUTH.REGISTER, data);
};
