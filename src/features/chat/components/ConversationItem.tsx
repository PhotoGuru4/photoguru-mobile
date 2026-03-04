import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DEFAULT_IMAGES } from '@shared/constants';
import { getSafeImage } from '@shared/utils/safeImage';

interface Props {
  item: {
    id: string;
    name: string;
    avatar?: string;
    lastMessage: string;
    time: string;
    hasUnread?: boolean;
  };
  onPress: () => void;
}

const ConversationItem = ({ item, onPress }: Props) => {
  const [avatarError, setAvatarError] = useState(false);

  const avatarUri = avatarError
    ? DEFAULT_IMAGES.DEFAULT_AVATAR
    : getSafeImage(
      item.avatar,
      DEFAULT_IMAGES.DEFAULT_AVATAR,
    );

  const hasUnread = item.hasUnread === true;

  console.log('hasUnread:', item.hasUnread);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`flex-row items-center px-4 py-4 border-b border-gray-100 ${
        hasUnread ? 'bg-pink-50' : 'bg-white'
      }`}
    >
      <Image
        source={{ uri: avatarUri }}
        onError={() => setAvatarError(true)}
        className="w-12 h-12 rounded-full mr-3"
      />

      <View className="flex-1 justify-center">
        <Text
          className={`text-sm ${
            hasUnread
              ? 'font-bold text-black'
              : 'font-semibold text-gray-900'
          }`}
        >
          {item.name}
        </Text>

        <Text
          numberOfLines={1}
          className={`text-xs mt-1 ${
            hasUnread
              ? 'text-black font-semibold'
              : 'text-gray-500'
          }`}
        >
          {item.lastMessage}
        </Text>
      </View>

      <View className="ml-2 items-end">
        <Text
          className="text-xs"
        >
          {item.time}
        </Text>

        {hasUnread && (
          <View className="mt-1 w-2 h-2 bg-pink-400 rounded-full" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ConversationItem;
