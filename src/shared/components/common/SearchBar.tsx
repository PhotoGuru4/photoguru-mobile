import React from 'react';
import { View, TextInput } from 'react-native';
import clsx from 'clsx';
import { Search } from 'lucide-react-native';

export type SearchBarSize = 'sm' | 'md' | 'lg';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: SearchBarSize;
  className?: string;
}

const sizeStyles: Record<SearchBarSize, string> = {
  sm: 'px-3 py-0.3 rounded-full',
  md: 'px-3 py-1 rounded-full',
  lg: 'px-3 py-1.5 rounded-full',
};

const textSizes: Record<SearchBarSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
};

const iconSizes: Record<SearchBarSize, number> = {
  sm: 18,
  md: 20,
  lg: 24,
};

export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search...',
  size = 'md',
  className,
}: SearchBarProps) => {
  return (
    <View
      className={clsx(
        'flex-row items-center gap-2',
        'w-full border border-gray-200 bg-white',
        sizeStyles[size],
        className,
      )}
    >
      <Search size={iconSizes[size]} color="#9CA3AF" />

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        className={clsx(
          'flex-1 text-gray-700',
          textSizes[size],
        )}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
};

export default SearchBar;
