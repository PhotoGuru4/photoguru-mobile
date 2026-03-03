import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createChatRoom } from '@features/chat/services/chatService';

export const useCreateChatRoomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChatRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chat-rooms'],
      });
    },
  });
};
