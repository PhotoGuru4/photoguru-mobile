export const throwApiError = (error: unknown): never => {
  if (error && typeof error === 'object' && 'response' in error) {
    const err = error as {
      response?: {
        status?: number
        data?: {
          message?: string
          error?: string
        }
      }
      message?: string
    };

    const message =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      'Unknown error';

    throw new Error(message);
  }

  if (error && typeof error === 'object' && 'request' in error) {
    throw new Error('Network Error: No response received');
  }

  if (error && typeof error === 'object' && 'message' in error) {
    throw new Error((error as { message: string }).message);
  }

  throw new Error('Unknown Error');
};

