export interface ConceptChatCard {
  id: number;
  name: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  thumbnailUrl: string;

  photographer: {
    id: number;
    name: string;
    avatar?: string;
  };
}
