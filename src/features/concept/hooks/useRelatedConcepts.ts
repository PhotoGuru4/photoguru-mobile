import { useMemo } from 'react';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';

import { HomeStackParamList } from '@navigation/HomeStackNavigator';
import { useRelatedConceptDetailQuery } from '@features/concept/hooks/queries/useRelatedConceptDetailQuery';

type ConceptDetailRouteProp = RouteProp<
  HomeStackParamList,
  'ConceptDetail'
>;

export const useRelatedConcepts = () => {
  const route = useRoute<ConceptDetailRouteProp>();
  const conceptId = route.params?.conceptId;

  const query = useRelatedConceptDetailQuery(conceptId);

  const relatedConcepts = useMemo(
    () =>
      query.data?.pages.flatMap(
        (page) => page.items,
      ) ?? [],
    [query.data],
  );

  return {
    relatedConcepts,

    isLoading: query.isLoading,
    isFetching: query.isFetching,

    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
  };
};
