import { atom, selector } from 'recoil';
import { v4 as newUUID } from 'uuid';

import type { Tab } from '../types';

export const libraryTrackMark = 'library';
export const newLibraryTab: Tab = {
   id: newUUID() + libraryTrackMark,
   name: 'Library',
   collection: [],
   isPermanent: true,
   isCurrent: true,
};

const keys = {
   tabs: 'tabs',
   closedTabs: 'closedTabs',
};

const defaultTabData = [ newLibraryTab ];

export const getPreviousTabData = async () => {
   const rawPreviousTabData = await window.api.loadData(keys.tabs);

   if (rawPreviousTabData) {
      const previousTabData = JSON.parse(rawPreviousTabData) as Tab[];

      return previousTabData;
   } else {
      return defaultTabData;
   }
};

export const tabsState = atom<Tab[]>({
   key: keys.tabs,
   default: defaultTabData,
});

export const closedTabs = selector({
   key: keys.closedTabs,
   get: ({ get }) => {
      // Permanent tabs are considered always open
      const closedTabs = get(tabsState).filter(tab => !tab.isOpen && !tab.isPermanent);

      return closedTabs;
   }
});
