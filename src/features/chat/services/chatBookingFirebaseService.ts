import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '@lib/firebase';
import { MESSAGE_TYPES } from '@shared/constants/messageType';

export const sendBookingMessage = async (
  roomId: string,
  senderId: number,
  bookingId: number,
  status: string,
) => {
  try {
    const messagesRef = collection(db, 'chatRooms', roomId, 'messages');
    await addDoc(messagesRef, {
      type: MESSAGE_TYPES.BOOKING,
      senderId,
      bookingId,
      status,
      createdAt: serverTimestamp(),
      isRead: false,
    });
  } catch (error) {
    console.error('Send booking message error:', error);
    throw error;
  }
};

export const updateBookingMessageStatus = async (
  roomId: string,
  messageId: string,
  status: string,
) => {
  try {
    const messageRef = doc(db, 'chatRooms', roomId, 'messages', messageId);
    await updateDoc(messageRef, { status });
  } catch (error) {
    console.error('Update booking message status error:', error);
  }
};
