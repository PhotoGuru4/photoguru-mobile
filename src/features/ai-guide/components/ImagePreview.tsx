import React from 'react';
import { View, Image } from 'react-native';

interface Props {
  imageUri: string | null;
}

export const ImagePreview = ({ imageUri }: Props) => {
  return (
    <View className="flex-1 justify-center items-center">
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ flex: 1, width: '100%' }}
          resizeMode="contain"
        />
      )}
    </View>
  );
};
