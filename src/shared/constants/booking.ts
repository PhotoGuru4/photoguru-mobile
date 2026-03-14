export const BOOKING_STATUS = {
  CONFIRMED: 'CONFIRMED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED',
  PENDING: 'PENDING',
} as const;

export type BookingStatus =
  (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS]
