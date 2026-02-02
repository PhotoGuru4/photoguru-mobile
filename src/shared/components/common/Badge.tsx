import clsx from 'clsx';
import { View } from 'react-native';
import { Text } from '@shared/components/common/Text';

export type BadgeColor = 'green' | 'yellow' | 'gray' | 'pink';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  label: string;
  color?: BadgeColor;
  size?: BadgeSize;
  className?: string;
}

const colorStyles: Record<BadgeColor, string> = {
  green: 'bg-green-100 border border-green-200',
  yellow: 'bg-yellow-100 border border-yellow-200',
  gray: 'bg-gray-100 border border-gray-200',
  pink: 'bg-pink-100',
};

const textColorStyles: Record<BadgeColor, string> = {
  green: 'text-green-700',
  yellow: 'text-yellow-700',
  gray: 'text-gray-600',
  pink: 'text-pink-500',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-4 py-1',
  md: 'px-5 py-1.5',
  lg: 'px-6 py-2',
};

const textSizeStyles: Record<BadgeSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export const Badge = ({
  label,
  color = 'gray',
  size = 'md',
  className,
}: BadgeProps) => {
  return (
    <View
      className={clsx(
        'self-start rounded-full',
        'items-center justify-center',
        sizeStyles[size],
        colorStyles[color],
        className,
      )}
    >
      <Text
        variant="small"
        className={clsx(
          'font-semibold',
          'whitespace-nowrap',
          textColorStyles[color],
          textSizeStyles[size],
        )}
      >
        {label}
      </Text>
    </View>
  );
};

export default Badge;
