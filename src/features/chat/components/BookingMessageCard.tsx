import React from 'react';
import { View } from 'react-native';
import { Text, Button } from '@shared/components/common';
import { useBookingDetailQuery } from '../hooks/queries/useBookingDetailQuery';
import { useRespondBookingMutation } from '../hooks/mutations/useRespondBookingMutation';
import { useCompleteBookingMutation } from '../hooks/mutations/useCompleteBookingMutation';
import { useAuthStore } from '@store/authStore';
import { formatPrice } from '@shared/utils/formatPrice';
import { formatTime } from '@shared/utils/formatTime';
import { formatDate } from '@shared/utils/formatDate';
import { Calendar, Clock, DollarSign, User, MapPin, CheckCircle, XCircle, Clock3 } from 'lucide-react-native';

interface Props {
  bookingId: number;
  initialStatus: string;
  roomId: string;
  messageId: string;
}

const BookingMessageCard = ({ bookingId, initialStatus, roomId, messageId }: Props) => {
  const { user } = useAuthStore();
  const { data: booking, isLoading } = useBookingDetailQuery(bookingId);
  const respondMutation = useRespondBookingMutation();
  const completeMutation = useCompleteBookingMutation();

  const isCustomer = user?.id === booking?.clientId;
  const isPhotographer = user?.role === 'PHOTOGRAPHER';
  const status = booking?.status || initialStatus;

  if (isLoading || !booking) {
    return (
      <View className="rounded-2xl border border-gray-200 bg-white p-4">
        <Text>Loading booking...</Text>
      </View>
    );
  }

  const renderIcon = () => {
    switch (status) {
      case 'CONFIRMED': return <CheckCircle size={24} color="#10b981" />;
      case 'REJECTED': return <XCircle size={24} color="#ef4444" />;
      case 'COMPLETED': return <CheckCircle size={24} color="#3b82f6" />;
      default: return <Clock3 size={24} color="#f59e0b" />;
    }
  };

  const statusColor = {
    PENDING: 'bg-amber-50 border-amber-200',
    CONFIRMED: 'bg-green-50 border-green-200',
    REJECTED: 'bg-red-50 border-red-200',
    COMPLETED: 'bg-blue-50 border-blue-200',
  };

  const statusText = {
    PENDING: 'Waiting for Photographer Response',
    CONFIRMED: 'Booking Accepted!',
    REJECTED: 'Booking Rejected',
    COMPLETED: 'Completed',
  };

  return (
    <View className={`rounded-2xl border p-4 w-full ${statusColor[status as keyof typeof statusColor] || 'bg-white'}`}>
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center gap-2">
          {renderIcon()}
          <Text variant="subtitle" className="font-bold">Booking Request</Text>
        </View>
        <View className="px-2 py-1 bg-white/60 rounded-full">
          <Text className="text-xs font-semibold uppercase">{status}</Text>
        </View>
      </View>

      {/* Concept & Package */}
      <Text variant="subtitle" color="pink">{booking.concept?.name}</Text>
      <Text variant="caption" className="capitalize mb-3">{booking.package?.tier} Package</Text>

      {/* Details */}
      <View className="gap-y-2 mb-4">
        <View className="flex-row items-center gap-2">
          <Calendar size={16} color="#6b7280" />
          <Text variant="small">Date: <Text className="font-semibold">{formatDate(booking.bookingDate)}</Text></Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Clock size={16} color="#6b7280" />
          <Text variant="small">Time: <Text className="font-semibold">{formatTime(booking.bookingDate)}</Text></Text>
        </View>
        <View className="flex-row items-center gap-2">
          <DollarSign size={16} color="#6b7280" />
          <Text variant="small">Price: <Text className="font-semibold text-pink-500">{formatPrice(booking.totalPrice)}</Text></Text>
        </View>
        <View className="flex-row items-center gap-2">
          <User size={16} color="#6b7280" />
          <Text variant="small">Customer: <Text className="font-semibold">{booking.client?.fullName}</Text></Text>
        </View>
        <View className="flex-row items-center gap-2">
          <MapPin size={16} color="#6b7280" />
          <Text variant="small">Address: <Text className="font-semibold">{booking.address}</Text></Text>
        </View>
      </View>

      {/* Package Includes */}
      <View className="mb-4">
        <Text variant="caption" color="muted">Package Includes:</Text>
        <Text variant="small" className="ml-2">• {booking.package?.description || 'Photo session'}</Text>
        {booking.package?.estimatedDuration && (
          <Text variant="small" className="ml-2">• {booking.package.estimatedDuration} minutes photo session</Text>
        )}
      </View>

      {/* Actions */}
      <View className="mt-2">
        {status === 'PENDING' && isPhotographer && (
          <View className="flex-row gap-2">
            <Button
              variant="outline"
              color="red"
              size="sm"
              onPress={() => respondMutation.mutate({ bookingId, status: 'REJECTED' })}
              className="flex-1"
            >
              Decline
            </Button>
            <Button
              size="sm"
              onPress={() => respondMutation.mutate({ bookingId, status: 'CONFIRMED' })}
              className="flex-1"
            >
              Accept
            </Button>
          </View>
        )}

        {status === 'CONFIRMED' && isCustomer && (
          <Button fullWidth size="sm" onPress={() => completeMutation.mutate(bookingId)}>
            Mark Completed
          </Button>
        )}

        {status === 'PENDING' && isCustomer && (
          <View className="bg-amber-100 p-3 rounded-lg items-center">
            <Text className="text-amber-800 text-center">{statusText.PENDING}</Text>
            <Text className="text-amber-600 text-xs mt-1">You'll be notified once the photographer responds</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default BookingMessageCard;
