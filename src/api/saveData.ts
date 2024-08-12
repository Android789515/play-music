import { app } from 'electron';
import { writeFile, writeFileSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';

import type { UUID } from '../types/stringTypes';

type StorageKey = UUID;

const logDataKey = (key: StorageKey) => {
   const keysFile = join(app.getPath('userData'), '.dataKeys');

   if (existsSync(keysFile)) {
      const keysFileContent = readFileSync(keysFile).toString();

      const isNewKey = !keysFileContent.includes(key);

      const maybeKey = isNewKey
         ? `${keysFileContent}\n${key}`
         : keysFileContent;

      writeFileSync(keysFile, maybeKey);
   } else {
      writeFileSync(keysFile, key);
   }

};

export const saveDataAPI = {
   saveData: {
      name: 'saveData',
      fn: (key: StorageKey, data: string) => {
         logDataKey(key);

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
