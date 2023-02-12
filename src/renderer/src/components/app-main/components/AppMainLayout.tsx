import type { ReactNode } from 'react';

import styles from './AppMainLayout.module.scss';

interface Props {
   children: ReactNode;
}

export const AppMainLayout = ({ children }: Props) => {
   return (
      <div className={styles.appMainLayout}>
         {children}
      </div>
   );
};
