import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import { Loading, Text } from '@shared/components/common';

import { useConceptDetail } from '@features/concept/hooks/useConceptDetail';
import { useRelatedConcepts } from '@features/concept/hooks/useRelatedConcepts';

import ConceptImageSlider from '@features/concept/components/ConceptImageSlider';
import PhotographerCard from '@features/concept/components/PhotographerCard';
import ConceptInfoCard from '@features/concept/components/ConceptInfoCard';
import ConceptMasonry from '@features/concept/components/ConceptMasonry';
import { LoadMoreDots } from '@shared/components/common/LoadMoreDots';
import { formatPriceRange } from '@shared/utils/formatPriceRange';

const ConceptDetail = () => {
  const { concept, isLoading } = useConceptDetail();

  const {
    relatedConcepts,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useRelatedConcepts();

  if (isLoading || !concept) {
    return <Loading />;
  }

  const imageUrls =
    concept.photos?.map((p) => p.imageUrl) ?? [
      concept.thumbnailUrl,
    ];

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } =
            nativeEvent;

        const isNearBottom =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 100;

        if (isNearBottom && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      }}
    >
      <View className="mt-4">
        <ConceptImageSlider images={imageUrls} />
      </View>

      <View className="px-4 py-4">
        <Text className="text-lg font-semibold text-pink-500 mb-3">
          Price: {formatPriceRange(concept.minPrice, concept.maxPrice)}
        </Text>

        <PhotographerCard photographer={concept.photographer} />

        <ConceptInfoCard concept={concept} />

        <View className="mt-6">
          <Text className="text-lg font-semibold mb-3">
            Related
          </Text>

          <ConceptMasonry data={relatedConcepts} />

          {isFetching && <LoadMoreDots />}
        </View>
      </View>
    </ScrollView>
  );
};

export default ConceptDetail;
