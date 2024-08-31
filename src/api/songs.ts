import { existsSync, copyFile, rename } from 'fs';
import { join, basename } from 'path';
import { app, dialog } from 'electron';

import type { Song } from './types';
import { Path, ImportBehaviour } from '../types/fileTypes';
import { readContentsOfDir, supportedFormats } from '../utils/files';
import { getSongsFromDir, createSong, createPathToCoverArt, getOrCreateDir } from './helpers';

const getSongs = async (): Promise<Song[]> => {
   const musicDir = readContentsOfDir(
      app.getPath('music')
   );

   const songFiles = musicDir.contents?.reduce(getSongsFromDir, []) || [];

   const songTags = songFiles.map(createSong);

   return await Promise.all(songTags);
};

const stillExists = async (songPath: Path) => {
   return existsSync(songPath);
};

const importSongs = async (importBehaviour: ImportBehaviour) => {
   const { filePaths: songPaths, canceled } = await dialog.showOpenDialog({
      properties: [
         'openFile',
         'multiSelections',
      ],
      filters: [
         {
            name: 'Audio',
            extensions: supportedFormats,
         }
      ],
   });

   if (!canceled) {
      const importedSongsDir = getOrCreateDir(
         join(app.getPath('music'), '.play-music-imported')
      );

      songPaths.forEach(path => {
         const destination = `${importedSongsDir}/${basename(path)}`;

         if (importBehaviour === ImportBehaviour.copy) {
            copyFile(path, destination, () => {});
         } else {
            rename(path, destination, () => {});
         }
      });
   }

   const numberOfSongs = songPaths.length;
   return {
      numberOfSongs,
      canceled,
   };
};

const loadCoverArt = async (songPath: Path): Promise<Path | null> => {
   return await createPathToCoverArt(songPath);
};

export const songsAPI = {
   getSongs: {
      name: 'getSongs',
      fn: getSongs,
   },
   stillExists: {
      name: 'stillExists',
      fn: stillExists,
   },
   importSongs: {
      name: 'importSongs',
      fn: importSongs,
   },
   loadCoverArt: {
      name: 'loadCoverArt',
      fn: loadCoverArt,
   },
};
