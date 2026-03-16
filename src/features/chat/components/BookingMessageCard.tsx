import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@shared/components/common';

import { formatPrice } from '@shared/utils/formatPrice';
import { formatTime } from '@shared/utils/formatTime';
import { formatDate } from '@shared/utils/formatDate';

import {
  Calendar,
  Clock,
  DollarSign,
  User,
  MapPin,
  Check,
} from 'lucide-react-native';

import { useBookingMessageCard } from '@features/chat/hooks/useBookingMessageCard';

interface Props {
  bookingId: number;
  initialStatus: string;
  roomId: string;
  messageId: string;
}

const BookingMessageCard = ({ bookingId, initialStatus }: Props) => {
  const { booking, status, imageUri, statusStyle } =
    useBookingMessageCard({
      bookingId,
      initialStatus,
    });

  if (!booking) return null;

  return (
    <View className="rounded-2xl border border-gray-200 bg-white overflow-hidden">

      <View className="flex-row justify-between items-center px-4 py-3 bg-gray-50 border-b border-gray-200">
        <Text color="default" className="font-semibold">
          Booking Request
        </Text>

        <View className={`${statusStyle.badge} px-3 py-1 rounded-full`}>
          <Text
            lineClamp={1}
            variant="caption"
            className={`${statusStyle.badgeText} font-semibold`}
          >
            {status
              ? status.charAt(0).toUpperCase() +
                status.slice(1).toLowerCase()
              : null}
          </Text>
        </View>
      </View>

      <View className="p-4">

        <View className="flex-row gap-3 mb-4">
          <Image
            source={{ uri: imageUri }}
            className="w-16 h-16 rounded-lg"
            resizeMode="cover"
          />

          <View className="flex-1 justify-center">
            <Text
              lineClamp={1}
              variant="body"
              color="pink"
              className="font-semibold"
            >
              {booking.concept?.name}
            </Text>

            <Text lineClamp={1} variant="caption" className="mt-1">
              {booking.package?.tier
                ? booking.package.tier.charAt(0).toUpperCase() +
                  booking.package.tier.slice(1).toLowerCase() +
                  ' Package'
                : 'Package'}
            </Text>
          </View>
        </View>

        <View className="gap-3 mb-4">

          <View className="flex-row items-center gap-2">
            <Calendar size={16} color="#E06B80" />
            <Text color="pink">
              <Text className="font-semibold">Date:</Text>{' '}
              <Text variant="caption">
                {formatDate(booking.bookingDate)}
              </Text>
            </Text>
          </View>

          <View className="flex-row items-center gap-2">
            <Clock size={16} color="#E06B80" />
            <Text color="pink">
              <Text className="font-semibold">Time:</Text>{' '}
              <Text variant="caption">
                {(() => {
                  const start = new Date(booking.bookingDate);
                  const end = new Date(
                    start.getTime() +
                      (booking.package?.estimatedDuration || 0) * 60000,
                  );

                  return `${formatTime(start.toISOString())} - ${formatTime(
                    end.toISOString(),
                  )}`;
                })()}
              </Text>
            </Text>
          </View>

          <View className="flex-row items-center gap-2">
            <DollarSign size={16} color="#E06B80" />
            <Text color="pink">
              <Text className="font-semibold">Price:</Text>{' '}
              <Text
                lineClamp={1}
                variant="caption"
                className="font-semibold text-pink-500"
              >
                {formatPrice(booking.totalPrice)}
              </Text>
            </Text>
          </View>

          <View className="flex-row items-center gap-2">
            <User size={16} color="#E06B80" />
            <Text color="pink">
              <Text className="font-semibold">Customer:</Text>{' '}
              <Text lineClamp={1} variant="caption">
                {booking.client?.fullName}
              </Text>
            </Text>
          </View>

          <View className="flex-row items-center gap-1.5">
            <MapPin size={16} color="#E06B80" />
            <Text className="font-semibold">Address:</Text>

            <Text
              variant="caption"
              lineClamp={1}
              className="flex-1 mr-2"
            >
              {booking.address}
            </Text>
          </View>

        </View>

        <View className="bg-gray-50 p-4 rounded-xl">
          <Text color="pink" className="mb-3 font-medium">
            Package Includes:
          </Text>

          <View className="gap-2">
            {booking.package?.benefit?.map((benefit, index) => (
              <View key={index} className="flex-row items-center gap-2">
                <Check size={14} color="#E06B80" />
                <Text lineClamp={1} variant="caption">
                  {benefit}
                </Text>
              </View>
            ))}

            {booking.package?.estimatedDuration && (
              <View className="flex-row items-center gap-2">
                <Check size={14} color="#E06B80" />
                <Text lineClamp={1} variant="caption">
                  {booking.package.estimatedDuration} minutes photo session
                </Text>
              </View>
            )}
          </View>
        </View>

      </View>

      {statusStyle.message && (
        <View
          className={`${statusStyle.footer} px-4 py-5 items-center border-t`}
        >
          <Text variant="body" className="text-center">
            {statusStyle.message}
          </Text>
        </View>
      )}
    </View>
  );
};

export default BookingMessageCard;
