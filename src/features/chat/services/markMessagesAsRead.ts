import {
  writeBatch,
  doc,
} from 'firebase/firestore';
import { db } from '@lib/firebase';
import { Message } from '@features/chat/types/messages';

export const markMessagesAsRead = async (
  roomId: string,
  currentUserId: number,
  messages: Message[],
) => {
  const batch = writeBatch(db);

  const unreadMessages = messages.filter(
    (msg) =>
      msg.senderId !== currentUserId &&
      !msg.isRead,
  );

  if (unreadMessages.length === 0) return;

  unreadMessages.forEach((msg) => {
    const msgRef = doc(
      db,
      'chatRooms',
      roomId,
      'messages',
      msg.id,
    );

    batch.update(msgRef, {
      isRead: true,
    });
  });

  await batch.commit();
};
