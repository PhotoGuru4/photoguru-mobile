import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DEFAULT_IMAGES } from '@shared/constants';

interface Props {
  item: {
    id: string;
    name: string;
    avatar?: string;
    lastMessage: string;
    time: string;
  };
  onPress: () => void;
}

const ConversationItem = ({ item, onPress }: Props) => {
  const isNewConversation =
    item.lastMessage === 'View concept';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center px-4 py-4 border-b border-gray-100 bg-white"
    >
      <Image
        source={{
          uri:
            item.avatar ||
            DEFAULT_IMAGES.DEFAULT_AVATAR,
        }}
        className="w-12 h-12 rounded-full mr-3"
      />

      <View className="flex-1 justify-center">
        <Text className="text-sm font-semibold text-gray-900">
          {item.name}
        </Text>

        <Text
          numberOfLines={1}
          className={`text-xs mt-1 ${
            isNewConversation
              ? 'text-gray-400 italic'
              : 'text-gray-500'
          }`}
        >
          {item.lastMessage}
        </Text>
      </View>

      <View className="ml-2">
        <Text className="text-xs text-gray-400">
          {item.time}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ConversationItem;
