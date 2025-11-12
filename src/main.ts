import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css';

import App from './App.vue';
import router from './router';
import { darkModeClass } from './modules/common/constants/styles-constants';
import './style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(ToastService);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: `.${darkModeClass}`,
    },
  },
});
app.use(router);

app.mount('#app');
