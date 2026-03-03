import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from '@shared/components/common';
import { DEFAULT_IMAGES } from '@shared/constants';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '@navigation/HomeStackNavigator';
import type { Concept } from '@features/concept/types/concept';

interface Props {
  item: Concept;
}

const FALLBACK_RATIO = 3 / 4;

const ConceptCard = ({ item }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const [aspectRatio, setAspectRatio] = useState(FALLBACK_RATIO);
  const [hasImageError, setHasImageError] = useState(false);
  const [hasAvatarError, setHasAvatarError] = useState(false);

  const thumbnailSource = hasImageError
    ? { uri: DEFAULT_IMAGES.DEFAULT_CONCEPT }
    : {
      uri:
          item.thumbnailUrl || DEFAULT_IMAGES.DEFAULT_CONCEPT,
    };

  const avatarSource = hasAvatarError
    ? { uri: DEFAULT_IMAGES.DEFAULT_AVATAR }
    : {
      uri:
          item.photographerAvatar ||
          DEFAULT_IMAGES.DEFAULT_AVATAR,
    };

  useEffect(() => {
    if (!item.thumbnailUrl) return;

    Image.getSize(
      item.thumbnailUrl,
      (width, height) => {
        if (width && height) {
          setAspectRatio(width / height);
        }
      },
      () => {
        setAspectRatio(FALLBACK_RATIO);
      },
    );
  }, [item.thumbnailUrl]);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.push('ConceptDetail', {
          conceptId: item.id,
        })
      }
      className="mb-4 rounded-2xl overflow-hidden bg-gray-100"
    >
      <View style={{ aspectRatio }}>
        <Image
          source={thumbnailSource}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
          onError={() => setHasImageError(true)}
        />

        <View className="absolute top-3 left-3 bg-black/50 px-3 py-1 rounded-full">
          <Text
            color="white"
            variant="small"
            lineClamp={1}
            className="font-semibold"
            maxWidth={100}
          >
            {item.categoryName}
          </Text>
        </View>

        <View className="absolute bottom-3 left-3 right-3 flex-row items-center bg-black/50 px-3 py-2 rounded-full">
          <Image
            source={avatarSource}
            className="w-7 h-7 rounded-full mr-2"
            onError={() => setHasAvatarError(true)}
          />

          <Text
            color="white"
            variant="caption"
            lineClamp={1}
            className="font-semibold flex-1"
          >
            {item.photographerName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ConceptCard;
