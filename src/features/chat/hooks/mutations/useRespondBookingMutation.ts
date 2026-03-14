import { useMutation, useQueryClient } from '@tanstack/react-query';
import { respondBooking } from '@features/chat/services/bookingService';
import { BOOKING_STATUS } from '@shared/constants/booking';

export const useRespondBookingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookingId,
      status,
    }: {
      bookingId: number;
      status:
        | typeof BOOKING_STATUS.CONFIRMED
        | typeof BOOKING_STATUS.REJECTED;
    }) => respondBooking(bookingId, status),

    onSuccess: (data) => {
      queryClient.setQueryData(['booking', data.id], data);
      queryClient.invalidateQueries({
        queryKey: ['booking', data.id],
      });
    },
  });
};
