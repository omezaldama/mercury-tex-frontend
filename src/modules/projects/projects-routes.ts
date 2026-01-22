import type { RouteRecordRaw } from 'vue-router';
import ProjectEditionView from '@/modules/projects/views/ProjectEditionView.vue';

export const projectsRoutes: RouteRecordRaw[] = [
  {
    component: ProjectEditionView,
    name: 'project-edition-view',
    path: ':projectUuid',
    props: true,
  },
];

export default projectsRoutes;
