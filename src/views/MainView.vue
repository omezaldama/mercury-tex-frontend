<template>
  <MainNavBar></MainNavBar>
  <Toast></Toast>
  <main>
    <RouterView></RouterView>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Toast from 'primevue/toast';
import MainNavBar from '@/modules/common/components/MainNavBar.vue';
</script>

<style scoped>
.page-container {
  display: flex;
  flex-flow: column;
  height: 100vh;
}

.main-container {
  display: flex;
  flex-grow: 1;
  width: 100%;
}
</style>
