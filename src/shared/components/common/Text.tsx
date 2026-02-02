import React from 'react';
import clsx from 'clsx';
import { Text as RNText, TextStyle } from 'react-native';

export type TextVariant = 'subtitle' | 'body' | 'caption' | 'small';
export type TextColor = 'default' | 'muted' | 'pink' | 'pinkSoft' | 'white';

interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  align?: 'left' | 'center' | 'right';
  lineClamp?: 1 | 2 | 3 | 4;
  className?: string;
  maxWidth?: number;
  style?: TextStyle;
}

const variantStyles: Record<TextVariant, string> = {
  subtitle: 'text-lg font-semibold',
  body: 'text-base',
  caption: 'text-sm',
  small: 'text-xs',
};

const colorStyles: Record<TextColor, string> = {
  default: 'text-gray-800',
  muted: 'text-gray-400',
  pink: 'text-pink-500',
  pinkSoft: 'text-pink-400',
  white: 'text-white',
};

const alignStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const Text = ({
  children,
  variant = 'body',
  color = 'default',
  align = 'left',
  lineClamp,
  className,
  maxWidth,
  style,
}: TextProps) => {
  return (
    <RNText
      numberOfLines={lineClamp}
      className={clsx(
        variantStyles[variant],
        colorStyles[color],
        alignStyles[align],
        className,
      )}
      style={[
        maxWidth ? { maxWidth } : null,
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

export default Text;
