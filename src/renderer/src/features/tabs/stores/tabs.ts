import { atom, selector } from 'recoil';
import { v4 as newUUID } from 'uuid';

import type { Tab } from '../types';
import { loadData } from 'features/save-data';

export const libraryTrackMark = 'library';
const libraryTab = {
   id: newUUID() + libraryTrackMark,
   name: 'Library',
   collection: await window.api.getSongs(),
   isPermanent: true,
};

const keys = {
   tabs: 'tabs',
   closedTabs: 'closedTabs',
};

const getPreviousTabData = () => {
   const rawPreviousTabData = loadData(keys.tabs);

   if (rawPreviousTabData) {
      const previousTabData = JSON.parse(rawPreviousTabData);

      return previousTabData;
   }
};

export const tabsState = atom<Tab[]>({
   key: keys.tabs,
   default:
      getPreviousTabData()
      || [ libraryTab ]
});

export const closedTabs = selector({
   key: keys.closedTabs,
   get: ({ get }) => {
      // Permanent tabs are considered always open
      const closedTabs = get(tabsState).filter(tab => !tab.isOpen && !tab.isPermanent);

      return closedTabs;
   }
});
