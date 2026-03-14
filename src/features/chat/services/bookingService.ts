import { GET, POST, PATCH } from '@shared/services/apiService';
import { API_ENDPOINTS } from '@shared/constants';
import type { Booking, PackageItem, ScheduleSlot, CreateBooking } from '@features/chat/types/booking';
import type { BOOKING_STATUS } from '@shared/constants/booking';

export const getConceptPackages = (conceptId: number): Promise<PackageItem[]> => {
  return GET<PackageItem[]>(API_ENDPOINTS.CONCEPT.PACKAGES(conceptId));
};

export const getPhotographerSchedules = (
  photographerId: number,
  date: string,
  packageId: number,
): Promise<ScheduleSlot[]> => {
  return GET<ScheduleSlot[]>(
    API_ENDPOINTS.PHOTOGRAPHERS.DYNAMIC_SLOTS(photographerId, date, packageId),
  );
};

export const getBookingDetail = (bookingId: number): Promise<Booking> => {
  return GET<Booking>(API_ENDPOINTS.BOOKINGS.DETAIL(bookingId));
};

export const createBooking = (data: CreateBooking): Promise<Booking> => {
  return POST<Booking>(API_ENDPOINTS.BOOKINGS.CREATE, data);
};

export const respondBooking = (
  bookingId: number,
  status: typeof BOOKING_STATUS.CONFIRMED | typeof BOOKING_STATUS.REJECTED,
): Promise<Booking> => {
  return PATCH<Booking>(API_ENDPOINTS.BOOKINGS.RESPOND(bookingId), { status });
};
