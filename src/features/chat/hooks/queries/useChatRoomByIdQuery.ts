import { useQuery } from '@tanstack/react-query';
import { getChatRoomById } from '@features/chat/services/chatService';

export const useChatRoomByIdQuery = (roomId?: number) => {
  return useQuery({
    queryKey: ['chat-room', roomId],
    queryFn: () => {
      if (!roomId) throw new Error('RoomId is required');
      return getChatRoomById(roomId);
    },
    enabled: !!roomId,
    staleTime: 1000 * 60,
  });
};
