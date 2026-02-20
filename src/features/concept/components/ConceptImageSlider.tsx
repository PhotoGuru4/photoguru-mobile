import { DEFAULT_IMAGES } from '@/shared/constants';
import React from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = 260;

interface Props {
  images: string[];
}

const ConceptImageSlider = ({ images }: Props) => {
  if (!images || images.length === 0) return DEFAULT_IMAGES.DEFAULT_CONCEPT;

  return (
    <FlatList
      data={images}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      renderItem={({ item }) => (
        <View
          style={{
            width: width - 32,
            height: IMAGE_HEIGHT,
            marginRight: 16,
            borderRadius: 16,
            overflow: 'hidden',
            backgroundColor: '#F3F4F6',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={{ uri: item }}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="contain"
          />
        </View>
      )}
    />
  );
};

export default ConceptImageSlider;
