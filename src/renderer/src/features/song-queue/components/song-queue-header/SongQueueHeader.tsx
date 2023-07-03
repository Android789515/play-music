import type { ReactNode } from 'react';

import styles from './SongQueueHeader.module.scss';

interface Props {
   children: ReactNode;
}

export const SongQueueHeader = ({ children }: Props) => {
   return (
      <header
         className={styles.songQueueHeader}
      >
         <h3 className={styles.title}>
            Song Queue
         </h3>

         {children}
      </header>
   );
};
