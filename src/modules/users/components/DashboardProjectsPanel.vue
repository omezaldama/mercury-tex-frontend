<template>
  <div>
    <div class="pt-1 pb-1">
      <Button
        label="New project"
        size="small"
        @click="dialogVisible = true"
      ></Button>
      <Dialog
        header="Enter the new project data"
        v-model:visible="dialogVisible"
      >
        <div>
          holi
        </div>
      </Dialog>
    </div>
    <div v-if="!projects.length">
      You do not have any projects yet.
    </div>
    <div v-else>
      <div v-for="project in projects">
        <RouterLink
          :to="{ name: 'project-edition-view', params: { projectId: project.id } }"
        >
          {{ project.name }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { RouterLink } from 'vue-router';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

import type { Project } from '@/modules/projects/types/projects-types';

defineProps<{
  projects: Project[],
}>();

const dialogVisible: Ref<boolean> = ref(false);
</script>
