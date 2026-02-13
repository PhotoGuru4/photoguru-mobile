import { useInfiniteQuery } from '@tanstack/react-query';
import { searchConceptsRequest } from '@features/concept/services/conceptService';
import type { SearchConceptParams } from '@features/concept/services/conceptService';

export const useSearchConceptsQuery = (
  params: SearchConceptParams,
) =>
  useInfiniteQuery({
    queryKey: ['concepts', 'search', params],
    queryFn: ({ pageParam }) =>
      searchConceptsRequest({
        ...params,
        cursor: pageParam,
      }),

    initialPageParam: undefined as string | undefined,

    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage
        ? lastPage.meta.nextCursor
        : undefined,
  });
