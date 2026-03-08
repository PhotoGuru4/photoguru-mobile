export const API_ENDPOINTS = {
  AUTH:{
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },
  LOCATION: 'https://provinces.open-api.vn/api/v2',
  CONCEPT: {
    RECOMMENDED: '/concepts/recommended',
    SEARCH: '/concepts',
    DETAIL: (id: number) => `/concepts/${id}`,
    RELATED: (id: number) => `/concepts/${id}/related`,
  },
  USER: {
    PROFILE: '/users/profile',
  },
  CHATROOM: {
    CHATROOMS: '/chat-rooms',
    CHATROOMID: (id: number) => `/chat-rooms/${id}`,
    CREATECHATROOM: '/chat-rooms',
    CHATCONCEPTCARD: (conceptId: number) => `/concepts/${conceptId}/chat-card`,
  },
  AI_GUIDE: {
    ANALYZE: '/ai-guide/analyze',
    EDIT: '/ai-guide/edit',
  },
};
