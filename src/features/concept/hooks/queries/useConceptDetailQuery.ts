import { useQuery } from '@tanstack/react-query';
import { getConceptDetailRequest } from '@features/concept/services/conceptService';
import type { ConceptDetail } from '@features/concept/types/concept';

export const useConceptDetailQuery = (id?: number) => {
  return useQuery<ConceptDetail>({
    queryKey: ['conceptDetail', id],
    queryFn: () => getConceptDetailRequest(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
