import { app } from 'electron';
import { parseFile } from 'music-metadata';
import { v4 as newUUID } from 'uuid';

import type { Song } from './types';
import { isEmpty } from '@src/utils/array';
import { formatSongTime } from '../utils/number';
import { PathStat, formatFileName, readContentsOfDir } from '../utils/files';

const getArtists = (artists: string[] | undefined) => {
   if (artists && !isEmpty(artists)) {
      return artists.join(', ');
   }

   return '';
};

const getSongsFromDir = (songs: PathStat[], path: PathStat): PathStat[] => {
   const isPathDir = path.contents !== undefined;

   if (isPathDir) {
      const songsInDir = path.contents!.reduce(getSongsFromDir, []);

      return [ ...songs, ...songsInDir ];
   } else {
      const { name, path: fullPath } = path;

      return [ ...songs, { name, path: fullPath } ];
   }
};

const getSongs = async (): Promise<Song[]> => {
   const musicDir = readContentsOfDir(
      app.getPath('music')
   );

   const songFiles = musicDir.contents?.reduce(getSongsFromDir, []) || [];

   const fileTags = songFiles.map(async ({ name, path }) => {
      const parsedFile = await parseFile(path);

      const {
         common: { title, artists },
         format: { duration },
      } = parsedFile;

      return {
         id: newUUID(),
         title: title || formatFileName(name),
         artists: getArtists(artists),
         duration: formatSongTime(duration || 0),
         path,
      };
   });

   return await Promise.all(fileTags);
};

export const getSongsAPI = {
   name: 'getSongs',
   fn: getSongs,
};
