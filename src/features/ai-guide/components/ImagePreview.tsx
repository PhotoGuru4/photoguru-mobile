import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { DEFAULT_IMAGES } from '@shared/constants/image';
import { getSafeImage } from '@shared/utils/safeImage';

interface Props {
  imageUri: string | null;
}

export const ImagePreview = ({ imageUri }: Props) => {
  const [hasError, setHasError] = useState(false);

  const uri = hasError
    ? DEFAULT_IMAGES.DEFAULT_SLIDER_IMAGE
    : getSafeImage(
      imageUri,
      DEFAULT_IMAGES.DEFAULT_SLIDER_IMAGE,
    );

  return (
    <View className="flex-1 justify-center items-center">
      <Image
        source={{ uri }}
        style={{ flex: 1, width: '100%' }}
        resizeMode="contain"
        onError={() => setHasError(true)}
      />
    </View>
  );
};
