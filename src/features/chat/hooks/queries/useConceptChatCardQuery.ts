import { useQuery } from '@tanstack/react-query';
import { getChatConceptCard } from '@features/chat/services/chatService';

export const useConceptChatCardQuery = (conceptId?: number) => {
  return useQuery({
    queryKey: ['concept-chat-card', conceptId],
    queryFn: () => getChatConceptCard(conceptId!),
    enabled: !!conceptId,
    staleTime: 1000 * 60 * 5,
  });
};
