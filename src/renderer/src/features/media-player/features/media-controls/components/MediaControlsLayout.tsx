import type { ReactNode } from 'react';

import styles from './MediaControlsLayout.module.scss';

interface Props {
   children: ReactNode;
}

export const MediaControlsLayout = ({ children }: Props) => {
   return (
      <div className={styles.mediaControlsLayout}>
         {children}
      </div>
   );
};
