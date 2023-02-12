import type { ReactNode } from 'react';

import styles from './SearchBarLayout.module.scss';

interface Props {
   children: ReactNode;
}

export const SearchBarLayout = ({ children }: Props) => {
   return (
      <label className={styles.searchBarLayout}>
         {children}
      </label>
   );
};
