import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

import { notifyLogout, notifyTokenUpdate } from '@lib/authSession';
import { API_ENDPOINTS } from '@shared/constants';

const API_URL =
  Constants.expoConfig?.extra?.apiUrl ??
  'https://photoguru-api.onrender.com/api/v1';

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

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
      originalRequest?.url?.includes(API_ENDPOINTS.AUTH.REFRESH) ||
      originalRequest?.url?.includes(API_ENDPOINTS.AUTH.LOGOUT);

    const hasToken = !!(await SecureStore.getItemAsync('accessToken'));

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute &&
      hasToken
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosClient(originalRequest));
          });
        });
      }
      try {
        isRefreshing = true;
        const refreshToken =
          await SecureStore.getItemAsync('refreshToken');

        if (!refreshToken) {
          notifyLogout();
          return Promise.reject(error);
        }

        const res = await axiosClient.post(
          API_ENDPOINTS.AUTH.REFRESH,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        const { access_token } = res.data.data;

        await SecureStore.setItemAsync(
          'accessToken',
          access_token,
        );

        notifyTokenUpdate(access_token);
        onRefreshed(access_token);

        originalRequest.headers.Authorization =
          `Bearer ${access_token}`;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');

        notifyLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
