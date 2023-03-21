import type { UUID } from '../types/stringTypes';

export interface Song {
   id: UUID;
   title: string;
   artists: string;
   duration: number;
   path: string;
}
