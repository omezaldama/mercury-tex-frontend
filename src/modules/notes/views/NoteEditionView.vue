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
            @click="handleSave"
          ></Button>
        </div>
        <textarea id="code-editor"></textarea>
      </SplitterPanel>
      <SplitterPanel :size="42">
        <div class="text-output-area"></div>
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
const renderDebounce: Ref<number | null> = ref(null);
// @ts-ignore-next-line
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

  editor.setSize("100%", "calc(100vh - 135px)");
  editor.setValue(noteDetail.value.content);
  editor.on('change', () => {
    handleTextChange();
  });
  handleTextChange();
});

const clearRenderDebounceTimeout = () => {
  if (renderDebounce.value !== null) {
    clearTimeout(renderDebounce.value);
  }
  renderDebounce.value = null;
};

const handleTextChange = () => {
  clearRenderDebounceTimeout();
  renderDebounce.value = setTimeout(renderLatex, 1000);
};

const renderLatex = () => {
  const textOutputArea = document.querySelector('.text-output-area') as HTMLElement;
  // @ts-ignore-next-line
  const editorContent: string = editor.getValue();
  noteDetail.value.content = editorContent;
  textOutputArea.textContent = editorContent;
  // @ts-ignore
  renderMathInElement(textOutputArea, {
    delimiters: [
      {left: "$$", right: "$$", display: true},
      {left: "$", right: "$", display: false},
      {left: "\\(", right: "\\)", display: false},
      {left: "\\begin{equation}", right: "\\end{equation}", display: true},
      {left: "\\begin{align}", right: "\\end{align}", display: true},
      {left: "\\begin{alignat}", right: "\\end{alignat}", display: true},
      {left: "\\begin{gather}", right: "\\end{gather}", display: true},
      {left: "\\begin{CD}", right: "\\end{CD}", display: true},
      {left: "\\[", right: "\\]", display: true}
    ],
    throwOnError: false,
  });
};

const handleSave = async () => {
  const response = await requests.patch(apiRoutes.notes.patch(noteDetail.value.id!), {
    // @ts-ignore-next-line
    content: editor.getValue(),
    name: noteDetail.value!.name,
  });
  if ('errors' in response) {
    toast.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
    return;
  }
  toast.add({ severity: 'success', summary: 'Note saved', detail: response.message, life: 3000 });
};
</script>

<style scoped>
.work-splitter {
  height: calc(100vh - 75px);
}
</style>
