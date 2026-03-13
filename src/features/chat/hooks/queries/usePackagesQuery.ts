import { useQuery } from '@tanstack/react-query';
import { getConceptPackages } from '../../services/bookingService';

export const usePackagesQuery = (conceptId: number) => {
  return useQuery({
    queryKey: ['concept-packages', conceptId],
    queryFn: () => getConceptPackages(conceptId),
    enabled: !!conceptId,
  });
};
