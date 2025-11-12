import type { User } from '@/modules/users/types/user-types';

// TODO: only uuid, no id
export interface Note {
  id: number;
  uuid: string;
  name: string;
  author: User;
};

export interface NewNoteData {
  name: string;
};

export interface NoteDetail {
  content: string;
  id: number;
  name: string;
  uuid: string;
};
