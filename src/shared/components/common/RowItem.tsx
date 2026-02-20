import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text as RNText,
  LayoutChangeEvent,
} from 'react-native';
import { Text } from '@shared/components/common';

interface Props {
  label: string;
  value?: string | number;
}

export const RowItem = ({ label, value }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  if (!value) return null;

  const isDescription = label === 'Description';

  const LINE_HEIGHT = 20;
  const MAX_HEIGHT = LINE_HEIGHT * 3;

  const handleLayout = (e: LayoutChangeEvent) => {
    if (!isDescription) return;

    const height = e.nativeEvent.layout.height;

    if (height > MAX_HEIGHT && !showToggle) {
      setShowToggle(true);
    }
  };

  return (
    <View className="mb-3 flex-row items-start">
      <View className="w-2 h-2 rounded-full bg-pink-500 mt-2 mr-2" />

      <View className="flex-1">
        {isDescription ? (
          <>
            <Text className="font-semibold text-pink-500 mb-1">
              {label}:
            </Text>

            <RNText
              numberOfLines={expanded ? undefined : 3}
              ellipsizeMode="tail"
              style={{ lineHeight: LINE_HEIGHT }}
            >
              {value}
            </RNText>

            {!showToggle && (
              <RNText
                style={{
                  position: 'absolute',
                  opacity: 0,
                  lineHeight: LINE_HEIGHT,
                }}
                onLayout={handleLayout}
              >
                {value}
              </RNText>
            )}

            {showToggle && (
              <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                <Text className="text-pink-500 text-sm mt-1">
                  {expanded ? 'See less' : 'See more'}
                </Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <Text>
            <Text className="font-semibold text-pink-500">
              {label}:{' '}
            </Text>
            {value}
          </Text>
        )}
      </View>
    </View>
  );

};
