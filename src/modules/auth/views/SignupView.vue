<template>  
  <div class="signup-form-container">
    <div class="signup-form-header">
      <h2><b>Venus TeX</b></h2>
    </div>
    <div class="signup-form-header">
      <h3><b>Sign up</b></h3>
    </div>
    <IftaLabel class="signup-form-element">
      <InputText
        fluid
        id="first-name"
        placeholder="Albert"
        v-model="firstName"
      />
      <label for="first-name">First Name</label>
    </IftaLabel>
    <IftaLabel class="signup-form-element">
      <InputText
        fluid
        id="last-name"
        placeholder="Einstein"
        v-model="lastName"
      />
      <label for="last-name">Last Name</label>
    </IftaLabel>
    <IftaLabel class="signup-form-element">
      <InputText
        fluid
        id="email"
        placeholder="email@example.com"
        v-model="email"
      />
      <label for="email">Email</label>
    </IftaLabel>
    <IftaLabel class="signup-form-element">
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
    <div class="signup-form-element">
      <Toast />
      <Button
        label="Signup"
        @click="attemptSignup"
        :loading="isLoading"
      />
    </div>
    <div class="login-form-element">
      Already have an account?
      <RouterLink :to="{ name: 'login-view' }">Login!</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Ref } from 'vue';
import Button from 'primevue/button';
import { IftaLabel } from 'primevue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

import { RequestsService } from '@/modules/common/services/requests-service';
import { apiRoutes } from '@/modules/common/constants/api';

const requests = new RequestsService();

const router = useRouter();
const toast = useToast();

const firstName: Ref<string> = ref('');
const lastName: Ref<string> = ref('');
const email: Ref<string> = ref('');
const isLoading: Ref<boolean> = ref(false);
const password: Ref<string> = ref('');

const attemptSignup = async (): Promise<void> => {
  isLoading.value = true;
  const signupData = {
    email: email.value,
    firstName: firstName.value,
    lastName: lastName.value || null,
    password: password.value,
  };
  const response = await requests.post(apiRoutes.auth.signup, signupData);
  if ('errors' in response) {
    toast.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
    isLoading.value = false;
    return;
  }
  isLoading.value = false;
  router.push({ name: 'login-view' });
};
</script>

<style scoped>
.signup-form-container {
  border-radius: 15px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.08);
  margin: auto;
  margin-top: 120px;
  padding: 20px 25px 35px 30px;
  max-width: 500px;
  min-width: 350px;
}
.signup-form-element {
  margin-bottom: 15px;
  margin-top: 15px;
  width: 100%;
}
.signup-form-header {
  text-align: center;
}
</style>
