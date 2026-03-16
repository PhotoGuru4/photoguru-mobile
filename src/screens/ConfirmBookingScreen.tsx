import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from '@shared/components/common';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChatStackParamList } from '@navigation/ChatStackNavigator';
import { useCreateBookingMutation } from '@features/chat/hooks/mutations/useCreateBookingMutation';
import { sendBookingMessage } from '@features/chat/services/chatBookingFirebaseService';
import { useAuthStore } from '@store/authStore';
import { formatPrice } from '@shared/utils/formatPrice';
import { formatDate } from '@shared/utils/formatDate';
import { getSafeImage } from '@shared/utils/safeImage';
import { DEFAULT_IMAGES } from '@shared/constants';

import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Check,
} from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<
  ChatStackParamList,
  'ConfirmBooking'
>;

type RoutePropType = RouteProp<ChatStackParamList, 'ConfirmBooking'>;

const ConfirmBookingScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { user } = useAuthStore();

  const {
    conceptId,
    packageId,
    roomId,
    address,

    conceptName,
    conceptThumbnail,

    packageTier,
    packagePrice,
    packageBenefits,
    estimatedDuration,

    bookingDate,
    bookingStart,
    bookingEnd,
  } = route.params;

  const createBookingMutation = useCreateBookingMutation();

  const imageUri = getSafeImage(
    conceptThumbnail,
    DEFAULT_IMAGES.DEFAULT_SLIDER_IMAGE,
  );

  const handleConfirm = async () => {
    if (!user) return;

    const localDate = new Date(`${bookingDate}T${bookingStart}:00`);
    const fullBookingDate = localDate.toISOString();

    try {
      const booking = await createBookingMutation.mutateAsync({
        conceptId,
        packageId,
        bookingDate: fullBookingDate,
        address,
      });

      await sendBookingMessage(roomId, user.id, booking.id, 'PENDING');

      navigation.navigate('ChatDetail', { conversationId: roomId });
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
      <ScrollView className="flex-1 p-4">

        <View className="items-center mb-6">
          <CheckCircle size={40} color="#E06B80" />
          <Text variant="subtitle" className="text-center mt-2">
            Review Your Booking
          </Text>

          <Text variant="caption" color="muted" className="text-center">
            Please confirm the details below
          </Text>
        </View>

        <View className="bg-pink-50 p-4 rounded-tr-xl rounded-tl-xl flex-row items-center gap-3">

          <Image
            source={{ uri: imageUri }}
            className="w-20 h-20 rounded-lg"
            resizeMode="cover"
          />

          <View className="flex-1">
            <Text variant="subtitle" color="pink">
              {conceptName}
            </Text>

            <Text variant="caption" className="capitalize">
              {packageTier?.charAt(0).toUpperCase() + packageTier?.slice(1).toLowerCase()} Package
            </Text>
          </View>
        </View>

        <View className="bg-gray-50 p-4 rounded-br-xl rounded-bl-xl flex flex-col gap-4">

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Calendar size={18} color="#E06B80" />
              <Text variant="caption" color="pink" className="font-bold">
                Date
              </Text>
            </View>

            <Text variant="body">
              {formatDate(bookingDate)}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Clock size={18} color="#E06B80" />
              <Text variant="caption" color="pink" className="font-bold">
                Time
              </Text>
            </View>

            <Text variant="body">
              {bookingStart} - {bookingEnd}
            </Text>
          </View>

          <View className="flex-row items-center justify-between gap-4">
            <View className="flex-row items-center gap-2">
              <MapPin size={18} color="#E06B80" />
              <Text variant="caption" color="pink" className="font-bold">
                Address
              </Text>
            </View>

            <Text lineClamp={1} variant="body" className="flex-1 text-right">
              {address}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <DollarSign size={18} color="#E06B80" />
              <Text variant="caption" color="pink" className="font-bold">
                Price
              </Text>
            </View>

            <Text variant="body" color="pink" className="font-bold">
              {formatPrice(packagePrice)}
            </Text>
          </View>
        </View>

        <View className="mt-4 p-4 bg-white border border-gray-100 rounded-xl">
          <Text variant="caption" color="pink" className="mb-3 font-bold">
            Package Includes
          </Text>

          <View className="gap-2">
            {packageBenefits?.map((benefit: string, index: number) => (
              <View key={index} className="flex-row items-center gap-2">
                <Check size={16} color="#E06B80" />
                <Text lineClamp={1} variant="small">{benefit}</Text>
              </View>
            ))}
          </View>
          {estimatedDuration && (
            <View className="flex-row items-center gap-2">
              <Check size={14} color="#E06B80" />
              <Text lineClamp={1} variant="small">
                {estimatedDuration} minutes photo session
              </Text>
            </View>
          )}
        </View>

        <View className="mt-8 flex-row gap-3">
          <Button
            variant="outline"
            color="gray"
            onPress={() => navigation.goBack()}
            className="flex-1"
          >
            Back
          </Button>

          <Button
            onPress={handleConfirm}
            disabled={createBookingMutation.isPending}
            className="flex-1"
          >
            {createBookingMutation.isPending
              ? 'Processing...'
              : 'Confirm'}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmBookingScreen;
