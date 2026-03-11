import { useMutation, useQueryClient } from '@tanstack/react-query';
import { respondBooking } from '../../services/bookingService';

export const useRespondBookingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookingId,
      status,
    }: {
      bookingId: number;
      status: 'CONFIRMED' | 'REJECTED';
    }) => respondBooking(bookingId, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['booking', data.id] });
    },
  });
};
