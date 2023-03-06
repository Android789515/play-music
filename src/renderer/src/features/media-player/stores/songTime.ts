import { atom } from 'recoil';
import { v5 as newNameSpaceUUID } from 'uuid';

import { namespace } from 'namespace';

export const songTimeState = atom({
   key: newNameSpaceUUID('songTime', namespace),
   default: 0
});