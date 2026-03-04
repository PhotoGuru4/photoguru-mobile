import { MESSAGE_TYPES } from '@shared/constants/messageType';
import { Timestamp } from 'firebase/firestore';

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

export type Message = TextMessage | ConceptMessage;
