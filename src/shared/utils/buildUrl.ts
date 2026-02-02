export const buildUrl = (
  endpoint: string,
  params?: Record<
    string,
    string | number | boolean | null | undefined
  >,
): string => {
  if (!params) return endpoint;

  const url = new URL(endpoint, window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });

  return url.pathname + url.search;
};
