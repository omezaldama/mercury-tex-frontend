import type { RouteLocationGeneric } from 'vue-router';
import useAuthStore from '@/stores/auth-store';
import useUserStore from '@/stores/user-store';

const fallbackRedirector = async (_: RouteLocationGeneric) => {
  const authStore = useAuthStore();

  if (authStore.isLoggedIn) {
    return { name: 'user-dashboard-view' };
  }

  await authStore.refreshToken();
  if (authStore.isLoggedIn) {
    return { name: 'user-dashboard-view' };
  }

  authStore.logout();
  return { name: 'login-view' };
};

const loggedOutRedirector = () => {
  const authStore = useAuthStore();
  if (authStore.isLoggedIn) return { name: 'user-dashboard-view' };
  return true;
};

const loggedInRedirector = async () => {
  const authStore = useAuthStore();
  const userStore = useUserStore();

  if (authStore.isLoggedIn) {
    if (!userStore.user) await userStore.fetchUser();
    authStore.startTokenRefreshInterval();
    return true;
  }

  await authStore.refreshToken();
  if (!authStore.isLoggedIn) {
    authStore.logout();
    return { name: 'login-view' };
  }
  if (!userStore.user) await userStore.fetchUser();
  authStore.startTokenRefreshInterval();
  return true;
};

export {
  fallbackRedirector,
  loggedInRedirector,
  loggedOutRedirector,
};
