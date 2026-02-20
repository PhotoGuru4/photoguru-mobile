import { CONCEPT_TIER } from '@shared/constants/concept';

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

export interface Photographer {
  id: number;
  fullName: string;
  avatarUrl: string;
  ratingAvg: number;
  province: string;
  bio: string;
}

export interface ConceptPhoto {
  id: number;
  imageUrl: string;
}

export interface ConceptLocation {
  province: string;
  ward: string;
  addressDetail: string | null;
}

export interface ConceptDetail {
  id: number;
  name: string;
  description: string;
  price: number;
  estimatedDuration: number;
  tier: keyof typeof CONCEPT_TIER;
  thumbnailUrl: string;
  categoryName: string;
  photographer: Photographer;
  photos: ConceptPhoto[];
  locations: ConceptLocation[];
}
