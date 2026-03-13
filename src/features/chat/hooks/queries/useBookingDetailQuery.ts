import { useQuery } from '@tanstack/react-query';
import { getBookingDetail } from '../../services/bookingService';

export const useBookingDetailQuery = (bookingId: number) => {
  return useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBookingDetail(bookingId),
    enabled: !!bookingId,
    staleTime: 1000 * 60 * 2, // 2 phút
  });
};
