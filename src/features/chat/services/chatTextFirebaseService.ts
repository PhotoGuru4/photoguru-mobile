import {
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@lib/firebase';
import { MESSAGE_TYPES } from '@shared/constants/messageType';

export const sendTextMessage = async (
  roomId: string,
  senderId: number,
  content: string,
) => {
  try {
    const messagesRef = collection(
      db,
      'chatRooms',
      roomId,
      'messages',
    );

    await addDoc(messagesRef, {
      type: MESSAGE_TYPES.TEXT,
      senderId,
      content,
      createdAt: serverTimestamp(),
    });

    console.log('TEXT MESSAGE SENT');
  } catch (error) {
    console.error('SEND TEXT MESSAGE ERROR:', error);
    throw error;
  }
};
