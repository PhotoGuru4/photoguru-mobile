export const PRICE_SORT = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type PriceSort =
  typeof PRICE_SORT[keyof typeof PRICE_SORT];
