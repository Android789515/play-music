import { atom, selector } from 'recoil';
import { v4 as newUUID } from 'uuid';

import type { Tab } from '../types';

export const libraryTab = {
   id: newUUID(),
   name: 'Library',
   collection: await window.api.getSongs(),
   isPermanent: true
};

export const tabsState = atom<Tab[]>({
   key: 'tabs',
   default: [
      libraryTab
   ]
});

export const closedTabs = selector({
   key: 'closedTabs',
   get: ({ get }) => {
      // Permanent tabs are considered always open
      const closedTabs = get(tabsState).filter(tab => !tab.isOpen && !tab.isPermanent);

      return closedTabs;
   }
});