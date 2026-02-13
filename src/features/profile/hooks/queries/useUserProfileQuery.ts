import { useQuery } from '@tanstack/react-query';
import { getUserProfileRequest } from '@features/profile/services/userService';
import type { UserProfile } from '@features/profile/types/user';

export const useUserProfileQuery = () => {
  return useQuery<UserProfile>({
    queryKey: ['user-profile'],
    queryFn: getUserProfileRequest,
    staleTime: 1000 * 60 * 10,
  });
};
