import { useQueries } from '@tanstack/react-query';
import { getChatConceptCard } from '@features/chat/services/chatService';

export const useConceptChatCardQueries = (
  conceptIds: number[],
) => {
  return useQueries({
    queries: conceptIds.map((id) => ({
      queryKey: ['concept-chat-card', id],
      queryFn: () => getChatConceptCard(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
    })),
  });
};
