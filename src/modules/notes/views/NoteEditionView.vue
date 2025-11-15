<template>
  <div>
    <Splitter class="work-splitter">
      <SplitterPanel :size="10">
        <b>Note:</b> {{ noteDetail.name }}
      </SplitterPanel>
      <SplitterPanel :size="48">
        <div class="p-1">
          <Button
            label="Save"
            size="small"
            icon="pi pi-save"
          ></Button>
        </div>
        <textarea id="code-editor"></textarea>
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
import Button from 'primevue/button';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';

import RequestsService from '@/modules/common/services/requests-service';
import type { NoteDetail } from '../types/notes-types';
import { apiRoutes } from '@/modules/common/constants/api';
import { useThemeStore } from '@/stores/theme-store';

const props = defineProps({
  noteUuid: { type: String, required: true },
});

const requests = new RequestsService();

const toast = useToast();
const themeStore = useThemeStore();

const noteDetail: Ref<Partial<NoteDetail>> = ref({ name: '', content: '' });
let editor;

onMounted(async () => {
  const response = await requests.get<NoteDetail>(apiRoutes.notes.getDetail(props.noteUuid));
  if ('errors' in response) {
    toast.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
    return;
  }
  noteDetail.value = response.data;

  // @ts-ignore-next-line
  editor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    lineNumbers: true,
    mode: 'stex',
    theme: themeStore.theme === 'dark' ? 'dracula' : 'eclipse',
    indentUnit: 2,
    lineWrapping: true,
    autoCloseBrackets: "()[]{}''\"\"",
    matchBrackets: true,
    extraKeys: {
      'Ctrl-Space': 'autocomplete',
    },
  });

  editor.setSize("100%", "calc(100vh - 150px)");
  editor.setValue(noteDetail.value.content);
});
</script>

<style scoped>
.work-splitter {
  height: calc(100vh - 75px);
}
</style>
