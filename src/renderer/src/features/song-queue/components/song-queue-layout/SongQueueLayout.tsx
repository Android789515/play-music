import type { ReactNode } from 'react';

import styles from './SongQueueLayout.module.scss';

interface Props {
   children: ReactNode;
}

export const SongQueueLayout = ({ children }: Props) => {
   return (
      <div
         className={styles.songQueueLayout}
      >
         {children}
      </div>
   );
};
