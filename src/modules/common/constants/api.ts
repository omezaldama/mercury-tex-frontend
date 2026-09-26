export const apiRoutes = {
  auth: {
    login: 'auth/login',
    logout: 'auth/logout',
    refreshToken: 'auth/refresh-token',
    signup: 'auth/signup',
  },
  notes: {
    create: 'notes',
    getDetail: (uuid: string) => `notes/${uuid}`,
    getNotes: 'notes',
    patch: (id: number) => `notes/${id}`,
  },
  projects: {
    getFileContent: (projectUuid: string, fileUuid: string) => `projects/${projectUuid}/file/${fileUuid}`,
    getFiles: (uuid: string) => `projects/${uuid}`,
    getProjects: 'projects',
    saveFile: (projectUuid: string, fileUuid: string) => `projects/${projectUuid}/file/${fileUuid}`,
  },
  users: {
    me: 'users/me',
  },
};
