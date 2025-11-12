<template>
  <Menubar :model="items">
    <template #end>
      <div class="flex items-center gap-2">
          <Button
            class="mr-1 ml-1"
            severity="primary"
            size="small"
            :icon="darkModeButtonIcon"
            @click="toggleDarkMode"
          ></Button>
          <Button
            class="mr-1 ml-1"
            icon="pi pi-sign-out"
            label="Logout"
            severity="secondary"
            size="small"
            @click="attemptLogout"
          ></Button>
      </div>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';

import useAuthStore from '@/stores/auth-store';
import useUserStore from '@/stores/user-store';
import RequestsService from '@/modules/common/services/requests-service';
import { apiRoutes } from '@/modules/common/constants/api';
import { useThemeStore } from '@/stores/theme-store';

const requests = new RequestsService();

const router = useRouter();
const themeStore = useThemeStore();

const items = ref([
  {
    label: 'Venus TeX',
    icon: 'pi pi-home',
  },
]);

const attemptLogout = async () => {
  useUserStore().clearUser();
  useAuthStore().logout();
  await requests.post(apiRoutes.auth.logout);
  router.push({ name: 'login-view' });
};

const toggleDarkMode = () => {
  themeStore.toggleTheme();
}

const darkModeButtonIcon = computed(
  () => themeStore.theme === 'light'? 'pi pi-moon' : 'pi pi-sun'
);
</script>
