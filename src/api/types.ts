import type { UUID } from '../types/stringTypes';
import type { Path } from '@globalTypes/fileTypes';

export interface Song {
   id: UUID;
   title: string;
   artists: string;
   duration: number;
   path: Path;
   coverArt?: Path | null;
}
