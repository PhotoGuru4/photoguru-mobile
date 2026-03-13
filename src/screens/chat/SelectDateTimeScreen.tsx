import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';

// Shared Components & Utils
import { Text, Button } from '@shared/components/common';
import { GET } from '@shared/services/apiService';
import { API_ENDPOINTS } from '@shared/constants';
import { useAuthStore } from '@store/authStore';
import { ChatStackParamList } from '@navigation/ChatStackNavigator';

// Features & Services
import { useCreateBookingMutation } from '@features/chat/hooks/mutations/useCreateBookingMutation';
import { sendBookingMessage } from '@features/chat/services/chatBookingFirebaseService';

// Định nghĩa Interface cho Slot trả về từ Backend
interface GeneratedSlot {
  startTime: string; // Định dạng "HH:mm"
  endTime: string; // Định dạng "HH:mm"
  isAvailable: boolean;
}

type NavigationProp = NativeStackNavigationProp<ChatStackParamList, 'SelectDateTime'>;
type RoutePropType = RouteProp<ChatStackParamList, 'SelectDateTime'>;

const SelectDateTimeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { user } = useAuthStore();

  // Lấy params từ màn hình SelectPackage truyền sang
  const { conceptId, photographerId, packageId, roomId, address, conceptName } = route.params;

  // State quản lý ngày và giờ chọn
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // 1. Hook lấy danh sách Slot động từ Backend
  // API này sẽ tự chia slot 5h-18h dựa trên duration của packageId và check trùng lịch
  const { data: slots, isLoading, isError, refetch } = useQuery({
    queryKey: ['dynamic-slots', photographerId, selectedDate, packageId],
    queryFn: () =>
      GET<GeneratedSlot[]>(
        `${API_ENDPOINTS.PHOTOGRAPHERS.DYNAMIC_SLOTS(photographerId, selectedDate, packageId)}`,
      ),
    enabled: !!photographerId && !!selectedDate && !!packageId,
  });

  const createBookingMutation = useCreateBookingMutation();

  // 2. Xử lý khi nhấn Confirm
  const handleConfirm = async () => {
    if (!selectedTime || !user) {
      Alert.alert('Error', 'Please select a time slot first.');
      return;
    }

    // Tạo ISO string: YYYY-MM-DDT[SelectedTime]:00.000Z
    const bookingDate = `${selectedDate}T${selectedTime}:00.000Z`;

    try {
      // BƯỚC 1: Gọi NestJS tạo bản ghi Booking chính thức vào PostgreSQL
      const booking = await createBookingMutation.mutateAsync({
        conceptId,
        packageId,
        bookingDate,
        address, // Địa điểm khách đã chọn ở màn hình trước
      });

      // BƯỚC 2: Gửi tin nhắn chứa Thẻ Booking lên Firebase Chat
      await sendBookingMessage(roomId, user.id, booking.id, 'PENDING');

      // BƯỚC 3: Quay lại màn hình Chat Detail
      navigation.navigate('ChatDetail', { conversationId: roomId });
    } catch (error) {
      console.error('Booking Error:', error);
      Alert.alert('Booking Failed', 'This slot might have just been taken. Please try another one.');
      refetch(); // Tải lại lịch mới nhất
    }
  };

  // Cấu hình ngày tối thiểu là hôm nay
  const minDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
      {/* Header tóm tắt */}
      <View className="p-4 border-b border-gray-100 bg-pink-50/30">
        <Text variant="subtitle" color="pink" className="font-bold">{conceptName}</Text>
        <Text variant="small" color="muted">📍 {address}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Bộ lịch */}
        <Calendar
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            setSelectedTime(null); // Reset giờ khi đổi ngày
          }}
          minDate={minDate}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#E06B80' },
          }}
          theme={{
            todayTextColor: '#E06B80',
            arrowColor: '#E06B80',
            selectedDayBackgroundColor: '#E06B80',
            textDayFontWeight: '500',
          }}
        />

        {/* Khu vực chọn Slot giờ */}
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text variant="subtitle" className="font-bold">Available Slots</Text>
            <Text variant="caption" color="muted">{selectedDate}</Text>
          </View>

          {isLoading ? (
            <View className="py-10 items-center">
              <ActivityIndicator color="#E06B80" />
              <Text className="mt-2 text-gray-400">Calculating available time...</Text>
            </View>
          ) : isError ? (
            <Text color="red" align="center">Failed to load schedules. Please try again.</Text>
          ) : (
            <View className="flex-row flex-wrap justify-between">
              {slots && slots.length > 0 ? (
                slots.map((slot, index) => {
                  const isSelected = selectedTime === slot.startTime;
                  const isAvailable = slot.isAvailable;

                  return (
                    <TouchableOpacity
                      key={index}
                      disabled={!isAvailable}
                      onPress={() => setSelectedTime(slot.startTime)}
                      activeOpacity={0.7}
                      className={`w-[48%] mb-3 p-3 rounded-xl border items-center justify-center ${
                        !isAvailable
                          ? 'bg-gray-100 border-gray-100'
                          : isSelected
                            ? 'bg-pink-500 border-pink-500'
                            : 'bg-white border-gray-200'
                      }`}
                    >
                      <Text
                        className={`font-bold ${
                          isSelected ? 'text-white' : isAvailable ? 'text-gray-800' : 'text-gray-300'
                        }`}
                      >
                        {slot.startTime} - {slot.endTime}
                      </Text>

                      {!isAvailable && (
                        <Text className="text-[9px] text-red-400 font-bold mt-1">FULLY BOOKED</Text>
                      )}
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View className="w-full py-6 items-center bg-gray-50 rounded-xl">
                  <Text color="muted">No work slots found for this day.</Text>
                </View>
              )}
            </View>
          )}
        </View>

        <View className="h-10" />
      </ScrollView>

      {/* Nút xác nhận Selection */}
      <View className="p-4 border-t border-gray-100 bg-white shadow-lg">
        <Button
          onPress={handleConfirm}
          disabled={!selectedTime || createBookingMutation.isPending}
          fullWidth
          size="lg"
        >
          {createBookingMutation.isPending ? 'Processing...' : 'Confirm Selection'}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SelectDateTimeScreen;
