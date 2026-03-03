import React from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ConversationItem from '@features/chat/components/ConversationItem';
import { useChatMessages } from '@features/chat/hooks/useChatMessages';
import { Loading, Text } from '@shared/components/common';
import type { ChatStackParamList } from '@navigation/ChatStackNavigator';

type MessagesNavigationProp = NativeStackNavigationProp<
  ChatStackParamList,
  'Messages'
>;

const Messages = () => {
  const navigation = useNavigation<MessagesNavigationProp>();

  const { conversations, isLoading, isError } =
    useChatMessages();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Something went wrong</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={conversations}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          <View className="flex-1 items-center mt-20">
            <Text>No conversations yet</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ConversationItem
            item={item}
            onPress={() =>
              navigation.navigate('ChatDetail', {
                conversationId: String(item.id),
              })
            }
          />
        )}
      />
    </View>
  );
};

export default Messages;
