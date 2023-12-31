import { atom, selector } from 'recoil';
import { v4 as newUUID } from 'uuid';

import type { Tab } from '../types';
import { loadData } from 'features/save-data';

export const libraryTrackMark = 'library';
const newLibraryTab = {
   id: newUUID() + libraryTrackMark,
   name: 'Library',
   collection: await window.api.getSongs(),
   isPermanent: true,
   isCurrent: true,
};

const keys = {
   tabs: 'tabs',
   closedTabs: 'closedTabs',
};

const refreshLibrary = async (tabData: Tab[]) => {
   const musicLibrary = await window.api.getSongs();
   
   return tabData.map(tab => {
      const isLibraryTab = tab.id.includes(libraryTrackMark);

      if (isLibraryTab) {
         const newLibraryTab: Tab = { ...tab, collection: musicLibrary };
         
         return newLibraryTab;
      } else {
         return tab;
      }
   });
};

const getPreviousTabData = async () => {
   const rawPreviousTabData = loadData(keys.tabs);

   if (rawPreviousTabData) {
      const previousTabData = JSON.parse(rawPreviousTabData) as Tab[];

      const refreshedTabData = await refreshLibrary(previousTabData);
      
      return refreshedTabData;
   } else {
      const defaultData = [ newLibraryTab ];
      
      return defaultData;
   }
};

export const tabsState = atom<Tab[]>({
   key: keys.tabs,
   default: getPreviousTabData(),
});

export const closedTabs = selector({
   key: keys.closedTabs,
   get: ({ get }) => {
      // Permanent tabs are considered always open
      const closedTabs = get(tabsState).filter(tab => !tab.isOpen && !tab.isPermanent);

      return closedTabs;
   }
});
