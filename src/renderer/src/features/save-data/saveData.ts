import type { UUID } from '@globalTypes/stringTypes';

type LocalStorageKey = UUID;

const saveData = (key: LocalStorageKey, data: string) => {
   localStorage.setItem(key, data);
};

const loadData = (key: LocalStorageKey) => {
   return localStorage.getItem(key);
};

export { saveData, loadData };
