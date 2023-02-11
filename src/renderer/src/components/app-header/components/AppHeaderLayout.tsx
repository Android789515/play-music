import { ReactNode } from 'react';

import styles from './AppHeaderLayout.module.scss';

interface Props {
   children: ReactNode;
}

export const AppHeaderLayout = ({ children }: Props) => {
   return (
      <nav className={styles.appHeaderLayout}>
         {children}
      </nav>
   );
};
