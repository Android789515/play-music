import type { UUID } from '../types/stringTypes';

type LocalStorageKey = UUID;

export const saveDataAPI = {
   saveData: {
      name: 'saveData',
      fn: (key: LocalStorageKey, data: string) => {
         localStorage.setItem(key, data);
      },
   },
   loadData: {
      name: 'loadData',
      fn: (key: LocalStorageKey) => {
         return localStorage.getItem(key);
      },
   },
};
