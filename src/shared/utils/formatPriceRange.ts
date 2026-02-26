export const formatPriceRange = (
  min?: number,
  max?: number,
): string => {
  if (min == null && max == null) {
    return 'Updating...';
  }

  const format = (amount: number): string => {
    if (amount === 0) return '0 VND';

    const absAmount = Math.abs(amount);

    if (absAmount >= 1_000_000_000) {
      return `${(amount / 1_000_000_000)
        .toFixed(1)
        .replace(/\.0+$/, '')}B VND`;
    }

    if (absAmount >= 1_000_000) {
      return `${(amount / 1_000_000)
        .toFixed(1)
        .replace(/\.0+$/, '')}M VND`;
    }

    if (absAmount >= 1_000) {
      return `${(amount / 1_000)
        .toFixed(1)
        .replace(/\.0+$/, '')}K VND`;
    }

    return `${amount} VND`;
  };

  if (min != null && max != null) {
    if (min === max) {
      return format(min);
    }

    return `${format(min)} - ${format(max)}`;
  }

  if (min != null) {
    return format(min);
  }

  return format(max as number);
};
