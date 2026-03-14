import { useState, useMemo } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';

import { GET } from '@shared/services/apiService';
import { API_ENDPOINTS } from '@shared/constants';
import { ChatStackParamList } from '@navigation/ChatStackNavigator';

interface GeneratedSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface Params {
  conceptId: number;
  photographerId: number;
  packageId: number;
  roomId: string;
  address: string;

  conceptName: string;
  conceptThumbnail: string | null;

  packageTier: string;
  packagePrice: number;
  packageDescription: string;
  estimatedDuration: number | null;
}

type NavigationProp = NativeStackNavigationProp<
  ChatStackParamList,
  'SelectDateTime'
>;

export const useSelectDateTime = (params: Params) => {
  const navigation = useNavigation<NavigationProp>();

  const {
    conceptId,
    photographerId,
    packageId,
    roomId,
    address,
    conceptName,
    conceptThumbnail,
    packageTier,
    packagePrice,
    packageDescription,
    estimatedDuration,
  } = params;

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );

  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const { data: slots, isLoading, isError } = useQuery({
    queryKey: ['dynamic-slots', photographerId, selectedDate, packageId],
    queryFn: () =>
      GET<GeneratedSlot[]>(
        API_ENDPOINTS.PHOTOGRAPHERS.DYNAMIC_SLOTS(
          photographerId,
          selectedDate,
          packageId,
        ),
      ),
    enabled: Boolean(photographerId && selectedDate && packageId),
  });

  const handleConfirm = () => {
    if (!selectedTime) {
      Alert.alert('Error', 'Please select a time slot.');
      return;
    }

    const start = new Date(selectedTime);
    const end = new Date(start);

    if (estimatedDuration) {
      end.setMinutes(end.getMinutes() + estimatedDuration);
    }

    const bookingStart = start.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const bookingEnd = end.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });

    navigation.navigate('ConfirmBooking', {
      conceptId,
      photographerId,
      packageId,
      roomId,
      address,

      conceptName,
      conceptThumbnail,

      packageTier,
      packagePrice,
      packageDescription,
      estimatedDuration,

      bookingDate: selectedDate,
      bookingStart,
      bookingEnd,
    });
  };

  const minDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  const formatSlotTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    slots,
    isLoading,
    isError,
    handleConfirm,
    minDate,
    formatSlotTime,
  };
};
