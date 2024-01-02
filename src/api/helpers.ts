import { IPicture, parseFile, selectCover } from 'music-metadata';
import { v4 as newUUID } from 'uuid';

import type { Path } from '@globalTypes/fileTypes';
import type { Song } from './types';
import { isEmpty } from '../utils/array';
import { PathDetails, formatFileName } from './../utils/files';

export const getArtists = (artists: string[] | undefined) => {
   if (artists && !isEmpty(artists)) {
      return artists.join(', ');
   }

   return '';
};

export const createPathToCoverArt = async (songFile: Path) => {
   const { common: { picture } } = await parseFile(decodeURI(songFile));

   const coverArt = selectCover(picture);
   
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
