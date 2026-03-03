export const MESSAGE_TYPES = {
  TEXT: 'TEXT',
  CONCEPT: 'CONCEPT',
  BOOKING: 'BOOKING',
} as const;

export type MessageType = typeof MESSAGE_TYPES[keyof typeof MESSAGE_TYPES];
