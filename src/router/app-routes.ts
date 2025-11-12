import type { RouteRecordRaw } from 'vue-router';

import notesRoutes from '@/modules/notes/notes-routes';
// import projectsRoutes from '@/modules/projects/projects-routes';
import usersRoutes from '@/modules/users/users-routes';

export const appRoutes: RouteRecordRaw[] = [
  {
    children: usersRoutes,
    path: 'user',
  },
  {
    children: notesRoutes,
    path: 'notes',
  },
  // {
  //   children: projectsRoutes,
  //   path: 'projects',
  // },
];

export default appRoutes;
