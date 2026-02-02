import React, { forwardRef, useRef } from 'react';
import clsx from 'clsx';
import {
  View,
  TextInput,
  Pressable,
  TextInputProps,
  Animated,
  Platform,
} from 'react-native';
import { Text } from '@shared/components/common/Text';

export type InputSize = 'sm' | 'md' | 'lg';

interface FormInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
  inputSize?: InputSize;
  containerClassName?: string;
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-3 py-0.5 text-sm rounded-lg',
  md: 'px-3 py-1.5 text-base rounded-lg',
  lg: 'px-3 py-2 text-lg rounded-lg',
};

export const Input = forwardRef<TextInput, FormInputProps>(
  (
    {
      label,
      error,
      icon,
      onIconClick,
      inputSize = 'md',
      className,
      containerClassName,
      ...props
    },
    ref,
  ) => {
    const focusAnim = useRef(new Animated.Value(0)).current;

    const handleFocus = () => {
      Animated.timing(focusAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    };

    const handleBlur = () => {
      Animated.timing(focusAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    };

    const borderColor = focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['#D1D5DB', '#E06B80'],
    });

    const shadowOpacity = focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.25],
    });

    const shadowRadius = focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 6],
    });

    return (
      <View className={clsx('space-y-1', containerClassName)}>
        {label && (
          <Text variant="caption" className="text-gray-600 mb-2 font-medium">
            {label}
          </Text>
        )}

        <Animated.View
          style={{
            borderColor: error ? '#F87171' : borderColor,
            shadowColor: '#E06B80',
            shadowOpacity,
            shadowRadius,
            shadowOffset: { width: 0, height: 2 },
            elevation: Platform.OS === 'android'
              ? focusAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 3],
              })
              : 0,
          }}
          className={clsx(
            'border',
            'bg-white',
            icon && 'pr-12',
            sizeStyles[inputSize],
            'rounded-lg',
          )}
        >
          <TextInput
            ref={ref}
            placeholderTextColor="#9CA3AF"
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={clsx(
              'w-full',
              className,
            )}
            {...props}
          />

          {icon && (
            <Pressable
              onPress={onIconClick}
              className="absolute right-4 top-1/2 -translate-y-1/2"
              hitSlop={10}
            >
              {icon}
            </Pressable>
          )}
        </Animated.View>

        {error && (
          <Text variant="small" className="text-red-500">
            {error}
          </Text>
        )}
      </View>
    );
  },
);

Input.displayName = 'Input';

export default Input;
