import { atom } from 'recoil';
import { v5 as newNameSpaceUUID } from 'uuid';

import { namespace } from 'namespace';
import type { Song } from '@api/types';


export const songQueueState = atom<Song[]>({
   key: newNameSpaceUUID('songQueue', namespace),
   default: []
});