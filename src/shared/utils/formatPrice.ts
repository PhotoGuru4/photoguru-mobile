export const formatPrice = (price?: number): string => {
  if (!price && price !== 0) return 'Updating...';

  return `${price.toLocaleString()} VND`;
};
