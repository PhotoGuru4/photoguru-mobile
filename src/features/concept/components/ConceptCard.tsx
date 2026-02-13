import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from '@shared/components/common';
import type { Concept } from '@features/concept/types/concept';
import { DEFAULT_IMAGES } from '@shared/constants';

interface Props {
  item: Concept;
}

const FALLBACK_RATIO = 3 / 4;

const ConceptCard = ({ item }: Props) => {
  const [imgSrc, setImgSrc] = useState(
    item.thumbnailUrl || DEFAULT_IMAGES.DEFAULT_CONCEPT,
  );
  const [aspectRatio, setAspectRatio] =
    useState(FALLBACK_RATIO);

  useEffect(() => {
    if (!imgSrc) return;

    Image.getSize(
      imgSrc,
      (width, height) => {
        if (width && height) {
          setAspectRatio(width / height);
        }
      },
      () => {
        setAspectRatio(FALLBACK_RATIO);
      },
    );
  }, [imgSrc]);

  return (
    <TouchableOpacity className="mb-4 rounded-2xl overflow-hidden bg-gray-100">
      <View style={{ aspectRatio }}>
        <Image
          source={{ uri: imgSrc }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
          onError={() =>
            setImgSrc(DEFAULT_IMAGES.DEFAULT_CONCEPT)
          }
        />

        <View className="absolute top-3 left-3 bg-black/40 px-3 py-1 rounded-full">
          <Text className="text-white text-sm font-semibold"
            lineClamp={1}
            style={{ maxWidth: 100 }}>
            {item.categoryName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ConceptCard;
