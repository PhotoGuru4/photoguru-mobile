import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
} from 'react-native';
import { DEFAULT_IMAGES } from '@shared/constants';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = 260;
const ITEM_WIDTH = width - 32;

interface Props {
  images: string[];
}

const ConceptImageSlider = ({ images }: Props) => {
  const flatListRef = useRef<FlatList<string>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errorIndexes, setErrorIndexes] = useState<number[]>([]);

  if (!images || images.length === 0) return null;

  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / ITEM_WIDTH,
    );
    setCurrentIndex(index);
  };

  const handleImageError = (index: number) => {
    setErrorIndexes((prev) => [...prev, index]);
  };

  return (
    <View style={{ height: IMAGE_HEIGHT }}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onMomentumScrollEnd={handleScroll}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item, index }) => (
          <View
            style={{ width: ITEM_WIDTH, height: IMAGE_HEIGHT }}
            className="mr-4 rounded-2xl overflow-hidden bg-gray-100 items-center justify-center"
          >
            <Image
              source={
                errorIndexes.includes(index)
                  ? { uri: DEFAULT_IMAGES.DEFAULT_SLIDER_IMAGE }
                  : { uri: item }
              }
              className="w-full h-full"
              resizeMode="contain"
              onError={() => handleImageError(index)}
            />
          </View>
        )}
      />

      {images.length > 1 && (
        <View className="absolute bottom-3 right-6 bg-black/60 px-3 py-1 rounded-full">
          <Text className="text-white text-xs font-semibold">
            {currentIndex + 1}/{images.length}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ConceptImageSlider;
