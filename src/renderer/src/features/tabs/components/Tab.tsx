import type { MouseEvent } from 'react';

import { MouseButtons } from 'types/eventTypes';
import type { Tab as TabType } from '../types';
import { capitalize } from 'utils/string';

import styles from './Tab.module.scss';

interface Props {
   tab: TabType;
   currentTab?: boolean;
   setCurrentTab: (tab: TabType) => void; // Sets state
   closeTab: (tab: TabType) => void; // Sets state
}

export const Tab = ({ tab, currentTab, setCurrentTab, closeTab }: Props) => {
   const handleClick = (event: MouseEvent) => {
      switch (event.button) {
         case MouseButtons.left:
            setCurrentTab(tab);
            break;
         
         case MouseButtons.middle:
            closeTab(tab);
            break;
         
         default:
            break;
      }
   };

   return (
      <li
         className={`
            ${styles.tab}
            ${currentTab ? styles.currentTab : ''}
         `}
         onMouseDown={handleClick}
      >
         <h2 tabIndex={1} className={styles.tabText}>
            {capitalize(tab.name)}
         </h2>
      </li>
   );
};
