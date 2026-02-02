import React from 'react';
import clsx from 'clsx';
import { Text as RNText, TextStyle } from 'react-native';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingColor = 'default' | 'muted' | 'pink' | 'pinkSoft' | 'white';

interface HeadingProps {
  children: React.ReactNode;
  level?: HeadingLevel;
  color?: HeadingColor;
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  className?: string;
  style?: TextStyle;
}

const colorStyles: Record<HeadingColor, string> = {
  default: 'text-gray-700',
  white: 'text-white',
  muted: 'text-gray-400',
  pink: 'text-pink-500',
  pinkSoft: 'text-pink-400',
};

const levelStyles: Record<HeadingLevel, string> = {
  1: 'text-4xl font-bold',
  2: 'text-3xl font-bold',
  3: 'text-2xl font-semibold',
  4: 'text-xl font-semibold',
  5: 'text-lg font-medium',
  6: 'text-base font-medium',
};

const alignStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const Heading = ({
  children,
  level = 1,
  color = 'default',
  align = 'left',
  truncate = false,
  className,
  style,
}: HeadingProps) => {
  return (
    <RNText
      numberOfLines={truncate ? 1 : undefined}
      className={clsx(
        levelStyles[level],
        colorStyles[color],
        alignStyles[align],
        className,
      )}
      style={style}
    >
      {children}
    </RNText>
  );
};

export default Heading;
