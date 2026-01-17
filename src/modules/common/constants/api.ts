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
  users: {
    me: 'app/user/me'
  },
};
