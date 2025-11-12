<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

import { useAuthStore } from '@/stores/auth-store';
import { useThemeStore } from '@/stores/theme-store';

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.initializeTheme();
});

onUnmounted(() => {
  const authStore = useAuthStore();
  authStore.stopTokenRefreshInterval();
});
</script>
