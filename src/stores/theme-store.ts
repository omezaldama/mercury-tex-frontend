import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

import type { VenusTheme } from '@/modules/common/types/theme-types';
import { darkModeClass } from '@/modules/common/constants/styles-constants';

export const useThemeStore = defineStore('theme', () => {
  // State:
  const theme: Ref<VenusTheme> = ref('light');

  // Actions:
  const initializeTheme = () => {
    const storedTheme = localStorage.getItem('venus-theme') === 'light' ? 'light' : 'dark';
    localStorage.setItem('venus-theme', storedTheme);
    theme.value = storedTheme;
    if (theme.value === 'light') {
      document.documentElement.classList.remove(darkModeClass);
    }
    else {
      document.documentElement.classList.add(darkModeClass);
    }
  };

  const toggleTheme = () => {
    if (theme.value === 'light') {
      theme.value = 'dark';
      localStorage.setItem('venus-theme', 'dark');
      document.documentElement.classList.add(darkModeClass);
    }
    else {
      theme.value = 'light';
      localStorage.setItem('venus-theme', 'light');
      document.documentElement.classList.remove(darkModeClass);
    }
  };

  return {
    theme,
    initializeTheme,
    toggleTheme,
  };
});
