export interface Concept {
  id: number;
  name: string;
  minPrice: number;
  maxPrice: number;
  thumbnailUrl: string;
  tier: string;
  photographerId: number;
  photographerName: string;
  photographerAvatar: string;
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

export interface ConceptPackage {
  id: number;
  description: string;
  estimatedDuration: number;
  price: number;
  tier: string;
}

export interface ConceptDetail {
  id: number;
  name: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  thumbnailUrl: string;
  categoryName: string;
  photographer: Photographer;
  photos: ConceptPhoto[];
  locations: ConceptLocation[];
  packages: ConceptPackage[];
}
