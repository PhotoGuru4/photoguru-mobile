import React from 'react';
import { View } from 'react-native';
import { Text } from '@shared/components/common';
import type { Message } from '@features/chat/types/messages';
import type { ConceptChatCard } from '@features/chat/types/conceptCard';
import ConceptMessageCard from '@features/chat/components/ConceptMessageCard';
import { MESSAGE_TYPES } from '@shared/constants/messageType';

interface Props {
  message: Message;
  currentUserId: number;
  concept?: ConceptChatCard;
}

const MessageBubble = ({
  message,
  currentUserId,
  concept,
}: Props) => {
  const isMe =
    message.senderId === currentUserId;

  return (
    <View
      className={`flex-row mb-4 ${
        isMe
          ? 'justify-end'
          : 'justify-start'
      }`}
    >
      <View className="max-w-[75%]">
        {message.type ===
          MESSAGE_TYPES.TEXT && (
          <View
            className={`px-4 py-3  rounded-lg ${
              isMe
                ? 'bg-pink-500'
                : 'bg-gray-100'
            }`}
          >
            <Text
              variant="body"
              className={`${
                isMe
                  ? 'text-white'
                  : 'text-gray-900'
              }`}
            >
              {message.content}
            </Text>
          </View>
        )}

        {message.type ===
          MESSAGE_TYPES.CONCEPT &&
          concept && (
          <ConceptMessageCard
            concept={concept}
          />
        )}

        <Text
          variant="caption"
          color="muted"
          className={`mt-2 ${
            isMe
              ? 'text-right'
              : 'text-left'
          }`}
        >
          {message.createdAt
            .toDate()
            .toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
        </Text>
      </View>
    </View>
  );
};

export default MessageBubble;
