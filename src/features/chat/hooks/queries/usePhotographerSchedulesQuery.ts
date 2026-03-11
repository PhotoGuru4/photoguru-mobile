import { useQuery } from '@tanstack/react-query';
import { getPhotographerSchedules } from '../../services/bookingService';

export const usePhotographerSchedulesQuery = (
  photographerId: number,
  date: string,
) => {
  return useQuery({
    queryKey: ['photographer-schedules', photographerId, date],
    queryFn: () => getPhotographerSchedules(photographerId, date, 0),
    enabled: !!photographerId && !!date,
    retry: 1,
  });
};
