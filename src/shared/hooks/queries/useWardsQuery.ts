import { useQuery } from '@tanstack/react-query';
import { getWardsByProvinceRequest } from '@shared/services/locationService';

export const useWardsQuery = (provinceCode?: number) =>
  useQuery({
    queryKey: ['wards', provinceCode],
    queryFn: () => getWardsByProvinceRequest(provinceCode!),
    enabled: !!provinceCode,
    staleTime: 1000 * 60 * 30,
  });
