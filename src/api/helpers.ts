import { parseFile } from 'music-metadata';
import { v4 as newUUID } from 'uuid';

import { isEmpty } from '../utils/array';
import { PathDetails, formatFileName } from './../utils/files';

export const getArtists = (artists: string[] | undefined) => {
   if (artists && !isEmpty(artists)) {
      return artists.join(', ');
   }

   return '';
};

export const createSong = async ({ name, path }: PathDetails) => {
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
      path: encodeURI(path),
   };
};

export const getSongsFromDir = (
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
