import type { UUID } from 'types/stringTypes';

import type { Song } from 'features/library-view/songs';

export interface Tab {
   id: UUID;
   name: string;
   collection: Song[];
   isCurrent?: boolean;
   isPermanent?: boolean;
}

export type TabKey = keyof Tab;