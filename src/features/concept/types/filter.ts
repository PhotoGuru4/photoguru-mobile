import type { PriceSort } from '@shared/constants';

export interface ConceptFilters {
  provinceCode?: number;
  province?: string;
  ward?: string;
  sortByPrice?: PriceSort;
}
