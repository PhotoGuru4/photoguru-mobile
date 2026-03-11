import { MESSAGE_TYPES } from '@shared/constants/messageType';
import { Timestamp } from 'firebase/firestore';
import { BookingStatus } from './booking';

interface BaseMessage {
  id: string;
  senderId: number;
  createdAt: Timestamp;
  isRead: boolean;
}

export interface TextMessage extends BaseMessage {
  type: typeof MESSAGE_TYPES.TEXT;
  content: string;
}

export interface ConceptMessage extends BaseMessage {
  type: typeof MESSAGE_TYPES.CONCEPT;
  conceptId: number;
}

export interface BookingMessage extends BaseMessage {
  type: typeof MESSAGE_TYPES.BOOKING;
  bookingId: number;
  status: BookingStatus;
}

export type Message = TextMessage | ConceptMessage | BookingMessage;
