import { app } from 'electron';
import { writeFile, existsSync, readFileSync } from 'fs';
import { join } from 'path';

import type { UUID } from '../types/stringTypes';

type StorageKey = UUID;

export const saveDataAPI = {
   saveData: {
      name: 'saveData',
      fn: (key: StorageKey, data: string) => {
         const dataToSave = join(
            app.getPath('userData'),
            key,
         );

         writeFile(dataToSave, data, error => {
            if (error) {
               console.error(error);
            }
         });
      },
   },
   loadData: {
      name: 'loadData',
      fn: (key: StorageKey) => {
         const savedData = join(
            app.getPath('userData'),
            key,
         );

         if (existsSync(savedData)) {
            const readData = readFileSync(join(savedData)).toString();

            return readData;
         } else {
            return null;
         }
      },
   },
};
