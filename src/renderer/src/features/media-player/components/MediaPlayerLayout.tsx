import type { ReactNode } from 'react';

import styles from './MediaPlayerLayout.module.scss';

interface Props {
   children: ReactNode;
}

export const MediaPlayerLayout = ({ children }: Props) => {
   return (
      <div className={styles.mediaPlayerLayout}>
         {children}
      </div>
   );
};
