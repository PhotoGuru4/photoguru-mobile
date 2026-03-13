import React, { useCallback, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { formatPriceRange } from '@shared/utils/formatPriceRange';
import { getSafeImage } from '@shared/utils/safeImage';
import { Button, Text } from '@shared/components/common';
import type { ConceptChatCard } from '@features/chat/types/conceptCard';
import type { MainTabParamList } from '@navigation/TabNavigator';
import { DEFAULT_IMAGES } from '@shared/constants';

interface Props {
  concept: ConceptChatCard;
  roomId: string;
}

type NavigationProp = BottomTabNavigationProp<MainTabParamList>;

const ConceptMessageCard = ({ concept, roomId }: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const [imageError, setImageError] = useState(false);

  const handleNavigate = useCallback(() => {
    navigation.navigate('HomeTab', {
      screen: 'ConceptDetail',
      params: { conceptId: concept.id },
    });
  }, [navigation, concept.id]);

  const handleBookNow = useCallback(() => {
    navigation.navigate('MessagesTab', {
      screen: 'SelectPackage',
      params: {
        conceptId: concept.id,
        photographerId: concept.photographerId,
        conceptName: concept.name,
        roomId,
      },
    });
  }, [navigation, concept.id, concept.photographerId, concept.name, roomId]);

  const imageUri = imageError
    ? DEFAULT_IMAGES.DEFAULT_SLIDER_IMAGE
    : getSafeImage(concept.thumbnailUrl, DEFAULT_IMAGES.DEFAULT_SLIDER_IMAGE);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleNavigate}
      className="rounded-lg border border-gray-200 overflow-hidden w-full bg-white gap-2"
    >
      <Image
        source={{ uri: imageUri }}
        onError={() => setImageError(true)}
        className="w-full h-28"
        resizeMode="cover"
      />

      <View className="p-3">
        <Text variant="subtitle">{concept.name}</Text>

        <Text variant="body" lineClamp={2} className="mt-1">
          {concept.description || 'No description available'}
        </Text>

        <Text variant="subtitle" color="pink" className="font-bold mt-2">
          {formatPriceRange(concept.minPrice, concept.maxPrice)}
        </Text>

        <Button
          color="pink"
          variant="solid"
          size="sm"
          className="mt-2"
          onPress={handleBookNow}
        >
          Book now
        </Button>
      </View>
    </TouchableOpacity>
  );
};

export default ConceptMessageCard;
