type FirestoreTimestampLike = {
  seconds: number;
  nanoseconds?: number;
};

type ChatTimeInput =
  | Date
  | string
  | number
  | FirestoreTimestampLike
  | null
  | undefined;

export const formatChatTime = (input: ChatTimeInput): string => {
  if (!input) return '';

  let date: Date;

  if (
    typeof input === 'object' &&
    'seconds' in input &&
    typeof input.seconds === 'number'
  ) {
    date = new Date(input.seconds * 1000);
  } else {
    date = new Date(input as string | number | Date);
  }

  if (isNaN(date.getTime())) {
    return '';
  }

  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24 && now.toDateString() === date.toDateString())
    return `${diffHours}h ago`;

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (yesterday.toDateString() === date.toDateString())
    return 'Yesterday';

  if (now.getFullYear() === date.getFullYear()) {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
    });
  }

  return date.toLocaleDateString('en-GB');
};
