import { defineStore } from 'pinia';
import { ref } from 'vue';

import RequestsService from '@/modules/common/services/requests-service';
import type { Ref } from 'vue';
import type { User } from '@/modules/users/types/user-types';
import { apiRoutes } from '@/modules/common/constants/api';

export const useUserStore = defineStore('user', () => {
  const requestsService = new RequestsService();

  // State:
  const user: Ref<User | null> = ref(null);

  // Actions:
  const clearUser = () => {
    user.value = null;
  };

  const fetchUser = async (): Promise<void> => {
    const userResponse = await requestsService.get<User>(apiRoutes.users.me);
    if ('errors' in userResponse) {
      alert(userResponse.message);
      return;
    }
    const userData = userResponse.data!;
    user.value = userData;
  }

  return {
    user,
    clearUser,
    fetchUser,
  };
});

export default useUserStore;
