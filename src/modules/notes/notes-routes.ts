import type { RouteRecordRaw } from 'vue-router';
import NoteEditionView from '@/modules/notes/views/NoteEditionView.vue';

export const notesRoutes: RouteRecordRaw[] = [
  {
    component: NoteEditionView,
    name: 'note-edition-view',
    path: ':noteUuid',
    props: true,
  },
];

export default notesRoutes;
