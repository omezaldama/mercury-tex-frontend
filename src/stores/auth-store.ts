import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Ref } from 'vue';

import RequestsService from '@/modules/common/services/requests-service';
import type { LoginToken } from '@/modules/auth/types/auth-types';
import { apiRoutes } from '@/modules/common/constants/api';

export const useAuthStore = defineStore('auth', () => {
  const requestsService = new RequestsService();

  // State
  const token: Ref<string | null> = ref(null);
  const refresher: Ref<number | null> = ref(null);

  // Getters
  const isLoggedIn = computed(() => token.value !== null);

  // Actions
  const deleteToken = () => {
    token.value = null;
  };

  const logout = () => {
    deleteToken();
    stopTokenRefreshInterval();
  };

  const refreshToken = async () => {
    const response = await requestsService.post<LoginToken>(apiRoutes.auth.refreshToken, null);
    if ('errors' in response || !response.data) {
      logout();
      return;
    };
    const { token: newToken } = response.data;
    token.value = newToken;
  };

  const setToken = (newToken: string) => {
    token.value = newToken;
  };

  const startTokenRefreshInterval = () => {
    if (refresher.value === null) {
      const ms = import.meta.env.VITE_REFRESH_TOKEN_MS;
      refresher.value = setInterval(refreshToken, ms);
    }
  };

  const stopTokenRefreshInterval = () => {
    clearInterval(refresher.value || undefined);
    refresher.value = null;
  };

  return {
    token,
    isLoggedIn,
    deleteToken,
    logout,
    refreshToken,
    setToken,
    startTokenRefreshInterval,
    stopTokenRefreshInterval,
  };
});

export default useAuthStore;
