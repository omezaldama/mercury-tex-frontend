import type { User } from '@/modules/users/types/user-types';

export interface Project {
  createdAt: string;
  id: number;
  uuid: string;
  name: string;
  updatedAt: string;
  author: User;
};

export interface ProjectFile {
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
  uuid: string;
};
