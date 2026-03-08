import React from 'react';
import { View, Text } from 'react-native';

interface InstructionBannerProps {
  instruction: string;
}

export const InstructionBanner = ({ instruction }: InstructionBannerProps) => {
  if (instruction === '') return null;

  return (
    <View className="absolute top-10 left-5 right-5 bg-black/80 p-4 rounded-xl">
      <Text className="text-white text-base text-center font-medium">
        {instruction}
      </Text>
    </View>
  );
};
