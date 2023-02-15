import type { ReactNode } from 'react';

import styles from './Song.module.scss';

interface Props {
   children: ReactNode;
}

export const Song = ({ children }: Props) => {
   return (
      <li
         tabIndex={1}
         className={styles.song}
      >
         {children}
      </li>
   );
};
