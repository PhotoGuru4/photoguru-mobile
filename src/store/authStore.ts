import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import type { User } from '@shared/types/user';
import { registerAuthHandlers } from '@lib/authSession';
import { API_ENDPOINTS } from '@shared/constants';
import { POST } from '@shared/services/apiService';

const secureStorage = {
  getItem: async (key: string): Promise<string | null> =>
    SecureStore.getItemAsync(key),

  setItem: async (key: string, value: string): Promise<void> =>
    SecureStore.setItemAsync(key, value),

  removeItem: async (key: string): Promise<void> =>
    SecureStore.deleteItemAsync(key),
};

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  setAuth: (user: User, token: string) => Promise<void>;
  updateToken: (token: string) => Promise<void>;
  clearAuth: () => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: async (user, token) => {
        await SecureStore.setItemAsync('accessToken', token);
        set({ user, token, isAuthenticated: true });
      },

      updateToken: async (token) => {
        await SecureStore.setItemAsync('accessToken', token);
        set({ token, isAuthenticated: true });
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      logout: async () => {
        try {
          await POST(API_ENDPOINTS.AUTH.LOGOUT);
        } catch {
          console.log('[Logout] API failed, force logout');
        } finally {
          await SecureStore.deleteItemAsync('accessToken');
          await SecureStore.deleteItemAsync('refreshToken');

          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

registerAuthHandlers({
  onLogout: () => {
    useAuthStore.getState().clearAuth();
  },
  onTokenUpdate: (token) => {
    useAuthStore.getState().updateToken(token);
  },
});
