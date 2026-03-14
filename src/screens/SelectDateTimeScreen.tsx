import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { useRoute, RouteProp } from '@react-navigation/native';
import { MapPin } from 'lucide-react-native';

import { Text, Button, LoadMoreDots } from '@shared/components/common';
import { ChatStackParamList } from '@navigation/ChatStackNavigator';
import { useSelectDateTime } from '@features/chat/hooks/useSelectDateTime';

type RoutePropType = RouteProp<ChatStackParamList, 'SelectDateTime'>;

const SelectDateTimeScreen = () => {
  const route = useRoute<RoutePropType>();

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
  } = route.params;

  const {
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
  } = useSelectDateTime({
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
  });

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>

      <View className="p-4 border-b border-gray-100 bg-pink-50/30">
        <Text variant="subtitle" color="pink" className="font-bold">
          {conceptName}
        </Text>

        <View className="flex-row items-center mt-2 gap-1">
          <MapPin size={14} color="#E06B80" />
          <Text variant="small" color="muted">
            {address}
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        <Calendar
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            setSelectedTime(null);
          }}
          minDate={minDate}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: '#E06B80',
            },
          }}
          theme={{
            todayTextColor: '#E06B80',
            arrowColor: '#E06B80',
            selectedDayBackgroundColor: '#E06B80',
            textDayFontWeight: '500',
          }}
        />

        <View className="p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text variant="subtitle" className="font-bold">
              Available Slots
            </Text>

            <Text variant="caption" color="muted">
              {selectedDate}
            </Text>
          </View>

          {isLoading ? (
            <View className="py-10 items-center">
              <LoadMoreDots />
            </View>
          ) : isError ? (
            <Text color="pink" align="center">
              Failed to load schedules. Please try again.
            </Text>
          ) : (
            <View className="flex-row flex-wrap justify-between">
              {slots && slots.length > 0 ? (
                slots.map((slot) => {
                  const isSelected = selectedTime === slot.startTime;
                  const isAvailable = slot.isAvailable;

                  return (
                    <TouchableOpacity
                      key={slot.startTime}
                      disabled={!isAvailable}
                      onPress={() => setSelectedTime(slot.startTime)}
                      activeOpacity={0.7}
                      className={`w-[48%] mb-3 p-3 rounded-xl border items-center justify-center ${
                        !isAvailable
                          ? 'bg-gray-50 border-gray-100'
                          : isSelected
                            ? 'bg-pink-500 border-pink-500'
                            : 'bg-white border-gray-200'
                      }`}
                    >
                      <Text
                        className={`${
                          isSelected
                            ? 'text-white'
                            : isAvailable
                              ? 'text-gray-800'
                              : 'text-gray-300'
                        }`}
                      >
                        {formatSlotTime(slot.startTime)} -{' '}
                        {formatSlotTime(slot.endTime)}
                      </Text>

                      {!isAvailable && (
                        <Text variant="small" color="pink" className="mt-1">
                          Fully Booked
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View className="w-full py-6 items-center bg-gray-50 rounded-xl">
                  <Text color="muted">
                    No work slots found for this day.
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>

        <View className="h-10" />
      </ScrollView>

      <View className="p-4 border-t border-gray-100 bg-white">
        <Button
          onPress={handleConfirm}
          disabled={!selectedTime}
          fullWidth
          size="lg"
        >
          Confirm Selection
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SelectDateTimeScreen;
