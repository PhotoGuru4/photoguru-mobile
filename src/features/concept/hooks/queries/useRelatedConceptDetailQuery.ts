import { useInfiniteQuery } from '@tanstack/react-query';
import { getRelatedConceptsRequest } from '@features/concept/services/conceptService';

export const useRelatedConceptDetailQuery = (
  conceptId?: number,
) =>
  useInfiniteQuery({
    queryKey: ['concepts', 'related', conceptId],
    queryFn: ({ pageParam }) =>
      getRelatedConceptsRequest(conceptId!, pageParam),
    enabled: !!conceptId,

    initialPageParam: undefined as string | undefined,

    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage
        ? lastPage.meta.nextCursor
        : undefined,
  });
