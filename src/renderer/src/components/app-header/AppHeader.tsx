import type { ReactNode } from 'react';

import styles from './AppHeader.module.scss';

interface Props {
   children: ReactNode;
}

export const AppHeader = ({ children }: Props) => {
   return (
      <header className={styles.appHeader}>
         {children}
      </header>
   );
};
