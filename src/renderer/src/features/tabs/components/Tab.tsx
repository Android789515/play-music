import type { Tab as TabType } from '../types';
import { capitalize } from 'utils/string';

import styles from './Tab.module.scss';

interface Props {
   tab: TabType;
   currentTab?: boolean;
   setCurrentTab: (tab: TabType) => void; // Sets state
}

export const Tab = ({ tab, currentTab, setCurrentTab }: Props) => {
   return (
      <li
         className={`
            ${styles.tab}
            ${currentTab ? styles.currentTab : ''}
         `}
         onClick={() => setCurrentTab(tab)}
      >
         <h2 tabIndex={1} className={styles.tabText}>
            {capitalize(tab.name)}
         </h2>
      </li>
   );
};
