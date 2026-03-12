import { useRef, useEffect } from 'react';
import { FlatList } from 'react-native';
import { Message } from '@features/chat/types/messages';

export const useScrollToMessage = (
  messages: Message[],
  loadMore: () => void,
  firstUnreadMessageId: string | null,
) => {
  const flatListRef = useRef<FlatList>(null);
  const needScrollRef = useRef(false);

  const scrollToMessage = (messageId: string) => {
    const index = messages.findIndex((m) => m.id === messageId);

    if (index === -1) {
      needScrollRef.current = true;
      loadMore();
      return;
    }

    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  useEffect(() => {
    if (needScrollRef.current && firstUnreadMessageId) {
      const index = messages.findIndex(
        (m) => m.id === firstUnreadMessageId,
      );

      if (index !== -1) {
        needScrollRef.current = false;

        setTimeout(() => {
          flatListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5,
          });
        }, 300);
      }
    }
  }, [messages, firstUnreadMessageId]);

  const handleScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    }, 400);
  };

  return {
    flatListRef,
    scrollToMessage,
    handleScrollToIndexFailed,
  };
};
