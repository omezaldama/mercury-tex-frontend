export interface User {
  email: string;
  firstName: string;
  id: number;
  isActive: boolean;
  lastName: string | null;
  createdAt: string;
  updatedAt: string;
};

export interface UserNote {
  id: number;
  uuid: string;
  name: string;
  author: User;
};

export interface UserProject {
  createdAt: string;
  id: number;
  uuid: string;
  name: string;
  updatedAt: string;
  author: User;
};
