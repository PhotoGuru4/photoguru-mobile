import { useQuery } from '@tanstack/react-query';
import { getProvincesRequest } from '@shared/services/locationService';

export const useProvincesQuery = () =>
  useQuery({
    queryKey: ['provinces'],
    queryFn: getProvincesRequest,
    staleTime: 1000 * 60 * 60,
  });
