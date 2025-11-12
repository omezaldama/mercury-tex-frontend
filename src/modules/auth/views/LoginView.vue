<template>
  <div class="login-form-container">
    <div class="login-form-header">
      <h2><b>Venus TeX</b></h2>
    </div>
    <div class="login-form-header">
      <h3><b>Login</b></h3>
    </div>
    <IftaLabel class="login-form-element">
      <InputText
        fluid
        id="email"
        placeholder="email@example.com"
        v-model="email"
      />
      <label for="email">Email</label>
    </IftaLabel>
    <IftaLabel class="login-form-element">
      <Password
        fluid
        id="password"
        :feedback="false"
        label="Password"
        placeholder="********"
        toggleMask
        v-model="password"
      />
      <label for="password">Password</label>
    </IftaLabel>
    <div class="login-form-element">
      <Toast />
      <Button
        label="Login"
        @click="attemptLogin"
        :loading="isLoading"
      ></Button>
    </div>
    <div class="login-form-element">
      Do not have an account yet?
      <RouterLink :to="{ name: 'signup-view' }">Signup!</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Ref } from 'vue';
import Button from 'primevue/button';
import IftaLabel from 'primevue/iftalabel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

import useAuthStore from '@/stores/auth-store';
import useUserStore from '@/stores/user-store';
import { RequestsService } from '@/modules/common/services/requests-service';
import type { LoginToken } from '@/modules/auth/types/auth-types';
import { apiRoutes } from '@/modules/common/constants/api';

const requests = new RequestsService();

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();
const userStore = useUserStore();

const email: Ref<string> = ref('');
const isLoading: Ref<boolean> = ref(false);
const password: Ref<string> = ref('');

const attemptLogin = async (): Promise<void> => {
  isLoading.value = true;
  const loginData = {
    email: email.value,
    password: password.value,
  };
  const response = await requests.post<LoginToken>(apiRoutes.auth.login, loginData);
  if ('errors' in response) {
    toast.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
    isLoading.value = false;
    return;
  }
  const { token } = response.data;
  authStore.setToken(token);
  authStore.startTokenRefreshInterval();
  await userStore.fetchUser();
  isLoading.value = false;
  router.push({ name: 'user-dashboard-view' });
};
</script>

<style scoped>
.login-form-container {
  border-radius: 15px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.08);
  margin: auto;
  margin-top: 120px;
  padding: 20px 25px 35px 30px;
  max-width: 500px;
  min-width: 350px;
}
.login-form-element {
  margin-bottom: 15px;
  margin-top: 15px;
  width: 100%;
}
.login-form-header {
  text-align: center;
}
</style>
