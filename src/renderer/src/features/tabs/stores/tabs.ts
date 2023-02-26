import { atom, selector } from 'recoil';
import { v3 as newNameSpaceUUID, v4 as newUUID } from 'uuid';

import type { Tab } from '../types';
import { easyIterate } from 'utils/set';

const namespace = '2aa78176-422b-4105-80c3-c39172040c3c';

const dummyData = [
   { title: 'Rondo Alla Turca', artist: 'Mozart', duration: '3:20' },
   { title: 'Fur Elise', artist: 'Beethoven', duration: '2:12' },

   { title: `6th Symphony Orchestra 6th Symphony Orchestra6th
               Symphony Orchestra6th Symphony Orchestra6th
               Symphony Orchestra6th Symphony Orchestra6th
               Symphony Orchestra`, artist: 'Mozart', duration: '4:16' },

   { title: 'Nikijomi Sakiyatori', artist: 'Rin Hashitora', duration: '4:00' },
   { title: 'Das Einzelzimmer', artist: 'Hoffmann Kreutz', duration: '3:45' },
   { title: 'Le Meuljeko', artist: 'Artyk Marfyjlko', duration: '5:21' },

   { title: 'Great Class', artist: `Stone BlockStone BlockStone BlockStone BlockStone
               BlockStone BlockStone BlockStone BlockStone
               BlockStone BlockStone BlockStone BlockStone
               BlockStone BlockStone Block`, duration: '4:16' },

   { title: 'Der Flug verspatet sich!', artist: 'Hoffmann Kreutz', duration: '2:18' },
   { title: 'Don Rio', artist: 'Tejaka Moria', duration: '3:12' },
   { title: 'Hat Song', artist: 'John Stewart', duration: '2:54' },
   { title: 'Tokiyomi no Saori', artist: 'Rin Hashitora', duration: '4:36' },
   { title: 'Gobble Gobble - Turkey Song', artist: 'Unknown', duration: '2:45' },
   { title: 'Epitome of Hyberbole', artist: 'Standup Chair', duration: '35:23' },
];

export const libraryTab = {
   id: newUUID(),
   name: 'Library',
   collection: dummyData,
   isPermanent: true
};

export const tabsState = atom<Set<Tab>>({
   key: newNameSpaceUUID('tabs', namespace),
   default: new Set([
      libraryTab
   ])
});

export const closedTabs = selector<Set<Tab>>({
   key: newNameSpaceUUID('closedTabs', namespace),
   get: ({ get }) => {
      const closedTabs = easyIterate<Tab>(get(tabsState), (tabs) => {
         // Permanent tabs are considered always open
         return tabs.filter(tab => !tab.isOpen && !tab.isPermanent);
      });

      return closedTabs;
   }
});