import type { UUID } from '@globalTypes/stringTypes';

import type { Song } from '@src/api/types';

export interface Tab {
   id: UUID;
   name: string;
   collection: Song[];
   isOpen?: boolean;
   isCurrent?: boolean;
   isPermanent?: boolean;
}

export type TabKey = keyof Tab;
