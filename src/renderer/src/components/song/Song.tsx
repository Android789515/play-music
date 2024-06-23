import { useState, useEffect } from 'react';

import type { Song as SongType } from '@api/types';

import styles from './Song.module.scss';

import { CoverArt } from 'components/cover-art';
import { SongInfo } from 'components/song-info';

interface Props {
   song: SongType;
}

export const Song = ({ song: { path: songPath, title, artists } }: Props) => {

   const [ coverArt, setCoverArt ] = useState();

   const loadCoverArt = () => {
      window.api.loadCoverArt(songPath).then(coverArt => {
         setCoverArt(coverArt);
      });
   };

   useEffect(loadCoverArt, [ songPath ]);

   return (
      <div
         className={`
            ${styles.songLayout}
            ${styles.song}
         `}
      >
         <CoverArt
            coverArtLocation={coverArt}
         />

         <SongInfo
            songTitle={title}
            songArtists={artists}
         />
      </div>
   );
};
