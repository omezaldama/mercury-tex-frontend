<template>
  <div>
    <div class="pt-1 pb-1">
      <Button
        label="New note"
        size="small"
        @click="dialogVisible = true"
      ></Button>
      <Dialog
        header="Enter the new note data"
        v-model:visible="dialogVisible"
      >
        <div>
          <IftaLabel>
            <InputText
              fluid
              id="new-note-name"
              placeholder="My new note"
              size="small"
              v-model="newNote.name"
            />
            <label for="new-note-name">Name</label>
          </IftaLabel>
          <div class="m-1">
            <Button
              label="Cancel"
              severity="secondary"
              size="small"
              type="button"
              @click="dialogVisible = false"
            ></Button>
            <Button
              label="Save"
              size="small"
              type="button"
              :loading="isLoading"
              @click="createNote"
            ></Button>
          </div>
        </div>
      </Dialog>
    </div>
    <div v-if="!notes.length">
      You do not have any notes yet.
    </div>
    <div v-else>
      <div v-for="note in notes">
        <RouterLink
          :to="{ name: 'note-edition-view', params: { noteUuid: note.uuid } }"
        >
          {{ note.name }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import IftaLabel from 'primevue/iftalabel';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue';

import type { NewNoteData, Note } from '@/modules/notes/types/notes-types';
import RequestsService from '@/modules/common/services/requests-service';
import { apiRoutes } from '@/modules/common/constants/api';

defineProps<{
  notes: Note[],
}>();

const emit = defineEmits<{
  (event: 'note-created'): void,
}>();

const requests = new RequestsService();

const toast = useToast();

const dialogVisible: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);
const newNote: Ref<NewNoteData> = ref({ name: '' });

const createNote = async () => {
  isLoading.value = true;
  const payload = { ...newNote.value };
  const response = await requests.post(apiRoutes.notes.create, payload);
  if ('errors' in response) {
    toast.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
  }
  else {
    newNote.value = { name: '' };
    dialogVisible.value = false;
    emit('note-created');
  }
  isLoading.value = false;
};
</script>
