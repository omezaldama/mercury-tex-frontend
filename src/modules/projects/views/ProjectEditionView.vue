<template>
  <div style="height: 100vh;">
    <Splitter>
      <SplitterPanel :size="10">
        <h3>Project files</h3>
        <ul>
          <li
            v-for="projectFile in projectFiles"
            @click="() => handleProjectFileClick(projectFile)"
          >
            {{ projectFile.name }}
          </li>
        </ul>
      </SplitterPanel>
      <SplitterPanel :size="48">
        <div class="p-1">
          <Button
            size="small"
            @click="handleCompile"
          >Compile</Button>
        </div>
        <textarea id="code-editor"></textarea>
      </SplitterPanel>
      <SplitterPanel :size="42" style="overflow-y: scroll">
        <div v-if="selectedProjectFile?.uuid && pages">
          <div>
            <a :href="pdfFilePath || undefined" target="_blank">
              <Button size="small">Open &#8599;</Button>
            </a>
          </div>
          <div :style="{filter: `invert(${themeStore.theme === 'dark' ? 1 : 0})`}">
            <VuePDF
              v-for="page in pages"
              :pdf="pdf"
              :page="page"
              :key="page"
              fit-parent
              style="margin: 8px;"
            />
          </div>
        </div>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue';
import Button from 'primevue/button';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import { useToast } from 'primevue';
import { VuePDF, usePDF } from '@tato30/vue-pdf'

import RequestsService from '@/modules/common/services/requests-service';
import { useThemeStore } from '@/stores/theme-store';
import type { ProjectFile } from '../types/projects-types';
import { apiRoutes } from '@/modules/common/constants/api';

const props = defineProps({
  projectUuid: { type: String, required: true },
});

const requests = new RequestsService();

const isLoading: Ref<boolean> = ref(false);
const projectFiles: Ref<ProjectFile[]> = ref([]);
const selectedProjectFile: Ref<ProjectFile | null> = ref(null);

const pdfFilePath: ComputedRef<string | null> = computed(
  () => selectedProjectFile.value ? `${import.meta.env.VITE_VENUS_BACKEND_URL}/compiled/${selectedProjectFile.value?.uuid}.pdf` : null,
);

const themeStore = useThemeStore();
const toast = useToast();
const { pdf, pages } = usePDF(pdfFilePath);

// @ts-ignore-next-line
let editor;

onMounted(async () => {
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
  editor.setSize("100%", "calc(100vh - 125px)");

  await updateProjectFiles();
});

const handleCompile = async () => {
  isLoading.value = true;
  await saveSelectedFile();
  const projectFileUuid = selectedProjectFile.value!.uuid;
  await requests.post(
    `app/project/${props.projectUuid}/file/${projectFileUuid}/pdf`,
  );
  isLoading.value = false;
  const temp = selectedProjectFile.value!.uuid;
  selectedProjectFile.value!.uuid = '';
  setTimeout(() => {
    selectedProjectFile.value!.uuid = temp;
  }, 0);
};

const handleProjectFileClick = async (projectFile: ProjectFile) => {
  isLoading.value = true;
  selectedProjectFile.value = projectFile;
  await updateFileContent(projectFile.uuid);
  isLoading.value = false;
};

const saveSelectedFile = async () => {
  const projectFileUuid = selectedProjectFile.value!.uuid;
  await requests.patch(
    apiRoutes.projects.saveFile(props.projectUuid, projectFileUuid),
    // @ts-ignore-next-line
    { name: selectedProjectFile.value!.name, contents: editor.getValue() },
  );
};

const updateFileContent = async (projectFileUuid: string) => {
  const fileContentResponse = await requests.get<string>(
    apiRoutes.projects.getFileContent(props.projectUuid, projectFileUuid),
  );
  if ('errors' in fileContentResponse) {
    toast.add({ severity: 'error', summary: 'Error', detail: fileContentResponse.message, life: 3000 });
    return;
  }
  // @ts-ignore-next-line
  editor.setValue(fileContentResponse.data);
};

const updateProjectFiles = async () => {
  isLoading.value = true;
  const projectFilesResponse = await requests.get<ProjectFile[]>(
    apiRoutes.projects.getFiles(props.projectUuid),
  );
  if ('errors' in projectFilesResponse) {
    toast.add({ severity: 'error', summary: 'Error', detail: projectFilesResponse.message, life: 3000 });
    return;
  }
  projectFiles.value = projectFilesResponse.data;
  isLoading.value = false;
};
</script>
