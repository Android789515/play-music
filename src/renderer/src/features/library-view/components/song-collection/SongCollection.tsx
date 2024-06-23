import type { Song as SongType } from '@api/types';

import { List } from 'components/list';
import { SongButton } from '../song-button';

import styles from './SongCollection.module.scss';

interface Props {
   songs: SongType[];
}

export const SongCollection = ({ songs }: Props) => {
   const SongComponents = songs.map((song, index) => {
      return (
         <li key={index} className={styles.song}>
            <SongButton song={song} />
         </li>
      );
   });

   return (
      <List>
         {SongComponents}
      </List>
   );
};
