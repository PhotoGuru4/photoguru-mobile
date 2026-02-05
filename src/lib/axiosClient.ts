import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

import { notifyLogout, notifyTokenUpdate } from '@lib/authSession';
import { API_ENDPOINTS } from '@/shared/constants';

const API_URL =
  Constants.expoConfig?.extra?.apiUrl ??
  'https://express-api-xxuh.onrender.com/api/v1';

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRoute =
      originalRequest?.url?.includes(API_ENDPOINTS.AUTH.LOGIN) ||
      originalRequest?.url?.includes('/auth/refresh-token');

    const hasToken = !!(await SecureStore.getItemAsync('accessToken'));

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute &&
      hasToken
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken =
          await SecureStore.getItemAsync('refreshToken');

        const res = await axios.post(
          `${API_URL}/auth/refresh-token`,
          { refreshToken },
        );

        const { accessToken } = res.data.data;

        await SecureStore.setItemAsync(
          'accessToken',
          accessToken,
        );

        notifyTokenUpdate(accessToken);

        originalRequest.headers.Authorization =
          `Bearer ${accessToken}`;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');

        notifyLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
