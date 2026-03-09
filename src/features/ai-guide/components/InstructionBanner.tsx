import React from 'react';
import { View } from 'react-native';
import { Text } from '@shared/components/common';

interface InstructionBannerProps {
  instruction: string;
}

export const InstructionBanner = ({ instruction }: InstructionBannerProps) => {
  if (!instruction) return null;

  return (
    <View className="absolute top-10 left-5 right-5 bg-black/80 p-4 rounded-xl">
      <Text
        variant="body"
        color="white"
        align="center"
        className="font-medium"
      >
        {instruction}
      </Text>
    </View>
  );
};
