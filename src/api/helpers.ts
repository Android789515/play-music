import { IPicture, parseFile, selectCover } from 'music-metadata';
import { v4 as newUUID } from 'uuid';

import type { Song } from './types';
import { isEmpty } from '../utils/array';
import { PathDetails, formatFileName } from './../utils/files';

export const getArtists = (artists: string[] | undefined) => {
   if (artists && !isEmpty(artists)) {
      return artists.join(', ');
   }

   return '';
};

const createPathToCoverArt = (coverArt: IPicture | null) => {
   if (coverArt) {
      const { format: mime, data } = coverArt;

      const image = data.toString('base64');
      return (
         `data:${mime};base64,${image}`
      );
   } else {
      return null;
   }
};

export const createSong = async ({ name, path }: PathDetails): Promise<Song> => {
   const parsedFile = await parseFile(path);

   const {
      common: { title, artists, picture },
      format: { duration },
   } = parsedFile;

   return {
      id: newUUID(),
      title: title || formatFileName(name),
      artists: getArtists(artists),
      duration: duration || 0,
      path: encodeURI(path),
      coverArt: createPathToCoverArt(selectCover(picture)),
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
