import React from 'react';
import { View } from 'react-native';
import { Text } from '@shared/components/common';
import type { Message } from '@features/chat/types/messages';
import type { ConceptChatCard } from '@features/chat/types/conceptCard';
import ConceptMessageCard from '@features/chat/components/ConceptMessageCard';
import BookingMessageCard from '@features/chat/components/BookingMessageCard';
import { MESSAGE_TYPES } from '@shared/constants/messageType';
import { BookingStatus } from '@shared/constants/booking';

interface Props {
  message: Message;
  currentUserId: number;
  concept?: ConceptChatCard;
  roomId: string;
}

const MessageBubble = ({ message, currentUserId, concept, roomId }: Props) => {
  const isMe = message.senderId === currentUserId;

  const renderContent = () => {
    switch (message.type) {
      case MESSAGE_TYPES.TEXT:
        return (
          <View
            className={`px-4 py-3 rounded-lg ${
              isMe ? 'bg-pink-500' : 'bg-gray-100'
            }`}
          >
            <Text variant="body" className={isMe ? 'text-white' : 'text-gray-900'}>
              {message.content}
            </Text>
          </View>
        );

      case MESSAGE_TYPES.CONCEPT:
        return concept ? <ConceptMessageCard concept={concept} roomId={roomId} /> : null;

      case MESSAGE_TYPES.BOOKING:
        return (
          <BookingMessageCard
            bookingId={message.bookingId}
            initialStatus={message.status as BookingStatus}
            roomId={roomId}
            messageId={message.id}
          />
        );

      default:
        return null;
    }
  };

  return (
    <View className={`flex-row mb-4 ${isMe ? 'justify-end' : 'justify-start'}`}>
      <View className="max-w-[75%]">
        {renderContent()}
        <Text
          variant="caption"
          color="muted"
          className={`mt-2 ${isMe ? 'text-right' : 'text-left'}`}
        >
          {message.createdAt?.toDate().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </View>
  );
};

export default MessageBubble;
