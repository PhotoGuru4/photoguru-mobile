import {
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@lib/firebase';
import { MESSAGE_TYPES } from '@shared/constants/messageType';

export const sendConceptMessage = async (
  roomId: string,
  senderId: number,
  conceptId: number,
) => {
  try {
    const messagesRef = collection(
      db,
      'chatRooms',
      roomId,
      'messages',
    );

    await addDoc(messagesRef, {
      type: MESSAGE_TYPES.CONCEPT,
      senderId,
      conceptId,
      createdAt: serverTimestamp(),
    });

    console.log('MESSAGE CREATED');
  } catch (error) {
    console.error('SEND MESSAGE ERROR:', error);
    throw error;
  }
};
