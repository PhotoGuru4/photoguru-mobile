import { BookingStatus } from '@shared/constants/booking';

export interface PackageLocation {
  id: number;
  province: string;
  ward: string;
  addressDetail: string | null;
}

export interface ScheduleSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface CreateBooking {
  conceptId: number;
  packageId: number;
  bookingDate: string;
  address: string;
  note?: string;
}

export interface PackageItem {
  id: number;
  tier: string;
  price: number;
  benefit: string[];
  estimatedDuration: number | null;
  locations: PackageLocation[];
}

export interface Booking {
  id: number;
  clientId: number;
  photographerId: number;
  conceptId: number;
  packageId: number;
  address: string;
  bookingDate: string;
  status: BookingStatus;
  totalPrice: number;
  note?: string;
  isCompletedByCustomer: boolean;
  concept?: {
    name: string;
    thumbnailUrl: string | null
  };
  package?: {
    tier: string;
    benefit: string[];
    estimatedDuration: number | null;
  };
  client?: {
    fullName: string
  };
}
