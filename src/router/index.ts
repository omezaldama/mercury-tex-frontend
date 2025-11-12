import { createRouter, createWebHistory } from 'vue-router';

import appRoutes from '@/router/app-routes';
import authRoutes from '@/modules/auth/auth-routes';
import { fallbackRedirector, loggedInRedirector, loggedOutRedirector } from '@/modules/auth/util/redirectors';
import MainView from '@/views/MainView.vue';
import NotFound from '@/views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      beforeEnter: loggedOutRedirector,
      children: authRoutes,
      path: '/auth',
    },
    {
      beforeEnter: loggedInRedirector,
      component: MainView,
      children: appRoutes,
      path: '/app',
    },
    {
      beforeEnter: fallbackRedirector,
      component: NotFound,
      path: '/:pathMatch(.*)*',
    },
  ],
});

export default router;
