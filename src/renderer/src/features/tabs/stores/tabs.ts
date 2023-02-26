import { atom, selector } from 'recoil';
import { v5 as newNameSpaceUUID, v4 as newUUID } from 'uuid';

import { namespace } from 'namespace';
import type { Tab } from '../types';

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