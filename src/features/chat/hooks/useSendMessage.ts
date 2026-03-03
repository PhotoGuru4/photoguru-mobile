import { useState, useMemo, useCallback } from 'react';
import { sendTextMessage } from '@features/chat/services/chatTextFirebaseService';

interface Props {
  roomId: string;
  senderId: number;
}

export const useSendMessage = ({
  roomId,
  senderId,
}: Props) => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const isDisabled = useMemo(() => {
    return !message.trim() || sending;
  }, [message, sending]);

  const handleSend = useCallback(async () => {
    if (isDisabled) return;

    try {
      setSending(true);

      await sendTextMessage(
        roomId,
        senderId,
        message.trim(),
      );

      setMessage('');
    } catch (error) {
      console.error('SEND ERROR:', error);
    } finally {
      setSending(false);
    }
  }, [roomId, senderId, message, isDisabled]);

  return {
    message,
    setMessage,
    sending,
    isDisabled,
    handleSend,
  };
};
