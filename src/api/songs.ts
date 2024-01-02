import { app } from 'electron';

import type { Song } from './types';
import type { Path } from '@globalTypes/fileTypes';
import { readContentsOfDir } from '../utils/files';
import { getSongsFromDir, createSong, createPathToCoverArt } from './helpers';

const getSongs = async (): Promise<Song[]> => {
   const musicDir = readContentsOfDir(
      app.getPath('music')
   );

   const songFiles = musicDir.contents?.reduce(getSongsFromDir, []) || [];

   const fileTags = songFiles.map(createSong);

   return await Promise.all(fileTags);
};

const loadCoverArt = async (songPath: Path): Promise<Path | null> => {
   return await createPathToCoverArt(songPath);
};

export const songsAPI = {
   getSongs: {
      name: 'getSongs',
      fn: getSongs,
   },
   loadCoverArt: {
      name: 'loadCoverArt',
      fn: loadCoverArt,
   },
};
