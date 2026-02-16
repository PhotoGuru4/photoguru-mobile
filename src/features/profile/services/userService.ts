import { API_ENDPOINTS } from '@shared/constants';
import { GET } from '@shared/services/apiService';
import type { UserProfile } from '@features/profile/types/userProfile';

export const getUserProfileRequest = (): Promise<UserProfile> => {
  return GET<UserProfile>(API_ENDPOINTS.USER.PROFILE);
};
