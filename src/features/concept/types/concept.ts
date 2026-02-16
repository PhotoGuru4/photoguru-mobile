export interface Concept {
  id: number;
  name: string;
  price: number;
  thumbnailUrl: string;
  tier: string;
  photographerId: number;
  photographerName: string;
  categoryName: string;
}

export interface ConceptMeta {
  nextCursor: string | null;
  hasNextPage: boolean;
}

export interface ConceptListResponse {
  items: Concept[];
  meta: ConceptMeta;
}
