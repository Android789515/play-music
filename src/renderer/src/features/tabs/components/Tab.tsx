import { capitalize } from 'renderer/utils/string';

import styles from './Tab.module.scss';

interface Props {
   currentTab?: boolean;
   tabText: string;
}

export const Tab = ({ currentTab, tabText }: Props) => {
   return (
      <li
         className={`
         ${styles.tab}
         ${currentTab ? styles.currentTab : ''}
      `}
      >
         <h2 tabIndex={1} className={styles.tabText}>
            {capitalize(tabText)}
         </h2>
      </li>
   );
};
