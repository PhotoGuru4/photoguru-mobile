import React, { useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

import MessageBubble from '@features/chat/components/MessageBubble';
import ChatInput from '@features/chat/components/ChatInput';
import UnreadButton from '@features/chat/components/UnreadButton';

import { useChatDetail } from '@features/chat/hooks/useChatDetail';
import { useSendMessage } from '@features/chat/hooks/useSendMessage';
import { useScrollToMessage } from '@features/chat/hooks/useScrollToMessage';
import { useKeyboardHeight } from '@features/chat/hooks/useKeyboardHeight';

import { useAuthStore } from '@store/authStore';
import { MESSAGE_TYPES } from '@shared/constants/messageType';
import { LoadMoreDots } from '@shared/components/common/LoadMoreDots';
import type { ChatStackParamList } from '@navigation/ChatStackNavigator';

type ChatDetailRouteProp = RouteProp<ChatStackParamList, 'ChatDetail'>;

const ITEM_HEIGHT = 70;

const ChatDetail = () => {

  const route = useRoute<ChatDetailRouteProp>();
  const conversationId = String(route.params.conversationId);

  const { user } = useAuthStore();
  const currentUserId = user?.id ?? 0;

  const keyboardHeight = useKeyboardHeight();

  const {
    messages,
    conceptMap,
    loadMore,
    loadingMore,
    firstUnreadMessageId,
    unreadCount,
  } = useChatDetail(conversationId, currentUserId);

  const {
    message,
    setMessage,
    isDisabled,
    handleSend,
  } = useSendMessage({
    roomId: conversationId,
    senderId: currentUserId,
  });

  const sortedMessages = useMemo(() => {
    return [...messages].sort(
      (a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0),
    );
  }, [messages]);

  const {
    flatListRef,
    scrollToMessage,
    handleScrollToIndexFailed,
  } = useScrollToMessage(
    sortedMessages,
    loadMore,
    firstUnreadMessageId,
  );

  if (!user) return null;

  return (
    <View
      className="flex-1 bg-white"
      style={{ paddingBottom: Math.max(keyboardHeight - 50, 0) }}
    >
      <FlatList
        ref={flatListRef}
        data={sortedMessages}
        keyExtractor={(item) => item.id}
        inverted
        contentContainerStyle={{ padding: 16 }}

        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}

        renderItem={({ item }) => (
          <MessageBubble
            message={item}
            currentUserId={currentUserId}
            concept={
              item.type === MESSAGE_TYPES.CONCEPT
                ? conceptMap[item.conceptId]
                : undefined
            }
            roomId={conversationId}
          />
        )}

        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        onScrollToIndexFailed={handleScrollToIndexFailed}

        ListFooterComponent={
          loadingMore ? <LoadMoreDots /> : null
        }

        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
      />

      <UnreadButton
        unreadCount={unreadCount}
        onPress={() => {
          if (firstUnreadMessageId) {
            scrollToMessage(firstUnreadMessageId);
          }
        }}
      />

      <ChatInput
        message={message}
        setMessage={setMessage}
        handleSend={handleSend}
        isDisabled={isDisabled}
      />
    </View>
  );
};

export default ChatDetail;
