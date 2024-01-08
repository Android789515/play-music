import type { ReactNode } from 'react';

import styles from './Setting.module.scss';

interface Props {
   name: string;
   children: ReactNode;
}

export const Setting = ({ name, children }: Props) => {
   return (
      <label
         className={styles.setting}
      >
         {name}
         {children}
      </label>
   );
};
