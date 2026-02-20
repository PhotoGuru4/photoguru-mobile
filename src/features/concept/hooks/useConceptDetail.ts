import { useMemo } from 'react';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';

import { useConceptDetailQuery } from '@features/concept/hooks/queries/useConceptDetailQuery';
import { HomeStackParamList } from '@navigation/HomeStackNavigator';

type ConceptDetailRouteProp = RouteProp<
  HomeStackParamList,
  'ConceptDetail'
>;
export const useConceptDetail = () => {
  const route = useRoute<ConceptDetailRouteProp>();
  const conceptId = route.params?.conceptId;

  const query = useConceptDetailQuery(conceptId);

  const concept = useMemo(
    () => query.data,
    [query.data],
  );

  return {
    concept,

    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,

    refetch: query.refetch,
  };
};
