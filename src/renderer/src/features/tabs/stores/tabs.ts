import { atom } from 'recoil';
import { v3 as newNameSpaceUUID, v4 as newUUID } from 'uuid';

import type { Tab } from '../types';

const namespace = '2aa78176-422b-4105-80c3-c39172040c3c';

export const tabsState = atom<Set<Tab>>({
   key: newNameSpaceUUID('tabs', namespace),
   default: new Set([
      {
         id: newUUID(),
         name: 'Library',
         isPermanent: true
      }
   ])
});