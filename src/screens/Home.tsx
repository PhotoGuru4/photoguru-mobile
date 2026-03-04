import React, { useState } from 'react';
import {
  ScrollView,
  Image,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {
  Text,
  SearchBar,
  LoadMoreDots,
} from '@shared/components/common';
import ConceptMasonry from '@features/concept/components/ConceptMasonry';
import FilterSection from '@features/concept/components/FilterSection';
import { useHomeConcepts } from '@features/concept/hooks/useHomeConcepts';
import { useUser } from '@features/profile/hooks/useUser';
import { DEFAULT_IMAGES } from '@shared/constants';
import { getSafeImage } from '@shared/utils/safeImage';

const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: NativeScrollEvent) => {
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - 40
  );
};

const Home = () => {
  const { avatar, displayName } = useUser();
  const [avatarError, setAvatarError] = useState(false);

  const {
    keyword,
    setKeyword,
    filters,
    setFilters,
    concepts,
    isSearchMode,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useHomeConcepts();

  const avatarUri = avatarError
    ? DEFAULT_IMAGES.DEFAULT_AVATAR
    : getSafeImage(
      avatar,
      DEFAULT_IMAGES.DEFAULT_AVATAR,
    );

  const showEmpty =
    !isLoading && concepts.length === 0;

  return (
    <ScrollView
      className="flex-1 bg-white"
      scrollEventThrottle={16}
      onScroll={({
        nativeEvent,
      }: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (
          isCloseToBottom(nativeEvent) &&
          hasNextPage &&
          !isFetching
        ) {
          fetchNextPage();
        }
      }}
    >
      <View className="px-4 py-6">
        <View className="flex-row items-center gap-3">
          <Image
            source={{ uri: avatarUri }}
            className="w-14 h-14 rounded-full"
            onError={() => setAvatarError(true)}
          />

          <View>
            <Text className="text-lg font-bold">
              Hi {displayName}
            </Text>
            <Text className="text-sm text-gray-500">
              You are looking for style?
            </Text>
          </View>
        </View>
      </View>

      <View className="px-4 mb-3">
        <SearchBar
          value={keyword ?? ''}
          onChange={(text) =>
            setKeyword(text || undefined)
          }
          placeholder="Search a style, location..."
          size="sm"
        />
      </View>

      <FilterSection
        value={filters}
        onChange={setFilters}
      />

      <View className="px-4 mb-3">
        <Text className="text-lg font-semibold">
          {isSearchMode
            ? 'Search results'
            : 'Recommended'}
        </Text>
      </View>

      {showEmpty && (
        <View className="py-20 items-center">
          <Text className="text-gray-400 text-base">
            Concept not found
          </Text>
        </View>
      )}

      {!showEmpty && (
        <ConceptMasonry data={concepts} />
      )}

      {isFetching && <LoadMoreDots />}

      <View className="h-10" />
    </ScrollView>
  );
};

export default Home;
