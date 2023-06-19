import { atom } from 'recoil';

import type { Song } from '@api/types';

export const songQueueState = atom<Song[]>({
   key: 'songQueue',
   default: []
});
