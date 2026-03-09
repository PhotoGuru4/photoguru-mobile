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
  required?: boolean;
  error?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
  inputSize?: InputSize;
  containerClassName?: string;
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-3 h-12 text-sm rounded-lg',
  md: 'px-3 h-14 text-base rounded-lg',
  lg: 'px-3 h-16 text-lg rounded-lg',
};

export const Input = forwardRef<TextInput, FormInputProps>(
  (
    {
      label,
      required,
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
          <Text variant="caption" className="text-gray-600 mb-2">
            {label}
            {required && <Text className="text-pink-500"> *</Text>}
          </Text>
        )}

        <Animated.View
          style={{
            borderColor: error ? '#F87171' : borderColor,
            shadowColor: '#E06B80',
            shadowOpacity,
            shadowRadius,
            shadowOffset: { width: 0, height: 2 },
            elevation:
              Platform.OS === 'android'
                ? focusAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 3],
                })
                : 0,
          }}
          className={clsx(
            'border bg-white rounded-lg flex-row items-center',
            sizeStyles[inputSize],
          )}
        >
          <TextInput
            ref={ref}
            placeholderTextColor="#9CA3AF"
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={clsx('flex-1', className)}
            {...props}
          />

          {icon && (
            <Pressable
              onPress={onIconClick}
              className="ml-2"
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
