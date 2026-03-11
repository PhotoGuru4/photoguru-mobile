export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'COMPLETED';

export interface PackageLocation {
  id: number;
  province: string;
  ward: string;
  addressDetail: string | null;
}

export interface PackageItem {
  id: number;
  tier: string;
  price: number;
  description: string | null;
  estimatedDuration: number | null;
  locations: PackageLocation[]; // Thêm locations vào đây
}

export interface Booking {
  id: number;
  clientId: number;
  photographerId: number;
  conceptId: number;
  packageId: number;
  address: string; // Lưu địa điểm đã chọn
  bookingDate: string;
  status: BookingStatus;
  totalPrice: number;
  note?: string;
  isCompletedByCustomer: boolean;
  concept?: { name: string; thumbnailUrl: string | null };
  package?: { tier: string; description: string | null; estimatedDuration: number | null };
  client?: { fullName: string };
}
