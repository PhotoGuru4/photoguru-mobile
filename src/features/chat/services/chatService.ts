import { GET, POST } from '@shared/services/apiService';
import { API_ENDPOINTS } from '@shared/constants';

import type { ChatRoom, ChatRoomDetail, ChatRoomListItem } from '@features/chat/types/chatRoom';
import { ConceptChatCard } from '@features/chat/types/conceptCard';

export const getChatRooms = (): Promise<ChatRoomListItem[]> => {
  return GET<ChatRoomListItem[]>(
    API_ENDPOINTS.CHATROOM.CHATROOMS,
  );
};

export const getChatRoomById = (
  id: number,
): Promise<ChatRoomDetail> => {
  return GET<ChatRoomDetail>(
    API_ENDPOINTS.CHATROOM.CHATROOMID(id),
  );
};

export const getChatConceptCard = (
  conceptId: number,
): Promise<ConceptChatCard> => {
  return GET<ConceptChatCard>(
    API_ENDPOINTS.CHATROOM.CHATCONCEPTCARD(conceptId),
  );
};

export const createChatRoom = (data: {
  photographerId: number;
  conceptId: number;
}): Promise<ChatRoom> => {
  return POST<ChatRoom>(
    API_ENDPOINTS.CHATROOM.CREATECHATROOM,
    data,
  );
};
