import type { Song } from '@api/types';

import styles from './SongPlaying.module.scss';

import { CoverArt } from 'components/cover-art';
import { SongInfo } from 'components/song-info';

interface Props {
   songPlaying: Song
}

export const SongPlaying = ({ songPlaying: { title, artists } }: Props) => {
   return (
      <div className={styles.songPlaying}>
         <CoverArt />

         <SongInfo
            songTitle={title}
            songArtists={artists}
         />
      </div>
   );
};

