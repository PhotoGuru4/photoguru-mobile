import { useState, useMemo } from 'react';
import { useRecommendedConceptsQuery } from '@features/concept/hooks/queries/useRecommendedConceptsQuery';
import { useSearchConceptsQuery } from '@features/concept/hooks/queries/useSearchConceptsQuery';
import { ConceptFilters } from '@features/concept/types/filter';

export const useHomeConcepts = () => {
  const [keyword, setKeyword] = useState<string | undefined>();
  const [filters, setFilters] = useState<ConceptFilters>({});

  const isSearchMode = Boolean(
    keyword ||
      filters.province ||
      filters.ward ||
      filters.sortByPrice,
  );

  const recommendedQuery = useRecommendedConceptsQuery();

  const searchQuery = useSearchConceptsQuery({
    keyword,
    province: filters.province,
    ward: filters.ward,
    sortByPrice: filters.sortByPrice,
  });

  const activeQuery = isSearchMode
    ? searchQuery
    : recommendedQuery;

  const concepts = useMemo(
    () =>
      activeQuery.data?.pages.flatMap(
        (page) => page.items,
      ) ?? [],
    [activeQuery.data],
  );

  return {
    keyword,
    filters,

    setKeyword,
    setFilters,

    concepts,
    isSearchMode,

    isLoading: activeQuery.isLoading,
    isFetching: activeQuery.isFetching,
    hasNextPage: activeQuery.hasNextPage,
    fetchNextPage: activeQuery.fetchNextPage,
  };
};
