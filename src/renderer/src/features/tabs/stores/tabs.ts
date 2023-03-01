import { atom, selector } from 'recoil';
import { v5 as newNameSpaceUUID, v4 as newUUID } from 'uuid';

import { namespace } from 'namespace';
import type { Tab } from '../types';

export const libraryTab = {
   id: newUUID(),
   name: 'Library',
   collection: await window.api.getSongs(),
   isPermanent: true
};

export const tabsState = atom<Tab[]>({
   key: newNameSpaceUUID('tabs', namespace),
   default: [
      libraryTab
   ]
});

export const closedTabs = selector({
   key: newNameSpaceUUID('closedTabs', namespace),
   get: ({ get }) => {
      // Permanent tabs are considered always open
      const closedTabs = get(tabsState).filter(tab => !tab.isOpen && !tab.isPermanent);

      return closedTabs;
   }
});