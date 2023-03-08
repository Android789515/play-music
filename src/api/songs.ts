import { app } from 'electron';

import type { Song } from './types';

import { readContentsOfDir } from '../utils/files';
import { getSongsFromDir, createSong } from './helpers';

const getSongs = async (): Promise<Song[]> => {
   const musicDir = readContentsOfDir(
      app.getPath('music')
   );

   const songFiles = musicDir.contents?.reduce(getSongsFromDir, []) || [];

   const fileTags = songFiles.map(createSong);

   return await Promise.all(fileTags);
};

export const songsAPI = {
   getSongs: {
      name: 'getSongs',
      fn: getSongs,
   },
};
