import { useMemo } from 'react';
import { useChatRoomsQuery } from '@features/chat/hooks/queries/useChatRoomsQuery';
import { formatChatTime } from '@shared/utils/time';
import { sendConceptMessage } from '@features/chat/services/chatConceptFirebaseService';
import { useCreateChatRoomMutation } from '@features/chat/hooks/queries/useCreateChatRoomMutation';

export interface ConversationUI {
  id: string;
  participantId: number;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  rawTime: number;
}

export const useChatMessages = () => {
  const { data, isLoading, isError, refetch } =
    useChatRoomsQuery();

  const createRoomMutation =
    useCreateChatRoomMutation();

  const conversations: ConversationUI[] = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data
      .map((room) => {
        const timeSource =
          room.lastMessageTime ?? room.createdAt;

        const rawTime = timeSource
          ? new Date(timeSource).getTime()
          : 0;

        return {
          id: String(room.id),
          participantId: room.participant.id,
          name: room.participant.name,
          avatar: room.participant.avatar,
          lastMessage:
            room.lastMessage ||
            'Start your conversation...',
          time: formatChatTime(rawTime),
          rawTime,
        };
      })
      .sort((a, b) => b.rawTime - a.rawTime);
  }, [data]);

  const createRoomAndSendConcept = async (
    photographerId: number,
    conceptId: number,
    senderId: number,
  ) => {
    try {
      const room =
        await createRoomMutation.mutateAsync({
          photographerId,
          conceptId,
        });

      const roomId = String(room.id);

      await sendConceptMessage(
        roomId,
        senderId,
        conceptId,
      );

      await refetch();

      return roomId;
    } catch (error) {
      console.error(
        'CREATE ROOM & SEND ERROR:',
        error,
      );
      throw error;
    }
  };

  return {
    conversations,
    isLoading,
    isError,
    refetch,
    createRoomAndSendConcept,
    isCreating:
      createRoomMutation.isPending,
  };
};
