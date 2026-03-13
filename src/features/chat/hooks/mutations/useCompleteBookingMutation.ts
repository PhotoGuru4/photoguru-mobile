import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeBooking } from '../../services/bookingService';

export const useCompleteBookingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId: number) => completeBooking(bookingId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['booking', data.id] });
    },
  });
};
