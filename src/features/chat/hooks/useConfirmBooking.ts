import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useCreateBookingMutation } from '@features/chat/hooks/mutations/useCreateBookingMutation';
import { sendBookingMessage } from '@features/chat/services/chatBookingFirebaseService';
import { useAuthStore } from '@store/authStore';
import { ChatStackParamList } from '@navigation/ChatStackNavigator';
import { BOOKING_STATUS } from '@shared/constants/booking';

type NavigationProp = NativeStackNavigationProp<
  ChatStackParamList,
  'ConfirmBooking'
>;

interface Params {
  conceptId: number;
  packageId: number;
  roomId: string;
  address: string;
  bookingDate: string;
  bookingTime: string;
}

export const useConfirmBooking = (params: Params) => {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuthStore();

  const { conceptId, packageId, roomId, address, bookingDate, bookingTime } =
    params;

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

      await sendBookingMessage(
        roomId,
        user.id,
        booking.id,
        BOOKING_STATUS.PENDING,
      );

      navigation.navigate('ChatDetail', { conversationId: roomId });
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  const handleBack = () => navigation.goBack();

  return {
    handleConfirm,
    handleBack,
    createBookingMutation,
  };
};
