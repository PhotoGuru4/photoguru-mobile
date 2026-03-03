import React, { useRef } from 'react';
import {
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Send } from 'lucide-react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

import MessageBubble from '@features/chat/components/MessageBubble';
import { MESSAGE_TYPES } from '@shared/constants/messageType';
import { useChatDetail } from '@features/chat/hooks/useChatDetail';
import { useSendMessage } from '@features/chat/hooks/useSendMessage';
import { useAuthStore } from '@store/authStore';
import { LoadMoreDots } from '@shared/components/common/LoadMoreDots';
import type { ChatStackParamList } from '@navigation/ChatStackNavigator';

type ChatDetailRouteProp = RouteProp<
  ChatStackParamList,
  'ChatDetail'
>;

const ChatDetail = () => {
  const route = useRoute<ChatDetailRouteProp>();
  const conversationId = String(route.params.conversationId);

  const flatListRef = useRef<FlatList>(null);

  const { user } = useAuthStore();
  const currentUserId = user?.id ?? 0;

  const {
    messages,
    conceptData,
    loadMore,
    loadingMore,
  } = useChatDetail(conversationId);

  const {
    message,
    setMessage,
    isDisabled,
    handleSend,
  } = useSendMessage({
    roomId: conversationId,
    senderId: currentUserId,
  });

  if (!user) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white"
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => String(item.id)}
        inverted
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <MessageBubble
            message={item}
            currentUserId={currentUserId}
            concept={
              item.type === MESSAGE_TYPES.CONCEPT
                ? conceptData
                : undefined
            }
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          loadingMore ? <LoadMoreDots /> : null
        }
      />

      <View className="border-t border-gray-200 px-4 py-3">
        <View className="flex-row items-center gap-2">
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            returnKeyType="send"
            onSubmitEditing={handleSend}
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm"
          />

          <TouchableOpacity
            activeOpacity={0.8}
            disabled={isDisabled}
            onPress={handleSend}
            style={{
              opacity: isDisabled ? 0.5 : 1,
            }}
            className="w-11 h-11 rounded-full items-center justify-center bg-[#E06B80]"
          >
            <Send size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatDetail;
