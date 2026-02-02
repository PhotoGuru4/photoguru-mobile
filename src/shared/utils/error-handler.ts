import axios from 'axios';
import { COMMON_MESSAGES } from '@shared/constants/messages';

interface ApiErrorData {
  message: string;
  error?: string;
}

export const getApiErrorMessage = (
  error: unknown,
  fallbackMessage: string = COMMON_MESSAGES.API_ERROR,
): string => {
  if (axios.isAxiosError<ApiErrorData>(error)) {
    return (
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      fallbackMessage
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};
