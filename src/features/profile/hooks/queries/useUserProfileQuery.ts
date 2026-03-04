import { useQuery } from '@tanstack/react-query';
import { getUserProfileRequest } from '@features/profile/services/userService';
import { useAuthStore } from '@store/authStore';
import type { UserProfile } from '@features/profile/types/userProfile';

export const useUserProfileQuery = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery<UserProfile>({
    queryKey: ['user-profile', token],
    queryFn: getUserProfileRequest,
    enabled: !!token,
    staleTime: 1000 * 60 * 10,
  });
};
