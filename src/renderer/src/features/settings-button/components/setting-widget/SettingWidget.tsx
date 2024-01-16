import type { ReactNode } from 'react';

import styles from './SettingWidget.module.scss';

interface Props {
   children: ReactNode;
}

export const SettingWidget = ({ children }: Props) => {
   return (
      <li
         className={styles.settingWidget}
      >
         {children}
      </li>
   );
};
