export const apiRoutes = {
  auth: {
    login: 'auth/login',
    logout: 'auth/logout',
    signup: 'auth/signup',
  },
  notes: {
    create: 'app/note',
    getDetail: (uuid: string) => `app/note/${uuid}`,
    patch: (id: number) => `app/note/${id}`,
  },
  projects: {
    getFileContent: (projectUuid: string, fileUuid: string) => `app/project/${projectUuid}/file/${fileUuid}`,
    getFiles: (uuid: string) => `app/project/${uuid}`,
    saveFile: (projectUuid: string, fileUuid: string) => `app/project/${projectUuid}/file/${fileUuid}`,
  },
  users: {
    me: 'app/user/me',
  },
};
