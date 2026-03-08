import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { Wand2 } from 'lucide-react-native';

interface EnhanceButtonProps {
  onEnhance: () => void;
  disabled: boolean;
  isEditing: boolean;
}

export const EnhanceButton = ({ onEnhance, disabled, isEditing }: EnhanceButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onEnhance}
      disabled={disabled}
      style={{
        position: 'absolute',
        bottom: 180,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: disabled ? '#888' : '#E06B80',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isEditing ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Wand2 size={24} color="#fff" />
      )}
    </TouchableOpacity>
  );
};
