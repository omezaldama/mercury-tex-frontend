import type { RouteRecordRaw } from 'vue-router';
import ProjectEditionView from '@/modules/projects/views/ProjectEditionView.vue';

export const projectsRoutes: RouteRecordRaw[] = [
  {
    component: ProjectEditionView,
    name: 'project-edition-view',
    path: ':projectId',
    props: true,
  },
];

export default projectsRoutes;
