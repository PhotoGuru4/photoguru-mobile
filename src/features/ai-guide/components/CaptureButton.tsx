import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';

interface CaptureButtonProps {
  onCapture: () => void;
  isAnalyzing: boolean;
}

export const CaptureButton = ({ onCapture, isAnalyzing }: CaptureButtonProps) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 items-center pb-10">
      <TouchableOpacity
        onPress={onCapture}
        disabled={isAnalyzing}
        className="w-20 h-20 rounded-full bg-white items-center justify-center"
      >
        {isAnalyzing ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <View className="w-16 h-16 rounded-full bg-gray-100" />
        )}
      </TouchableOpacity>
    </View>
  );
};
