import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from '@shared/components/common';
import { Star, MapPin, MessageCircle } from 'lucide-react-native';
import { DEFAULT_IMAGES } from '@shared/constants';

interface Props {
  photographer: {
    id: number;
    fullName: string;
    avatarUrl: string;
    ratingAvg: number;
    province: string;
  };
}

const PhotographerCard = ({ photographer }: Props) => {
  return (
    <View className="flex-row items-center justify-between mb-4">

      <View className="flex-row items-center gap-3">
        <Image
          source={{ uri: photographer.avatarUrl || DEFAULT_IMAGES.DEFAULT_AVATAR }}
          className="w-12 h-12 rounded-full"
        />

        <View>
          <Text className="font-semibold">
            {photographer.fullName || 'No name available'}
          </Text>

          <View className="flex-row items-center gap-1 mt-1">
            <Star size={14} color="#F59E0B" />
            <Text className="text-sm text-gray-600">
              {photographer.ratingAvg || 0}
            </Text>
          </View>

          <View className="flex-row items-center gap-1">
            <MapPin size={14} color="#6B7280" />
            <Text className="text-sm text-gray-500">
              {photographer.province || 'No province available'}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity className="bg-pink-500 px-4 py-2 rounded-full flex-row items-center gap-1">
        <MessageCircle size={16} color="#fff" />
        <Text className="text-white font-medium">
          Chat
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhotographerCard;
