import type { MouseEventHandler } from 'react';

import styles from './ContextMenuItem.module.scss';

interface Props {
   itemText: string;
   action: MouseEventHandler;
}

export const ContextMenuItem = ({ itemText, action }: Props) => {
   return (
      <li
         className={styles.contextMenuItem}
         onClick={action}
      >
         {itemText}
      </li>
   );
};