import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Wand2 } from 'lucide-react-native';
import { Button } from '@shared/components/common';

interface EnhanceButtonProps {
  onEnhance: () => void;
  disabled: boolean;
  isEditing: boolean;
}

export const EnhanceButton = ({ onEnhance, disabled, isEditing }: EnhanceButtonProps) => {
  return (
    <Button
      onPress={onEnhance}
      disabled={disabled}
      unstyled
      className={`absolute bottom-[180px] right-5 w-14 h-14 rounded-full items-center justify-center ${
        disabled ? 'bg-gray-400' : 'bg-[#E06B80]'
      }`}
    >
      {isEditing ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Wand2 size={24} color="#fff" />
      )}
    </Button>
  );
};
