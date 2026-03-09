import React from 'react';
import { View } from 'react-native';
import { RotateCw, Check, RefreshCw } from 'lucide-react-native';
import { Button, Text } from '@shared/components/common';
import { AI_GUIDE_LABELS } from '@/shared/constants/aiGuide';

interface ActionButtonsProps {
  onRetake: () => void;
  onSave: () => void;
  onReanalyze: () => void;
  isAnalyzing: boolean;
}

export const ActionButtons = ({ onRetake, onSave, onReanalyze, isAnalyzing }: ActionButtonsProps) => {
  return (
    <View className="absolute bottom-8 left-8 right-8 flex-row justify-around gap-3">
      <Button
        unstyled
        onPress={onRetake}
        className="flex-1 bg-white/20 py-4 rounded-full"
      >
        <View className="items-center">
          <RotateCw size={20} color="#fff" />
          <Text variant="small" color="white" className="mt-1">
            {AI_GUIDE_LABELS.TAKE_AGAIN}
          </Text>
        </View>
      </Button>

      <Button
        unstyled
        onPress={onSave}
        className="flex-1 bg-[#E06B80] py-4 rounded-full"
      >
        <View className="items-center">
          <Check size={22} color="#fff" strokeWidth={3} />
          <Text variant="small" color="white" className="mt-1">
            {AI_GUIDE_LABELS.SAVE}
          </Text>
        </View>
      </Button>

      <Button
        unstyled
        disabled={isAnalyzing}
        onPress={onReanalyze}
        className="flex-1 bg-white/20 py-4 rounded-full"
      >
        <View className="items-center">
          <RefreshCw size={20} color="#fff" />
          <Text variant="small" color="white" className="mt-1">
            {isAnalyzing ? AI_GUIDE_LABELS.ANALYZING : AI_GUIDE_LABELS.ANALYZE}
          </Text>
        </View>
      </Button>

    </View>
  );
};
