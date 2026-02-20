import { API_ENDPOINTS, PAGE_LIMIT } from '@shared/constants';
import { GET } from '@shared/services/apiService';
import type { ConceptListResponse } from '@features/concept/types/concept';
import type { PriceSort } from '@shared/constants/sort';
import type { ConceptDetail } from '@features/concept/types/concept';

export interface SearchConceptParams {
  keyword?: string;
  province?: string;
  ward?: string;
  sortByPrice?: PriceSort;
  limit?: number;
  cursor?: string;
}

export const searchConceptsRequest = (
  params: SearchConceptParams,
) => {
  return GET<ConceptListResponse>(
    API_ENDPOINTS.CONCEPT.SEARCH,
    {
      params: {
        keyword: params.keyword,
        province: params.province,
        ward: params.ward,
        sortByPrice: params.sortByPrice,
        limit: params.limit ?? PAGE_LIMIT.DEFAULT,
        cursor: params.cursor,
      },
    },
  );
};

export const getRecommendedConceptsRequest = (
  cursor?: string,
) => {
  return GET<ConceptListResponse>(
    API_ENDPOINTS.CONCEPT.RECOMMENDED,
    {
      params: {
        limit: PAGE_LIMIT.DEFAULT,
        cursor,
      },
    },
  );
};

export const getConceptDetailRequest = (
  id: number,
) => {
  return GET<ConceptDetail>(
    API_ENDPOINTS.CONCEPT.DETAIL(id),
  );
};

export const getRelatedConceptsRequest = (
  id: number,
  cursor?: string,
) => {
  return GET<ConceptListResponse>(
    API_ENDPOINTS.CONCEPT.RELATED(id),
    {
      params: {
        limit: PAGE_LIMIT.DEFAULT,
        cursor,
      },
    },
  );
};
