import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { ChevronsUp } from 'lucide-react-native';

type Props = {
  unreadCount: number;
  onPress: () => void;
};

const UnreadButton = ({ unreadCount, onPress }: Props) => {
  if (unreadCount <= 0) return null;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="absolute right-4 bottom-24 items-center"
    >
      <View className="bg-white w-10 h-10 rounded-full items-center justify-center border border-gray-200">
        <ChevronsUp size={20} color="#4B5563" />
      </View>

      <View className="bg-pink-500 px-2 py-0.5 rounded-full mt-1 min-w-[20px]">
        <Text className="text-white text-xs font-bold text-center">
          {unreadCount > 99 ? '99+' : unreadCount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default UnreadButton;
