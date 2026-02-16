import { useUserProfileQuery } from '@features/profile/hooks/queries/useUserProfileQuery';
import { DEFAULT_IMAGES } from '@shared/constants';

export const useUser = () => {
  const { data, isLoading } = useUserProfileQuery();

  return {
    user: data ?? null,
    isLoading,

    avatar:
      data?.avatarUrl ?? DEFAULT_IMAGES.DEFAULT_AVATAR,

    displayName:
      data?.fullName ?? 'Guest',

    location:
      data?.province && data?.ward
        ? `${data.ward}, ${data.province}`
        : null,
  };
};
