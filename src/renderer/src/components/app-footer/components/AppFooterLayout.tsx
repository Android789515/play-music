import type { ReactNode } from 'react';

import styles from './AppFooterLayout.module.scss';

interface Props {
   children: ReactNode;
}

export const AppFooterLayout = ({ children }: Props) => {
   return (
      <div className={styles.appFooterLayout}>
         {children}
      </div>
   );
};
