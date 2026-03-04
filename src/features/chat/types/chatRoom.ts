
export interface ChatRoom {
  id: number;
  photographerId: number;
  clientId: number;
  conceptId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatRoomListItem {
  id: number;
  participant: {
    id: number;
    name: string;
    avatar?: string;
  };
  lastMessage: string | null;
  lastMessageTime: string | null;
  unreadCount: number;
  createdAt: string;
}

export interface ChatRoomDetail {
  id: number;
  photographerId: number;
  clientId: number;
  conceptId: number;

  createdAt: string;
  updatedAt: string;

  client: {
    id: number;
    fullName: string;
    avatarUrl: string;
  };

  photographer: {
    userId: number;
    bio: string;
    experienceYears: number;
    ratingAvg: number;
    isVerified: boolean;
    socialLinks: string | null;

    user: {
      fullName: string;
      avatarUrl: string;
    };
  };

  concept: {
    id: number;
    name: string;
    thumbnailUrl: string;
    description: string;
    minPrice: number;
    maxPrice: number;
    priceRange: string;
  };
}
