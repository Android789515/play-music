import type { ReactNode } from 'react';

import styles from './HeaderButtons.module.scss';

interface Props {
   children: ReactNode;
}

export const HeaderButtons = ({ children }: Props) => {
   return (
      <div className={styles.headerButtons}>
         {children}
      </div>
   );
};
