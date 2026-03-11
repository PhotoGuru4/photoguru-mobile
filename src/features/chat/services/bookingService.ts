import { GET, POST, PATCH } from '@shared/services/apiService';
import { API_ENDPOINTS } from '@shared/constants';
import type { Booking, PackageLocation } from '../types/booking';

export interface PackageItem {
  id: number;
  tier: string;
  price: number;
  description: string | null;
  estimatedDuration: number | null;
  locations: PackageLocation[];
}

export const getConceptPackages = (conceptId: number): Promise<PackageItem[]> => {
  return GET<PackageItem[]>(API_ENDPOINTS.CONCEPT.PACKAGES(conceptId));
};

export interface ScheduleSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export const getPhotographerSchedules = (
  photographerId: number,
  date: string,
  packageId: number,
): Promise<ScheduleSlot[]> => {
  return GET<ScheduleSlot[]>(
    API_ENDPOINTS.PHOTOGRAPHERS.DYNAMIC_SLOTS(photographerId, date, packageId),
  );
};

export interface CreateBookingDto {
  conceptId: number;
  packageId: number;
  bookingDate: string;
  address: string;
  note?: string;
}

export const createBooking = (data: CreateBookingDto): Promise<Booking> => {
  return POST<Booking>(API_ENDPOINTS.BOOKINGS.CREATE, data);
};

export const getBookingDetail = (bookingId: number): Promise<Booking> => {
  return GET<Booking>(API_ENDPOINTS.BOOKINGS.DETAIL(bookingId));
};

export const respondBooking = (
  bookingId: number,
  status: 'CONFIRMED' | 'REJECTED',
): Promise<Booking> => {
  return PATCH<Booking>(API_ENDPOINTS.BOOKINGS.RESPOND(bookingId), { status });
};

export const completeBooking = (bookingId: number): Promise<Booking> => {
  return PATCH<Booking>(API_ENDPOINTS.BOOKINGS.COMPLETE(bookingId), {});
};
