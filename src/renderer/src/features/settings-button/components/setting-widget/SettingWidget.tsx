import type { ReactNode } from 'react';

import styles from './SettingWidget.module.scss';

interface Props {
   children: ReactNode;
}

export const SettingWidget = ({ children }: Props) => {
   return (
      <div
         className={styles.settingWidget}
      >
         {children}
      </div>
   );
};
