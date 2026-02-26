export const formatPrice = (price?: number): string => {
  if (price == null) return 'Updating...';
  if (price === 0) return '0 VND';

  const absAmount = Math.abs(price);

  if (absAmount >= 1_000_000_000) {
    return `${(price / 1_000_000_000)
      .toFixed(1)
      .replace(/\.0+$/, '')}B VND`;
  }

  if (absAmount >= 1_000_000) {
    return `${(price / 1_000_000)
      .toFixed(1)
      .replace(/\.0+$/, '')}M VND`;
  }

  if (absAmount >= 1_000) {
    return `${(price / 1_000)
      .toFixed(1)
      .replace(/\.0+$/, '')}K VND`;
  }

  return `${price} VND`;
};
