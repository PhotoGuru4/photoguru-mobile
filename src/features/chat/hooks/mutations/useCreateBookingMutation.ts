import { useMutation } from '@tanstack/react-query';
import { createBooking } from '../../services/bookingService';

export const useCreateBookingMutation = () => {
  return useMutation({
    mutationFn: createBooking,
  });
};
