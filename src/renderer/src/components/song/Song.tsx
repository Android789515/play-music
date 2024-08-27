import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import type { Song as SongType } from '@api/types';
import { audioDataState } from 'features/media-player/features/audio-data-state';

import styles from './Song.module.scss';

import { CoverArt } from 'components/cover-art';
import { SongInfo } from 'components/song-info';
import { SoundVisualizer } from 'components/sound-visualizer';

interface Props {
   playing?: boolean;
   parentFocus?: boolean;
   song: SongType;
}

export const Song = ({ playing, parentFocus, song: { path: songPath, title, artists } }: Props) => {

   const [ coverArt, setCoverArt ] = useState();

   const loadCoverArt = () => {
      window.api.loadCoverArt(songPath).then(coverArt => {
         setCoverArt(coverArt);
      });
   };

   useEffect(loadCoverArt, [ songPath ]);

   const [ audioData ] = useRecoilState(audioDataState);

   const [ coverArtFocus, setCoverArtFocus ] = useState(false);

   const desiredContentFocus = parentFocus || coverArtFocus;
   return (
      <div
         className={`
            ${styles.songLayout}
            ${styles.song}
            ${playing ? styles.songPlaying : ''}
         `}
      >
         <CoverArt
            coverArtLocation={coverArt}
            onMouseEnter={() => setCoverArtFocus(true)}
            onMouseLeave={() => setCoverArtFocus(false)}
         />

         {playing &&
            <SoundVisualizer
               shown={playing && desiredContentFocus}
               buffer={audioData.buffer}
            />
         }

         <SongInfo
            songTitle={title}
            songArtists={artists}
         />
      </div>
   );
};
