export const formatPriceRange = (
  min?: number,
  max?: number,
): string => {
  if (min == null && max == null) {
    return 'Updating...';
  }

  if (min != null && max != null) {
    if (min === max) {
      return `${min.toLocaleString()} VND`;
    }

    return `${min.toLocaleString()} - ${max.toLocaleString()} VND`;
  }

  if (min != null) {
    return `${min.toLocaleString()} VND`;
  }

  return `${max?.toLocaleString()} VND`;
};
