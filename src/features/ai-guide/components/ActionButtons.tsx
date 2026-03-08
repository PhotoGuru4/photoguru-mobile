import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RotateCw, Check, RefreshCw } from 'lucide-react-native';

interface ActionButtonsProps {
  onRetake: () => void;
  onSave: () => void;
  onReanalyze: () => void;
  isAnalyzing: boolean;
}

export const ActionButtons = ({ onRetake, onSave, onReanalyze, isAnalyzing }: ActionButtonsProps) => {
  return (
    <View className="absolute bottom-8 left-8 right-8 flex-row justify-around gap-3">
      <TouchableOpacity
        onPress={onRetake}
        className="flex-1 bg-white/20 py-4 rounded-full items-center"
      >
        <RotateCw size={20} color="#fff" />
        <Text className="text-xs text-white font-semibold mt-1">Take again</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onSave}
        className="flex-1 bg-[#E06B80] py-4 rounded-full items-center"
      >
        <Check size={22} color="#fff" strokeWidth={3} />
        <Text className="text-xs text-white font-semibold mt-1">Save</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onReanalyze}
        disabled={isAnalyzing}
        className="flex-1 bg-white/20 py-4 rounded-full items-center"
      >
        <RefreshCw size={20} color="#fff" />
        <Text className="text-xs text-white font-semibold mt-1">
          {isAnalyzing ? 'Analyzing...' : 'Analyze'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
