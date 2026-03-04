export const getSafeImage = (
  uri?: string | null,
  fallback?: string,
): string => {
  if (!uri) return fallback ?? '';

  const trimmed = uri.trim();

  if (!trimmed) return fallback ?? '';

  if (trimmed === 'null' || trimmed === 'undefined') {
    return fallback ?? '';
  }

  return trimmed;
};
