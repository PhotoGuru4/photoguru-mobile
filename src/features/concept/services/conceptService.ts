import { API_ENDPOINTS, PAGE_LIMIT } from '@shared/constants';
import { GET } from '@shared/services/apiService';
import type { ConceptListResponse } from '@features/concept/types/concept';
import type { PriceSort } from '@shared/constants/sort';

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
