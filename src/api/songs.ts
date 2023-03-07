import { app } from 'electron';
import { parseFile } from 'music-metadata';
import { v4 as newUUID } from 'uuid';

import type { Song } from './types';
import { isEmpty } from '../utils/array';
import { PathDetails, formatFileName, readContentsOfDir } from '../utils/files';

const getArtists = (artists: string[] | undefined) => {
   if (artists && !isEmpty(artists)) {
      return artists.join(', ');
   }

   return '';
};

const getSongsFromDir = (
   songResults: PathDetails[],
   pathDetails: PathDetails
): PathDetails[] => {
   
   const isPathDir = pathDetails.contents !== undefined;

   if (isPathDir) {
      const songsInDir = pathDetails.contents!.reduce(getSongsFromDir, []);

      return [ ...songResults, ...songsInDir ];
   } else {
      const { name, path } = pathDetails;

      return [ ...songResults, { name, path } ];
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
         duration: duration || 0,
         path,
      };
   });

   return await Promise.all(fileTags);
};

export const getSongsAPI = {
   name: 'getSongs',
   fn: getSongs,
};
