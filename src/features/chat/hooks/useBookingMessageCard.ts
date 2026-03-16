import { useBookingDetailQuery } from '@features/chat/hooks/queries/useBookingDetailQuery';
import { getSafeImage } from '@shared/utils/safeImage';
import { DEFAULT_IMAGES } from '@shared/constants';
import { BOOKING_STATUS } from '@shared/constants/booking';

interface Params {
  bookingId: number;
  initialStatus: string;
}

export const useBookingMessageCard = ({
  bookingId,
  initialStatus,
}: Params) => {
  const { data: booking } = useBookingDetailQuery(bookingId);

  const status = booking?.status || initialStatus;

  const imageUri = getSafeImage(
    booking?.concept?.thumbnailUrl,
    DEFAULT_IMAGES.DEFAULT_SLIDER_IMAGE,
  );

  const getStatusStyle = () => {
    switch (status) {
      case BOOKING_STATUS.PENDING:
        return {
          badge: 'bg-amber-100',
          badgeText: 'text-amber-700',
          footer: 'bg-amber-100 border-amber-200',
          message: 'Waiting for Photographer Response',
        };

      case BOOKING_STATUS.INPROGRESS:
        return {
          badge: 'bg-pink-100',
          badgeText: 'text-pink-600',
          footer: 'bg-pink-100 border-pink-200',
          message: 'Your photoshoot is in progress',
        };

      case BOOKING_STATUS.CONFIRMED:
        return {
          badge: 'bg-blue-100',
          badgeText: 'text-blue-700',
          footer: 'bg-blue-100 border-blue-200',
          message: 'Photographer has confirmed this booking',
        };

      case BOOKING_STATUS.REJECTED:
        return {
          badge: 'bg-red-100',
          badgeText: 'text-red-700',
          footer: 'bg-red-100 border-red-200',
          message: 'This booking has been declined',
        };

      case BOOKING_STATUS.COMPLETED:
        return {
          badge: 'bg-green-100',
          badgeText: 'text-green-700',
          footer: 'bg-green-100 border-green-200',
          message: 'This booking has been completed',
        };

      default:
        return {
          badge: 'bg-gray-100',
          badgeText: 'text-gray-700',
          footer: 'bg-gray-100 border-gray-200',
          message: '',
        };
    }
  };

  const statusStyle = getStatusStyle();

  return {
    booking,
    status,
    imageUri,
    statusStyle,
  };
};
