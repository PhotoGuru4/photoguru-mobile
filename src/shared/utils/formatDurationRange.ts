export const formatDurationRange = (
  packages?: { estimatedDuration: number }[],
): string => {
  if (!packages || packages.length === 0) {
    return 'No duration available';
  }

  const durations = packages
    .map((p) => p.estimatedDuration)
    .filter((d) => d != null);

  if (durations.length === 0) {
    return 'No duration available';
  }

  if (durations.length === 1) {
    return `${durations[0]} minutes`;
  }

  const min = Math.min(...durations);
  const max = Math.max(...durations);

  if (min === max) {
    return `${min} minutes`;
  }

  return `${min} - ${max} minutes`;
};
