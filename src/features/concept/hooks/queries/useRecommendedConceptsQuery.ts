import { useInfiniteQuery } from '@tanstack/react-query';
import { getRecommendedConceptsRequest } from '@features/concept/services/conceptService';

export const useRecommendedConceptsQuery = () =>
  useInfiniteQuery({
    queryKey: ['concepts', 'recommended'],
    queryFn: ({ pageParam }) =>
      getRecommendedConceptsRequest(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage
        ? lastPage.meta.nextCursor
        : undefined,
  });
