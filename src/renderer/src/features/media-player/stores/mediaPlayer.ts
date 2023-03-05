import { atom } from 'recoil';
import { v5 as newNameSpaceUUID } from 'uuid';

import { namespace } from 'namespace';

export const isMediaPlayerOpenState = atom<boolean>({
   key: newNameSpaceUUID('isMediaPlayerOpenState', namespace),
   default: false
});