import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from '@shared/components/common';
import { Star, MapPin, MessageCircle } from 'lucide-react-native';
import { DEFAULT_IMAGES } from '@shared/constants';
import { getSafeImage } from '@shared/utils/safeImage';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '@navigation/TabNavigator';
import { useChatMessages } from '@features/chat/hooks/useChatMessages';

interface Props {
  photographer: {
    id: number;
    fullName: string;
    avatarUrl: string;
    ratingAvg: number;
    province: string;
  };
  conceptId: number;
  currentUserId: number;
}

type NavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'HomeTab'
>;

const PhotographerCard = ({
  photographer,
  conceptId,
  currentUserId,
}: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const { createRoomAndSendConcept, isCreating } =
    useChatMessages();

  const [avatarError, setAvatarError] = useState(false);

  const avatarUri = avatarError
    ? DEFAULT_IMAGES.DEFAULT_AVATAR
    : getSafeImage(
      photographer.avatarUrl,
      DEFAULT_IMAGES.DEFAULT_AVATAR,
    );

  const handleChat = async () => {
    try {
      const roomId =
        await createRoomAndSendConcept(
          photographer.id,
          conceptId,
          currentUserId,
        );

      navigation.navigate('MessagesTab', {
        screen: 'ChatDetail',
        params: { conversationId: roomId },
      });
    } catch (error) {
      console.log('Chat error:', error);
    }
  };

  return (
    <View className="flex-row items-center justify-between mb-4">
      <View className="flex-row items-center gap-3">
        <Image
          source={{ uri: avatarUri }}
          className="w-12 h-12 rounded-full"
          onError={() => setAvatarError(true)}
        />

        <View>
          <Text className="font-semibold">
            {photographer.fullName}
          </Text>

          <View className="flex-row items-center gap-1 mt-1">
            <Star size={14} color="#F59E0B" />
            <Text className="text-sm text-gray-600">
              {photographer.ratingAvg}
            </Text>
          </View>

          <View className="flex-row items-center gap-1">
            <MapPin size={14} color="#6B7280" />
            <Text className="text-sm text-gray-500">
              {photographer.province}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleChat}
        disabled={isCreating}
        className="bg-pink-500 px-4 py-2 rounded-full flex-row items-center gap-1"
      >
        <MessageCircle size={16} color="#fff" />
        <Text className="text-white font-medium">
          {isCreating ? 'Loading...' : 'Chat'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhotographerCard;
