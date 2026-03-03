import { useQuery } from '@tanstack/react-query';
import { getChatRooms } from '@features/chat/services/chatService';
import type { ChatRoomListItem } from '@features/chat/types/chatRoom';

export const useChatRoomsQuery = () => {
  return useQuery<ChatRoomListItem[]>({
    queryKey: ['chat-rooms'],
    queryFn: getChatRooms,
    staleTime: 0,
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
    retry: 1,
  });
};
