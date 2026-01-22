<template>
  <div class="w-100">
    <Tabs value="0">
      <TabList>
        <Tab value="0">Notes</Tab>
        <Tab value="1">Projects</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <DashboardNotesPanel
            :notes="notes"
            @note-created="updateNotes"
          ></DashboardNotesPanel>
        </TabPanel>
        <TabPanel value="1">
          <DashboardProjectsPanel
            :projects="projects"
          ></DashboardProjectsPanel>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import { useToast } from 'primevue/usetoast';

import RequestsService from '@/modules/common/services/requests-service';
import type { Note } from '@/modules/notes/types/notes-types';
import DashboardNotesPanel from '../components/DashboardNotesPanel.vue';
import type { Project } from '@/modules/projects/types/projects-types';
import DashboardProjectsPanel from '../components/DashboardProjectsPanel.vue';

const requests = new RequestsService();

const toast = useToast();

const notes: Ref<Note[]> = ref([]);
const projects: Ref<Project[]> = ref([]);

onMounted(async () => {
  await Promise.all([
    updateNotes(),
    updateProjects(),
  ]);
});

const updateNotes = async () => {
  const response = await requests.get<Note[]>('app/user/notes');
  if ('errors' in response) {
    toast.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
    return;
  }
  notes.value = response.data;
};

const updateProjects = async () => {
  const projectsResponse = await requests.get<Project[]>('app/project');
  if ('errors' in projectsResponse) {
    alert(projectsResponse.message);
    return;
  }
  projects.value = projectsResponse.data;
};
</script>
