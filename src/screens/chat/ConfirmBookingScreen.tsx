import React from 'react';
import { View, ScrollView } from 'react-native';
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
import { CheckCircle } from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<ChatStackParamList, 'ConfirmBooking'>;
type RoutePropType = RouteProp<ChatStackParamList, 'ConfirmBooking'>;

const ConfirmBookingScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { user } = useAuthStore();
  const {
    conceptId,
    photographerId,
    packageId,
    roomId,
    address,
    conceptName,
    packageTier,
    packagePrice,
    packageDescription,
    estimatedDuration,
    bookingDate,
    bookingTime,
  } = route.params;

  const createBookingMutation = useCreateBookingMutation();

  const handleConfirm = async () => {
    if (!user) return;

    const fullBookingDate = `${bookingDate}T${bookingTime}:00.000Z`;

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
          <CheckCircle size={60} color="#E06B80" />
          <Text variant="subtitle" className="text-center mt-2">Review Your Booking</Text>
          <Text variant="caption" color="muted" className="text-center">Please confirm the details below</Text>
        </View>

        <View className="bg-pink-50 p-4 rounded-xl mb-4">
          <Text variant="subtitle" color="pink">{conceptName}</Text>
          <Text variant="caption" className="capitalize">{packageTier} Package</Text>
        </View>

        <View className="bg-gray-50 p-4 rounded-xl gap-y-3">
          <View className="flex-row justify-between">
            <Text variant="caption" color="muted">Date</Text>
            <Text variant="body" className="font-semibold">{formatDate(bookingDate)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text variant="caption" color="muted">Time</Text>
            <Text variant="body" className="font-semibold">{bookingTime}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text variant="caption" color="muted">Address</Text>
            <Text variant="body" className="font-semibold flex-1 text-right">{address}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text variant="caption" color="muted">Price</Text>
            <Text variant="subtitle" color="pink" className="font-bold">{formatPrice(packagePrice)}</Text>
          </View>
        </View>

        <View className="mt-4 p-4 bg-white border border-gray-100 rounded-xl">
          <Text variant="caption" color="muted" className="mb-2">Package Includes:</Text>
          <Text variant="small" className="ml-2">• {packageDescription || 'No description'}</Text>
          {estimatedDuration && (
            <Text variant="small" className="ml-2">• {estimatedDuration} minutes photo session</Text>
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
            {createBookingMutation.isPending ? 'Processing...' : 'Confirm'}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmBookingScreen;
