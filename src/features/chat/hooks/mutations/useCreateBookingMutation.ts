import { useMutation } from '@tanstack/react-query';
import { createBooking } from '@features/chat/services/bookingService';

export const useCreateBookingMutation = () => {
  return useMutation({
    mutationFn: createBooking,
  });
};
