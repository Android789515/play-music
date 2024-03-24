import { copyFile } from 'fs';
import { join, basename } from 'path';
import { app, dialog } from 'electron';

import type { Song } from './types';
import type { Path } from '@globalTypes/fileTypes';
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

const importSongs = async () => {
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

         copyFile(path, destination, () => {});
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
   importSongs: {
      name: 'importSongs',
      fn: importSongs,
   },
   loadCoverArt: {
      name: 'loadCoverArt',
      fn: loadCoverArt,
   },
};
