import { formatSongTime } from '@utils/number';

import styles from './SongDuration.module.scss';

interface Props {
   songDuration: number;
}

export const SongDuration = ({ songDuration }: Props) => {
   return (
      <p className={styles.songDuration}>
         {formatSongTime(songDuration)}
      </p>
   );
};
