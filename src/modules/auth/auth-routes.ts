import type { RouteRecordRaw } from 'vue-router';
import LoginView from '@/modules/auth/views/LoginView.vue';
import SignupView from '@/modules/auth/views/SignupView.vue';

export const authRoutes: RouteRecordRaw[] = [
  {
    component: LoginView,
    name: 'login-view',
    path: 'login',
  },
  {
    component: SignupView,
    name: 'signup-view',
    path: 'signup',
  },
];

export default authRoutes;
