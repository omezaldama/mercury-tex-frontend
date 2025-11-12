import type { RouteRecordRaw } from 'vue-router';

import UserDashboardView from './views/UserDashboardView.vue';

export const usersRoutes: RouteRecordRaw[] = [
  {
    component: UserDashboardView,
    name: 'user-dashboard-view',
    path: 'dashboard',
  },
];

export default usersRoutes;
