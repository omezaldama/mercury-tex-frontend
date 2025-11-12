<template>
  <div>
    <Splitter class="work-splitter">
      <SplitterPanel :size="10">
        <b>Note:</b> {{ noteDetail.name }}
      </SplitterPanel>
      <SplitterPanel :size="48">
        {{ noteDetail.content }}
      </SplitterPanel>
      <SplitterPanel :size="42">
        The pdf goes here
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useToast } from 'primevue';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';

import RequestsService from '@/modules/common/services/requests-service';
import type { NoteDetail } from '../types/notes-types';
import { apiRoutes } from '@/modules/common/constants/api';

const props = defineProps({
  noteUuid: { type: String, required: true },
});

const requests = new RequestsService();

const toast = useToast();

const noteDetail: Ref<Partial<NoteDetail>> = ref({ name: '', content: '' });

onMounted(async () => {
  const response = await requests.get<NoteDetail>(apiRoutes.notes.getDetail(props.noteUuid));
  if ('errors' in response) {
    toast.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
    return;
  }
  noteDetail.value = response.data;
});
</script>

<style scoped>
.work-splitter {
  height: calc(100vh - 75px);
}
</style>
