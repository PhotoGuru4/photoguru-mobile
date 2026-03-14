import { useQuery } from '@tanstack/react-query';
import { getBookingDetail } from '@features/chat/services/bookingService';

export const useBookingDetailQuery = (bookingId: number) => {
  return useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBookingDetail(bookingId),
    enabled: !!bookingId,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
