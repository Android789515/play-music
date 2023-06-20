import type { ReactNode } from 'react';

import styles from './WidgetFloater.module.scss';

interface Props {
   children: ReactNode;
}

export const WidgetFloater = ({ children }: Props) => {
   return (
      <div className={styles.widgetFloater}>
         {children}
      </div>
   );
};
