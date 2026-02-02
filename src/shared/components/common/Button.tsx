import React from 'react';
import { Pressable, View } from 'react-native';
import clsx from 'clsx';
import { Text } from '@shared/components/common/Text';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonIconPosition = 'prefix' | 'suffix';
export type ButtonColor = 'pink' | 'pinkSoft' | 'red' | 'gray';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  icon?: React.ReactNode;
  iconPosition?: ButtonIconPosition;
  fullWidth?: boolean;
  disabled?: boolean;
  shadow?: boolean;
  onPress?: () => void;
  className?: string;
  unstyled?: boolean;
}

const bgStyles: Record<ButtonColor, string> = {
  pink: 'bg-pink-500',
  pinkSoft: 'bg-pink-300',
  red: 'bg-red-500',
  gray: 'bg-gray-400',
};

const borderStyles: Record<ButtonColor, string> = {
  pink: 'border-pink-400',
  pinkSoft: 'border-pink-200',
  red: 'border-red-400',
  gray: 'border-gray-300',
};

const textStyles: Record<ButtonColor, string> = {
  pink: 'text-pink-500',
  pinkSoft: 'text-pink-600',
  red: 'text-red-500',
  gray: 'text-gray-600',
};

const shadowStyles: Record<ButtonColor, string> = {
  pink: 'shadow-pink-500/30',
  pinkSoft: 'shadow-pink-100/30',
  red: 'shadow-red-500/30',
  gray: 'shadow-gray-400/30',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 rounded-md',
  md: 'px-5 py-3 rounded-lg',
  lg: 'px-6 py-4 rounded-xl',
};

export const Button = ({
  children,
  variant = 'solid',
  size = 'md',
  color = 'pink',
  icon,
  iconPosition = 'prefix',
  fullWidth = false,
  disabled = false,
  shadow = false,
  onPress,
  className,
  unstyled = false,
}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        transform: [{ scale: pressed && !disabled ? 0.96 : 1 }],
      })}
      className={clsx(
        'flex-row items-center justify-center',
        !unstyled && sizeStyles[size],

        !unstyled &&
          variant === 'solid' &&
          bgStyles[color],

        !unstyled &&
          variant === 'outline' &&
          'border bg-white',
        !unstyled &&
          variant === 'outline' &&
          borderStyles[color],

        fullWidth && 'w-full',
        shadow && 'shadow-md',
        shadow && shadowStyles[color],
        disabled && 'opacity-50',
        className,
      )}
    >
      <View className="flex-row items-center gap-2">
        {icon && iconPosition === 'prefix' && icon}

        {typeof children === 'string' ? (
          <Text
            className={clsx(
              'font-semibold',
              variant === 'solid' && 'text-white',
              variant !== 'solid' && textStyles[color],
            )}
          >
            {children}
          </Text>
        ) : (
          children
        )}

        {icon && iconPosition === 'suffix' && icon}
      </View>
    </Pressable>
  );
};

export default Button;
