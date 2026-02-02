import React from 'react';
import {
  Modal as RNModal,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import clsx from 'clsx';
import { Text } from '@shared/components/common/Text';

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  width?: 'sm' | 'md' | 'lg';
}

const widthStyles: Record<NonNullable<ModalProps['width']>, string> = {
  sm: 'w-[280px]',
  md: 'w-[320px]',
  lg: 'w-[360px]',
};

export const Modal = ({
  open,
  onClose,
  title,
  children,
  footer,
  className,
  width = 'md',
}: ModalProps) => {
  return (
    <RNModal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 items-center justify-center"
      >
        <Pressable
          className="absolute inset-0 bg-black/40"
          onPress={onClose}
        />

        <View
          className={clsx(
            'bg-white rounded-2xl px-6 py-5 shadow-xl',
            widthStyles[width],
            className,
          )}
        >
          {title && (
            <Text
              variant="subtitle"
              className="mb-4 font-semibold text-gray-800"
              align="center"
            >
              {title}
            </Text>
          )}

          <View className="space-y-4">
            {children}
          </View>

          {footer && (
            <View className="mt-6 flex-row justify-end space-x-3">
              {footer}
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
};

export default Modal;
